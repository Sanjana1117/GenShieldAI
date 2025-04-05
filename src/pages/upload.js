import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import UploadForm from '../components/upload/UploadForm';
import WatermarkOptions from '../components/upload/WatermarkOptions';
import PlatformRestrictions from '../components/upload/PlatformRestrictions';
import Button from '../components/ui/Button';

export default function Upload() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [watermarkOptions, setWatermarkOptions] = useState({
    addVisible: true,
    visibleText: '',
    addInvisible: true,
    blurSensitiveInfo: false
  });
  const [platformRestrictions, setPlatformRestrictions] = useState({
    allowedPlatforms: [],
    requireAccessCode: false,
    accessCode: '',
    preventScreenshots: true,
    expirationDate: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if user is authenticated
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (!loading && !currentUser) {
    if (typeof window !== 'undefined') {
      router.replace('/login');
    }
    return null;
  }

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    
    // Create file preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleWatermarkOptionsChange = (options) => {
    setWatermarkOptions({
      ...watermarkOptions,
      ...options
    });
  };

  const handlePlatformRestrictionsChange = (restrictions) => {
    setPlatformRestrictions({
      ...platformRestrictions,
      ...restrictions
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleUpload = async () => {
    // This would be an actual upload to a server in a real app
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Simulate processing delay
          router.push('/dashboard');
        }, 1000);
      }
    }, 300);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Secure Content</h1>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  <span className="text-lg font-medium">1</span>
                </div>
                <span className="mt-2 text-sm font-medium">Select File</span>
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  <span className="text-lg font-medium">2</span>
                </div>
                <span className="mt-2 text-sm font-medium">Watermarking</span>
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  <span className="text-lg font-medium">3</span>
                </div>
                <span className="mt-2 text-sm font-medium">Access Control</span>
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 4 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 4 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 4 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  <span className="text-lg font-medium">4</span>
                </div>
                <span className="mt-2 text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>

          {/* Upload Steps */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {step === 1 && (
              <UploadForm 
                file={file} 
                onFileChange={handleFileChange}
                filePreview={filePreview}
              />
            )}

            {step === 2 && (
              <WatermarkOptions 
                options={watermarkOptions}
                onChange={handleWatermarkOptionsChange}
                filePreview={filePreview}
                fileName={file?.name || ''}
              />
            )}

            {step === 3 && (
              <PlatformRestrictions 
                restrictions={platformRestrictions}
                onChange={handlePlatformRestrictionsChange}
              />
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Confirm Upload Details</h2>
                
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">File</h3>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-900 font-medium">{file?.name || 'No file selected'}</span>
                      <span className="ml-2 text-gray-500 text-sm">({(file?.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Watermarking</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                      {watermarkOptions.addVisible && (
                        <li>
                          Visible watermark: {watermarkOptions.visibleText || `Shared via GenShield - ${currentUser.email}`}
                        </li>
                      )}
                      {watermarkOptions.addInvisible && (
                        <li>
                          Invisible watermark with user ID and timestamp
                        </li>
                      )}
                      {watermarkOptions.blurSensitiveInfo && (
                        <li>
                          Sensitive information blurring enabled
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Platform Restrictions</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                      <li>
                        Allowed platforms: {platformRestrictions.allowedPlatforms.length > 0 
                          ? platformRestrictions.allowedPlatforms.join(', ') 
                          : 'No restrictions'}
                      </li>
                      {platformRestrictions.requireAccessCode && (
                        <li>
                          Access code required for viewing
                        </li>
                      )}
                      {platformRestrictions.preventScreenshots && (
                        <li>
                          Screenshot prevention enabled
                        </li>
                      )}
                      {platformRestrictions.expirationDate && (
                        <li>
                          Expires on: {new Date(platformRestrictions.expirationDate).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Uploading...</span>
                      <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 ? (
              <Button
                onClick={prevStep}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                disabled={isUploading}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={step === 1 && !file}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleUpload}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isUploading}
              >
                {isUploading ? 'Processing...' : 'Secure & Upload'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
