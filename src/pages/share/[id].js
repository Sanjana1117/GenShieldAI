import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import ShareOptions from '../../components/share/ShareOptions';
import ContentPreview from '../../components/share/ContentPreview';
import Button from '../../components/ui/Button';

export default function ShareContent() {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser, loading } = useAuth();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [expiryDate, setExpiryDate] = useState(null);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
      return;
    }

    if (id) {
      // This would be an API call to fetch content details in a real app
      setIsLoading(true);
      setTimeout(() => {
        // Mock content data
        const mockContent = {
          id,
          title: 'Quarterly Report.pdf',
          type: 'document',
          createdAt: new Date().toISOString(),
          views: 0,
          platforms: [],
          fileUrl: '/document-url',
          fileSize: '2.3 MB',
          status: 'active',
          watermarked: true,
          invisibleWatermark: true,
          generatedAccessCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        };
        setContent(mockContent);
        setAccessCode(mockContent.generatedAccessCode);
        setIsLoading(false);
      }, 1000);
    }
  }, [id, currentUser, loading, router]);

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
  };

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/view/${id}?code=${accessCode}`;
    setShareUrl(shareUrl);
    setShowCodeModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Share Secure Content</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Content Preview</h2>
            </div>
            <ContentPreview content={content} />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Sharing Options</h2>
            </div>
            <div className="p-6">
              <ShareOptions 
                selectedPlatforms={selectedPlatforms}
                onPlatformChange={handlePlatformChange}
                expiryDate={expiryDate}
                onExpiryDateChange={handleExpiryDateChange}
              />
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={generateShareUrl}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Generate Secure Share Link
                </Button>
              </div>
            </div>
          </div>
          
          {/* Security Information */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features Active</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Visible Watermark</p>
                  <p className="text-sm text-gray-600">Shows your user ID on all content</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Invisible Watermark</p>
                  <p className="text-sm text-gray-600">Embeds tracking data invisible to viewers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Access Control</p>
                  <p className="text-sm text-gray-600">Requires secure code to view content</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Digital Fingerprinting</p>
                  <p className="text-sm text-gray-600">All accesses are logged and traceable</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Access Code Modal */}
          {showCodeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-lg w-full mx-4">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">Secure Share Link Generated</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Share URL</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={shareUrl} 
                        readOnly 
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                      <button 
                        onClick={() => copyToClipboard(shareUrl)}
                        className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Code</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={accessCode} 
                        readOnly 
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                      <button 
                        onClick={() => copyToClipboard(accessCode)}
                        className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          The access code is required to view this content. Send it separately from the URL for maximum security.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-right">
                    <Button 
                      onClick={() => router.push('/dashboard')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Return to Dashboard
                    </Button>
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
