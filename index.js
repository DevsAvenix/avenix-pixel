const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed

app.use(express.json());

function getClientIp(req) {
  // Handles both single and multiple IPs in x-forwarded-for
  const xForwardedFor = req.headers['x-forwarded-for'];
  return xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.socket.remoteAddress;
}

function logPixelEvent(req, pixelSource) {
  const ip = getClientIp(req);
  const pageURL = req.query.url || req.body.url || 'unknown';
  const eventTime = req.query.time || req.body.time || Date.now();
  const userDevice = req.query.device || req.body.device || req.headers['user-agent'] || 'unknown';

  // Structured log for Vercel
  console.log(JSON.stringify({
    event: 'pixel',
    pixelSource,
    ip,
    pageURL,
    eventTime,
    userDevice,
    timestamp: new Date().toISOString()
  }));
}

app.get('/', (req, res) => {
  res.send('Hi');
});

// Endpoint for the homepage pixel
app.get('/pixel/home', (req, res) => {
  try {
    logPixelEvent(req, 'homepage');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in /pixel/home:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint for the thank-you page pixel
app.get('/pixel/thankyou', (req, res) => {
  try {
    logPixelEvent(req, 'thankyou');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in /pixel/thankyou:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Optional: health check
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(port, () => {
  console.log(`Pixel server listening at http://localhost:${port}`);
});

module.exports = app;
