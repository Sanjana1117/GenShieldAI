import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PlatformRestrictions({ restrictions, onChange }) {
  const [showCustomCode, setShowCustomCode] = useState(false);
  
  const platforms = [
    { id: 'email', name: 'Email', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'slack', name: 'Slack', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )},
    { id: 'instagram', name: 'Instagram', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'facebook', name: 'Facebook', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
      </svg>
    )},
    { id: 'twitter', name: 'Twitter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )},
    { id: 'linkedin', name: 'LinkedIn', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'whatsapp', name: 'WhatsApp', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )},
    { id: 'youtube', name: 'YouTube', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'other', name: 'Any Platform', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )}
  ];

  const handlePlatformChange = (platformId) => {
    let updatedPlatforms = [...restrictions.allowedPlatforms];
    
    if (platformId === 'other') {
      // If "Any Platform" is selected, clear all specific platforms
      updatedPlatforms = [];
    } else {
      // Toggle the selected platform
      if (updatedPlatforms.includes(platformId)) {
        updatedPlatforms = updatedPlatforms.filter(id => id !== platformId);
      } else {
        // Remove "Any Platform" if it was previously selected
        updatedPlatforms = updatedPlatforms.filter(id => id !== 'other');
        updatedPlatforms.push(platformId);
      }
    }
    
    onChange({ allowedPlatforms: updatedPlatforms });
  };

  const handleAccessCodeChange = (e) => {
    const { checked } = e.target;
    setShowCustomCode(checked);
    onChange({ requireAccessCode: checked });
  };

  const handleCustomCodeChange = (e) => {
    const code = e.target.value;
    onChange({ accessCode: code });
  };

  const handleScreenshotPreventionChange = (e) => {
    const { checked } = e.target;
    onChange({ preventScreenshots: checked });
  };

  const handleExpirationDateChange = (date) => {
    onChange({ expirationDate: date });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Access Control Settings</h2>
        <p className="text-gray-600">
          Control where and how your content can be accessed.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Allowed Platforms</h3>
        <p className="text-gray-600 mb-4">
          Select platforms where this content can be shared. Leave empty for no restrictions.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <div 
              key={platform.id}
              onClick={() => handlePlatformChange(platform.id)}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                restrictions.allowedPlatforms.includes(platform.id) 
                  ? 'bg-indigo-50 border-indigo-300' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 ${
                restrictions.allowedPlatforms.includes(platform.id) 
                  ? 'text-indigo-600' 
                  : 'text-gray-400'
              }`}>
                {platform.icon}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                restrictions.allowedPlatforms.includes(platform.id) 
                  ? 'text-indigo-800' 
                  : 'text-gray-700'
              }`}>
                {platform.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {restrictions.allowedPlatforms.length > 0 ? (
            <p>Content will only be viewable on the selected platforms.</p>
          ) : (
            <p>No platform restrictions applied. Content can be viewed anywhere.</p>
          )}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Access Restrictions</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="requireAccessCode"
                name="requireAccessCode"
                type="checkbox"
                checked={restrictions.requireAccessCode}
                onChange={handleAccessCodeChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="requireAccessCode" className="font-medium text-gray-700">
                Require access code
              </label>
              <p className="text-gray-500 text-sm">
                Viewers will need to enter a code to access the content
              </p>
            </div>
          </div>

          {showCustomCode && (
            <div className="ml-7">
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Access Code (optional)
              </label>
              <input
                type="text"
                id="accessCode"
                name="accessCode"
                value={restrictions.accessCode || ''}
                onChange={handleCustomCodeChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Leave blank to auto-generate a code"
              />
            </div>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="preventScreenshots"
                name="preventScreenshots"
                type="checkbox"
                checked={restrictions.preventScreenshots}
                onChange={handleScreenshotPreventionChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="preventScreenshots" className="font-medium text-gray-700">
                Prevent screenshots
              </label>
              <p className="text-gray-500 text-sm">
                Enable technical measures to block screen capture (may not work on all devices)
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date (optional)
            </label>
            <DatePicker
              selected={restrictions.expirationDate}
              onChange={handleExpirationDateChange}
              minDate={new Date()}
              placeholderText="No expiration"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              isClearable
            />
            <p className="mt-1 text-sm text-gray-500">
              Content will become inaccessible after this date
            </p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p>
              All access attempts are logged with digital fingerprinting. You'll be able to see who viewed your content and when.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
