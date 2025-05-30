const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed

// Endpoint for the homepage pixel
app.get('/pixel/home', (req, res) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const pageURL = req.query.url;
  const eventTime = req.query.time;
  const userDevice = req.query.device;
  const pixelSource = 'Homepage'; // Hardcoded for this endpoint

  console.log(`----- Homepage Pixel Data Received -----
    Timestamp: ${new Date().toISOString()}
    Source: ${pixelSource}
    IP Address: ${ipAddress}
    Page URL: ${pageURL}
    Event Time (from pixel): ${eventTime ? new Date(parseInt(eventTime)).toISOString() : 'N/A'}
    Device: ${userDevice}
  --------------------------------------`);

  // Respond with a 204 No Content, as we're just logging
  // Or send back a 1x1 transparent GIF if you prefer
  res.status(204).send();
});

// Endpoint for the thank-you page pixel
app.get('/pixel/thankyou', (req, res) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const pageURL = req.query.url;
  const eventTime = req.query.time;
  const userDevice = req.query.device;
  const pixelSource = 'Thank-You Page'; // Hardcoded for this endpoint

  console.log(`----- Thank-You Pixel Data Received -----
    Timestamp: ${new Date().toISOString()}
    Source: ${pixelSource}
    IP Address: ${ipAddress}
    Page URL: ${pageURL}
    Event Time (from pixel): ${eventTime ? new Date(parseInt(eventTime)).toISOString() : 'N/A'}
    Device: ${userDevice}
  ---------------------------------------`);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Pixel server listening at http://localhost:${port}`); //tes
});