const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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

function logPixelEvent(req) {
  const ip = getClientIp(req);
  const clientId = getClientId(req);
  const pageURL = req.query.url || req.body.url || 'unknown';
  const eventTime = req.query.time || req.body.time || Date.now();
  const timeSpent = req.query.timeSpent || 0; // Time spent on page in seconds
  const userDevice = req.query.device || req.body.device || req.headers['user-agent'] || 'unknown';
  
  // Enhanced structured log for all page tracking
  console.log(JSON.stringify({
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
  }));
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'Avenix Universal Pixel Tracking Server',
    status: 'active',
    endpoints: ['/track', '/health']
  });
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
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() }));

app.listen(port, () => {
  console.log(`Universal pixel server listening at http://localhost:${port}`);
});

module.exports = app;

