const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Configuration - Set your Make.com webhook URL here
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/3ck6uh1nfot8dg8hqbtcubhptt5r9pfm';

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

async function sendToMake(data) {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      console.log('✅ Sent to Make.com successfully');
    } else {
      console.log('❌ Make.com error:', response.status);
    }
  } catch (error) {
    console.log('❌ Failed to send to Make.com:', error.message);
  }
}

function logPixelEvent(req) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const pageURL = req.query.pageURL || req.headers.referer || 'unknown';
  const clientId = req.query.clientId || 'unknown';
  const event = req.query.event || 'page_view';
  const eventTime = req.query.eventTime || new Date().toISOString();
  const timeSpentSeconds = parseFloat(req.query.timeSpentSeconds) || 0;
  const userDevice = req.query.userDevice || userAgent;
  const referer = req.headers.referer || 'direct';

  const eventData = {
    event,
    clientId,
    ip,
    pageURL,
    eventTime,
    timeSpentSeconds,
    userDevice,
    serverTimestamp: new Date().toISOString(),
    userAgent,
    referer
  };

  console.log('🎯 Pixel fired:', {
    client: clientId,
    page: pageURL,
    time: timeSpentSeconds + 's',
    ip: ip.substring(0, 10) + '...',
    event: event
  });

  return eventData;
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'Avenix Universal Pixel Tracking Server',
    status: 'active',
    endpoints: ['/track', '/pixel.js', '/health'],
    integration: 'Add this to your site: <script src="https://avenix-pixel.vercel.app/pixel.js"></script>',
    webhook: {
      enabled: true,
      configured: !!MAKE_WEBHOOK_URL
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
    const eventData = logPixelEvent(req);
    console.log('📊 Event tracked:', eventData);
    
    // Send to webhook (fire-and-forget)
    sendToMake(eventData);
    
    // Return immediately (don't wait for webhook)
    res.status(200).json({ status: 'success', message: 'Event tracked' });
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
    enabled: true,
    configured: !!MAKE_WEBHOOK_URL
  }
}));

app.listen(port, () => {
  console.log(`Universal pixel server listening at http://localhost:${port}`);
  if (MAKE_WEBHOOK_URL) {
    console.log(`📡 Webhook enabled: ${MAKE_WEBHOOK_URL}`);
  } else {
    console.log('📡 Webhook disabled - configure MAKE_WEBHOOK_URL to enable');
  }
});

module.exports = app;

