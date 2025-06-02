const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Configuration - Set your Make.com webhook URL here
const WEBHOOK_CONFIG = {
  enabled: true, // Set to false to disable webhook
  url: process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/3ck6uh1nfot8dg8hqbtcubhptt5r9pfm', // Your Make.com webhook URL
  timeout: 5000 // 5 second timeout
};

// Serve static files from public directory
app.use('/static', express.static(path.join(__dirname, 'public'), {
  maxAge: '1h', // Cache for 1 hour (short for easy updates)
  setHeaders: (res, path) => {
    // Set CORS headers for JavaScript files
    if (path.endsWith('.js')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

function getClientIp(req) {
  // Handles both single and multiple IPs in x-forwarded-for
  const xForwardedFor = req.headers['x-forwarded-for'];
  return xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.socket.remoteAddress;
}

function getClientId(req) {
  // Multiple ways to identify client (in order of preference)
  if (req.query.client) return req.query.client;
  
  // Extract from referrer domain
  const referer = req.headers.referer;
  if (referer) {
    try {
      const url = new URL(referer);
      return url.hostname;
    } catch (e) {
      return 'unknown-domain';
    }
  }
  
  return 'unknown';
}

async function sendToWebhook(data) {
  if (!WEBHOOK_CONFIG.enabled || !WEBHOOK_CONFIG.url) {
    return; // Skip if disabled or no URL configured
  }

  try {
    const response = await fetch(WEBHOOK_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(WEBHOOK_CONFIG.timeout)
    });

    if (response.ok) {
      console.log('✅ Webhook sent successfully');
    } else {
      console.log(`⚠️ Webhook failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('⚠️ Webhook timeout');
    } else {
      console.log('⚠️ Webhook error:', error.message);
    }
  }
}

function logPixelEvent(req) {
  const ip = getClientIp(req);
  const clientId = getClientId(req);
  const pageURL = req.query.url || req.body.url || 'unknown';
  const eventTime = req.query.time || req.body.time || Date.now();
  const timeSpent = req.query.timeSpent || 0; // Time spent on page in seconds
  const userDevice = req.query.device || req.body.device || req.headers['user-agent'] || 'unknown';
  
  // Enhanced structured log for all page tracking
  const trackingData = {
    event: 'page_view',
    clientId,
    ip,
    pageURL,
    eventTime: new Date(parseInt(eventTime)).toISOString(),
    timeSpentSeconds: parseInt(timeSpent),
    userDevice,
    serverTimestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer
  };

  // Log to console (for Vercel logs)
  console.log(JSON.stringify(trackingData));

  // Send to Make.com webhook (async, non-blocking)
  sendToWebhook(trackingData).catch(err => {
    console.log('Webhook send failed:', err.message);
  });

  return trackingData;
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'Avenix Universal Pixel Tracking Server',
    status: 'active',
    endpoints: ['/track', '/pixel.js', '/health'],
    integration: 'Add this to your site: <script src="https://avenix-pixel.vercel.app/pixel.js"></script>',
    webhook: {
      enabled: WEBHOOK_CONFIG.enabled,
      configured: !!WEBHOOK_CONFIG.url
    }
  });
});

// Hosted JavaScript file endpoint (cleaner URL)
app.get('/pixel.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
  res.sendFile(path.join(__dirname, 'public', 'avenix-pixel.js'));
});

// Universal tracking endpoint - tracks all page visits
app.get('/track', (req, res) => {
  try {
    logPixelEvent(req);
    res.status(200).json({ success: true, tracked: 'page_view' });
  } catch (err) {
    console.error('Error in /track:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Health check
app.get('/health', (req, res) => res.status(200).json({ 
  status: 'healthy', 
  timestamp: new Date().toISOString(),
  webhook: {
    enabled: WEBHOOK_CONFIG.enabled,
    configured: !!WEBHOOK_CONFIG.url
  }
}));

app.listen(port, () => {
  console.log(`Universal pixel server listening at http://localhost:${port}`);
  if (WEBHOOK_CONFIG.enabled && WEBHOOK_CONFIG.url) {
    console.log(`📡 Webhook enabled: ${WEBHOOK_CONFIG.url}`);
  } else {
    console.log('📡 Webhook disabled - configure MAKE_WEBHOOK_URL to enable');
  }
});

module.exports = app;

