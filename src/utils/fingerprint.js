/**
 * Utility functions for digital fingerprinting of content and access events
 */

/**
 * Generates a digital fingerprint for the current browser/device
 * @returns {object} Fingerprint data
 */
export const generateDeviceFingerprint = () => {
  if (typeof window === 'undefined') {
    return { id: 'server-side', confidence: 0 };
  }

  // Collect available browser information
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    screenColorDepth: window.screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform: navigator.platform,
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(','),
    doNotTrack: navigator.doNotTrack,
    touchSupport: 'ontouchstart' in window,
    cookiesEnabled: navigator.cookieEnabled,
    timestamp: new Date().toISOString()
  };

  // Generate a hash of the fingerprint for identification
  // This is a simple mock implementation
  const fingerprintId = btoa(encodeURIComponent(JSON.stringify(fingerprint))).substring(0, 24);
  
  return {
    id: fingerprintId,
    data: fingerprint,
    confidence: 0.85 // Mock confidence score
  };
};

/**
 * Logs an access event with fingerprinting data
 * @param {string} contentId - ID of the content being accessed
 * @param {string} eventType - Type of access event (view, download, share)
 * @param {object} additionalData - Any additional data to log
 * @returns {object} Logged event data
 */
export const logAccessEvent = async (contentId, eventType, additionalData = {}) => {
  // Get device fingerprint
  const fingerprint = generateDeviceFingerprint();
  
  // Get approximate geolocation if available
  let geo = { available: false };
  
  try {
    // This is a mock - in a real app, you might use a geolocation service
    // that provides city/country level data without requiring permission
    geo = {
      available: true,
      country: 'Unknown',
      city: 'Unknown',
      approximateOnly: true
    };
  } catch (error) {
    console.error('Error getting geolocation:', error);
  }
  
  // Construct the access log
  const logData = {
    contentId,
    eventType,
    timestamp: new Date().toISOString(),
    fingerprint: fingerprint.id,
    fingerprintConfidence: fingerprint.confidence,
    ipAddressHash: 'redacted', // This would be hashed server-side
    geo,
    deviceType: getDeviceType(),
    browserName: getBrowserName(),
    ...additionalData
  };
  
  // In a real app, this would be sent to a server endpoint
  console.log('Access event logged:', logData);
  
  // Mock server response
  return {
    success: true,
    logId: `log_${Math.random().toString(36).substring(2, 15)}`,
    timestamp: logData.timestamp,
    data: logData
  };
};

/**
 * Verifies the access permissions for the current user and content
 * @param {string} contentId - ID of the content being accessed
 * @param {string} accessCode - Access code provided
 * @param {object} options - Additional verification options
 * @returns {Promise<object>} Verification result
 */
export const verifyAccessPermissions = async (contentId, accessCode, options = {}) => {
  // This would call to a server endpoint to verify permissions
  // Mock implementation
  console.log(`Verifying access for content ${contentId} with code ${accessCode}`);
  
  const fingerprint = generateDeviceFingerprint();
  
  // In a real app, this would be a server verification
  const mockVerificationResult = {
    allowed: accessCode === 'ABC123', // Example check
    reason: accessCode !== 'ABC123' ? 'Invalid access code' : null,
    fingerprintMatches: true,
    platformAllowed: true,
    expirationStatus: 'valid',
    fingerprintId: fingerprint.id
  };
  
  // Log the access attempt regardless of success
  await logAccessEvent(contentId, mockVerificationResult.allowed ? 'authorized_access' : 'access_denied', {
    accessCode: '***redacted***',
    verificationResult: mockVerificationResult
  });
  
  return mockVerificationResult;
};

/**
 * Generates a report of access events for a piece of content
 * @param {string} contentId - ID of the content
 * @returns {Promise<object>} Report data
 */
export const generateAccessReport = async (contentId) => {
  // This would fetch data from the server in a real app
  // Mock implementation
  
  const mockAccessEvents = [
    {
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      eventType: 'view',
      fingerprint: 'fp_123456789abc',
      deviceType: 'desktop',
      browserName: 'Chrome',
      geo: {
        country: 'United States',
        city: 'New York',
        approximateOnly: true
      }
    },
    {
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      eventType: 'download',
      fingerprint: 'fp_123456789abc',
      deviceType: 'desktop',
      browserName: 'Chrome',
      geo: {
        country: 'United States',
        city: 'New York',
        approximateOnly: true
      }
    },
    {
      timestamp: new Date(Date.now() - 900000).toISOString(),
      eventType: 'view',
      fingerprint: 'fp_abcdef123456',
      deviceType: 'mobile',
      browserName: 'Safari',
      geo: {
        country: 'Canada',
        city: 'Toronto',
        approximateOnly: true
      }
    }
  ];
  
  return {
    contentId,
    totalViews: 2,
    totalDownloads: 1,
    uniqueVisitors: 2,
    events: mockAccessEvents,
    generated: new Date().toISOString()
  };
};

/**
 * Detects the user's device type
 * @returns {string} Device type (desktop, mobile, tablet)
 */
function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet';
  }
  
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
}

/**
 * Detects the user's browser name
 * @returns {string} Browser name
 */
function getBrowserName() {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('SamsungBrowser') > -1) {
    return 'Samsung Browser';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    return 'Opera';
  } else if (userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
    return 'Internet Explorer';
  }
  
  return 'Unknown';
}
