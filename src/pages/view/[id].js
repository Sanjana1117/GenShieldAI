import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

export default function ViewContent() {
  const router = useRouter();
  const { id, code } = router.query;
  const [content, setContent] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fingerprint, setFingerprint] = useState({
    ip: '192.168.x.x',
    device: 'Unknown',
    browser: 'Unknown',
    time: new Date().toISOString()
  });

  useEffect(() => {
    if (id) {
      // This would be an API call to fetch content details
      setIsLoading(true);
      
      // Get browser and device information for fingerprinting
      const userAgent = navigator.userAgent;
      const browserName = userAgent.includes('Chrome') ? 'Chrome' :
                         userAgent.includes('Firefox') ? 'Firefox' :
                         userAgent.includes('Safari') ? 'Safari' :
                         userAgent.includes('Edge') ? 'Edge' :
                         'Unknown';
      
      const deviceType = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
      
      setFingerprint({
        ...fingerprint,
        browser: browserName,
        device: deviceType
      });

      setTimeout(() => {
        // Mock content data
        const mockContent = {
          id,
          title: 'Quarterly Report 2023.pdf',
          type: 'document',
          createdAt: new Date().toISOString(),
          views: 0,
          platforms: ['email', 'slack'],
          fileUrl: '/document-url',
          fileSize: '2.3 MB',
          status: 'active',
          watermarked: true,
          invisibleWatermark: true,
          accessCode: 'ABC123', // In a real app, this would be securely stored
          creator: {
            name: 'John Doe',
            email: 'john@example.com'
          },
          content: 'This is a secure document that contains confidential information.',
        };
        setContent(mockContent);
        setIsLoading(false);
        
        // If code is provided in URL, attempt to verify
        if (code) {
          setAccessCode(code);
          verifyCode(code);
        }
      }, 1000);
    }
  }, [id, code]);

  const verifyCode = (codeToVerify) => {
    setIsVerifying(true);
    setError('');
    
    // Simulate verification delay
    setTimeout(() => {
      if (content && codeToVerify === content.accessCode) {
        setIsVerified(true);
        // In a real app, we would log this access event to the server
        logAccessEvent();
      } else {
        setError('Invalid access code. Please try again.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCode(accessCode);
  };

  const logAccessEvent = () => {
    // In a real app, this would send the fingerprint data to the server
    console.log('Access logged:', fingerprint);
  };

  const handleDownloadRequest = () => {
    alert('Download requests are monitored and restricted based on sharing settings.');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!isVerified ? (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-indigo-600 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Content Access</h1>
                <p className="text-gray-600">
                  This content is protected. Please enter the access code to view it.
                </p>
              </div>
              
              {content && (
                <div className="mb-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{content.title}</h2>
                  <p className="text-gray-600">
                    Shared by {content.creator.name} • {new Date(content.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                  <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Access Code
                  </label>
                  <input
                    type="text"
                    id="accessCode"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the access code"
                    required
                  />
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Access Content'}
                </Button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your access will be logged for security purposes
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h1 className="text-xl font-bold text-gray-900">{content.title}</h1>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verified Access
                  </div>
                </div>
                
                <div className="relative p-6">
                  {/* Visible watermark overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10 overflow-hidden">
                    <div className="transform rotate-45 text-xl text-gray-500 whitespace-nowrap">
                      Shared via GenShield • {content.creator.email} • {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Content preview */}
                  <div className="relative z-0 min-h-[300px]">
                    {content.type === 'document' && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-700 font-medium">{content.title}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 prose max-w-none">
                          <p>{content.content}</p>
                          <p>This document is protected with advanced security measures:</p>
                          <ul>
                            <li>Visible and invisible watermarks</li>
                            <li>Digital fingerprinting of each access</li>
                            <li>Restricted platform sharing</li>
                          </ul>
                          <p>Any unauthorized distribution is prohibited and can be traced back to this viewing session.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Security notice:</span> This viewing session is being recorded
                    </div>
                    <Button 
                      onClick={handleDownloadRequest}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Request Download Permission
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p>
                      This content is protected by GenShield. Screenshots, recording, and unauthorized sharing are prohibited and 
                      detectable. Each viewing is digitally fingerprinted and traced to your session.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
