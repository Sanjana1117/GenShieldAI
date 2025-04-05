import { useRef, useState } from 'react';
import Button from '../ui/Button';

export default function UploadForm({ file, onFileChange, filePreview }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

  const allowedFileTypes = [
    // Images
    'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml',
    // Documents
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Videos
    'video/mp4', 'video/webm', 'video/ogg'
  ];
  
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file) => {
    if (!file) return false;
    
    if (!allowedFileTypes.includes(file.type)) {
      setFileError('File type not supported. Please upload an image, document, or video.');
      return false;
    }
    
    if (file.size > maxFileSize) {
      setFileError(`File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB.`);
      return false;
    }
    
    setFileError('');
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      onFileChange(selectedFile);
    } else if (selectedFile) {
      onFileChange(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      onFileChange(droppedFile);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (file.type.startsWith('video/')) {
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Content</h2>
        <p className="text-gray-600">
          Select a file to upload. Your content will be secured with watermarking and access controls.
        </p>
      </div>

      <div 
        className={`mt-6 border-2 border-dashed rounded-lg p-6 ${
          dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-gray-50'
        } transition-colors duration-150 flex flex-col items-center justify-center cursor-pointer`}
        onClick={handleBrowseClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')}
          className="hidden"
        />
        
        {file ? (
          <div className="text-center">
            {filePreview && file.type.startsWith('image/') ? (
              <div className="mb-4 max-h-64 overflow-hidden">
                <img 
                  src={filePreview} 
                  alt="Preview" 
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            ) : (
              <div className="mb-4 flex justify-center">
                {getFileIcon()}
              </div>
            )}
            <div className="flex items-center justify-center">
              <span className="text-gray-900 font-medium">{file.name}</span>
              <span className="ml-2 text-gray-500 text-sm">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
            <p className="mt-2 text-sm text-indigo-600">Click or drag to change file</p>
          </div>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-center">
              <span className="text-gray-700 font-medium">Drag and drop your file here</span><br />
              <span className="text-gray-500 text-sm">or click to browse</span>
            </p>
          </>
        )}
      </div>

      {fileError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {fileError}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-900 mb-2">Supported File Types:</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Images (.jpg, .png, .gif, .svg)</span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Documents (.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx)</span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">Videos (.mp4, .webm, .ogg)</span>
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
              All uploaded content is secured with our advanced protection features. You'll be able to customize security settings in the next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
