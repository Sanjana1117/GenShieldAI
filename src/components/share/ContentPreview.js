export default function ContentPreview({ content }) {
  if (!content) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-gray-500">No content selected</div>
      </div>
    );
  }

  const getContentPreview = () => {
    if (content.type === 'image') {
      return (
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else if (content.type === 'video') {
      return (
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else {
      // Document
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
              <p className="text-sm text-gray-500">{content.fileSize}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="h-32 flex items-center justify-center">
              <span className="text-gray-500">Document Preview</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const getSecurityFeaturesList = () => {
    const features = [];
    
    if (content.watermarked) {
      features.push({
        id: 'visible',
        name: 'Visible Watermark',
        description: 'Shows ownership information directly on the content'
      });
    }
    
    if (content.invisibleWatermark) {
      features.push({
        id: 'invisible',
        name: 'Invisible Watermark',
        description: 'Hidden digital fingerprint for tracing leaks'
      });
    }
    
    features.push({
      id: 'access',
      name: 'Access Control',
      description: 'Viewers need a unique code to access content'
    });
    
    features.push({
      id: 'logging',
      name: 'Access Logging',
      description: 'All views are logged with viewer information'
    });
    
    return features;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="relative">
        {/* Visible watermark overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="transform rotate-45 text-gray-500 opacity-20 whitespace-nowrap text-xl">
            Shared via GenShield • {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {getContentPreview()}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Features</h3>
        <ul className="space-y-3">
          {getSecurityFeaturesList().map(feature => (
            <li key={feature.id} className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <span className="text-gray-800 font-medium">{feature.name}</span>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Content Details</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">File Name</dt>
            <dd className="mt-1 text-gray-900">{content.title}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">File Type</dt>
            <dd className="mt-1 text-gray-900">{content.type.charAt(0).toUpperCase() + content.type.slice(1)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">File Size</dt>
            <dd className="mt-1 text-gray-900">{content.fileSize}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Date Created</dt>
            <dd className="mt-1 text-gray-900">{new Date(content.createdAt).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Access Code</dt>
            <dd className="mt-1 text-gray-900">{content.generatedAccessCode || 'Not set'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Views</dt>
            <dd className="mt-1 text-gray-900">{content.views}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
