// Avenix Universal Pixel Tracking Script
// Version 1.0 - Domain-based tracking with time measurement
// This script is hosted centrally and auto-updates on all client sites

(function() {
  'use strict';
  
  // Configuration
  var config = {
    endpoint: 'https://avenix-pixel.vercel.app/track',
    fallbackTime: 30000, // 30 seconds
    debug: false
  };
  
  // Check for custom debug configuration
  if (window.AvenixConfig && window.AvenixConfig.debug) {
    config.debug = true;
  }
  
  var startTime = Date.now();
  var pageURL = window.location.href;
  var sent = false;
  var clientId = window.location.hostname; // Simple domain-based identification
  
  function log(message) {
    if (config.debug) {
      console.log('[Avenix Pixel]', message);
    }
  }
  
  function sendPixel(timeSpent) {
    if (sent) {
      log('Pixel already sent, skipping duplicate');
      return;
    }
    sent = true;
    
    try {
      var pixel = new Image();
      var params = [
        'clientId=' + encodeURIComponent(clientId),
        'pageURL=' + encodeURIComponent(pageURL),
        'eventTime=' + new Date(startTime).toISOString(),
        'timeSpentSeconds=' + Math.round(timeSpent / 1000),
        'userDevice=' + encodeURIComponent(navigator.userAgent),
        'event=page_view'
      ];
      
      pixel.src = config.endpoint + '?' + params.join('&');
      pixel.style.display = 'none';
      
      // Add to DOM to ensure request is sent
      if (document.body) {
        document.body.appendChild(pixel);
      }
      
      log('Pixel sent: ' + Math.round(timeSpent / 1000) + 's on ' + pageURL);
      
    } catch (e) {
      log('Error sending pixel: ' + e.message);
    }
  }
  
  function handlePageLeave() {
    var timeSpent = Date.now() - startTime;
    sendPixel(timeSpent);
  }
  
  // Event listeners for different scenarios
  window.addEventListener('beforeunload', handlePageLeave);
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      handlePageLeave();
    }
  });
  
  // Fallback timer for long page visits
  setTimeout(function() {
    if (!sent) {
      log('Fallback timer triggered');
      handlePageLeave();
    }
  }, config.fallbackTime);
  
  // Initialize
  log('Avenix pixel tracking initialized for domain: ' + clientId);
  
})(); 