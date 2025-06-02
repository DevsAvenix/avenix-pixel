const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

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

  console.log('📊 Event tracked:', eventData);

  return eventData;
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'Avenix Universal Pixel Tracking Server',
    status: 'active',
    endpoints: ['/track', '/pixel.js', '/health'],
    integration: 'Add this to your site: <script src="https://avenix-pixel.vercel.app/pixel.js"></script>'
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
app.get('/track', async (req, res) => {
  try {
    const eventData = logPixelEvent(req);
    
    // Send to Make.com webhook
    try {
      console.log('🚀 Sending to Make.com webhook...');
      const response = await fetch('https://hook.us2.make.com/3ck6uh1nfot8dg8hqbtcubhptt5r9pfm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      
      if (response.ok) {
        console.log('✅ Make.com webhook sent successfully:', response.status);
      } else {
        console.log('❌ Make.com webhook failed:', response.status);
      }
    } catch (webhookError) {
      console.log('❌ Make.com webhook error:', webhookError.message);
    }
    
    res.status(200).json({ status: 'success', message: 'Event tracked' });
  } catch (err) {
    console.error('Error in /track:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Health check
app.get('/health', (req, res) => res.status(200).json({ 
  status: 'healthy', 
  timestamp: new Date().toISOString()
}));

app.listen(port, () => {
  console.log(`Universal pixel server listening at http://localhost:${port}`);
});

module.exports = app;

