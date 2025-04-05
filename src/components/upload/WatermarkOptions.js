import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function WatermarkOptions({ options, onChange, filePreview, fileName }) {
  const { currentUser } = useAuth();
  const [visibleWatermarkText, setVisibleWatermarkText] = useState(
    options.visibleText || `Shared via GenShield - ${currentUser?.email || 'User'}`
  );

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setVisibleWatermarkText(text);
    onChange({ visibleText: text });
  };

  const getFileTypeIcon = () => {
    if (!fileName) return null;
    
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Watermark Options</h2>
        <p className="text-gray-600">
          Customize how your content is protected with watermarking technology.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="addVisible"
                  name="addVisible"
                  type="checkbox"
                  checked={options.addVisible}
                  onChange={handleOptionChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="addVisible" className="font-medium text-gray-700">
                  Add visible watermark
                </label>
                <p className="text-gray-500 text-sm">
                  Displays your watermark text visibly on the content
                </p>
              </div>
            </div>

            {options.addVisible && (
              <div>
                <label htmlFor="visibleText" className="block text-sm font-medium text-gray-700 mb-1">
                  Watermark Text
                </label>
                <input
                  type="text"
                  id="visibleText"
                  name="visibleText"
                  value={visibleWatermarkText}
                  onChange={handleTextChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter watermark text"
                />
              </div>
            )}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="addInvisible"
                  name="addInvisible"
                  type="checkbox"
                  checked={options.addInvisible}
                  onChange={handleOptionChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="addInvisible" className="font-medium text-gray-700">
                  Add invisible watermark
                </label>
                <p className="text-gray-500 text-sm">
                  Embeds an invisible digital fingerprint that can trace leaks
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="blurSensitiveInfo"
                  name="blurSensitiveInfo"
                  type="checkbox"
                  checked={options.blurSensitiveInfo}
                  onChange={handleOptionChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="blurSensitiveInfo" className="font-medium text-gray-700">
                  Blur sensitive information
                </label>
                <p className="text-gray-500 text-sm">
                  AI-powered blurring of faces or sensitive data (experimental)
                </p>
              </div>
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
                  Invisible watermarking contains your user ID, timestamp, and sharing information. This is used for leak tracing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Watermark Preview</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 relative">
              {filePreview && filePreview.startsWith('data:image/') ? (
                <div className="relative">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="max-w-full rounded object-contain"
                  />
                  {options.addVisible && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-800 bg-white bg-opacity-40 px-3 py-1 rounded text-sm transform rotate-45">
                        {visibleWatermarkText}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  {getFileTypeIcon()}
                  <span className="text-gray-900 font-medium mt-2">{fileName || 'No file selected'}</span>
                  
                  {options.addVisible && (
                    <div className="mt-8 text-gray-500 bg-white bg-opacity-80 px-3 py-2 rounded text-sm transform rotate-12">
                      {visibleWatermarkText}
                    </div>
                  )}
                </div>
              )}
              
              {options.addInvisible && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Invisible Watermark
                  </span>
                </div>
              )}
              
              {options.blurSensitiveInfo && (
                <div className="absolute bottom-2 left-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Sensitive Data Blurring
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Actual watermark appearance may vary based on the content type and viewing device.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
