# Avenix Pixel Tracking Server

A scalable pixel tracking solution for website analytics that supports multiple clients with a single server instance.

## 🚀 Features

- **Multi-client support** - One server handles hundreds of clients
- **Automatic client detection** - Identifies clients by domain or custom ID
- **Multiple pixel types** - Homepage views and conversion tracking
- **Real-time logging** - Structured JSON logs with full visitor data
- **Easy integration** - Simple JavaScript snippet for clients
- **Vercel-optimized** - Serverless deployment ready

## 📊 Tracked Data

Each pixel request captures:
- ✅ Client identification (domain or custom ID)
- ✅ Page URL and referrer
- ✅ Timestamp (client and server)
- ✅ Device/browser information
- ✅ IP address
- ✅ Page type (homepage vs conversion)

## 🔗 Available Endpoints

| Endpoint | Purpose | Use Case |
|----------|---------|-----------|
| `/pixel/home` | Homepage/general page tracking | Track page views, navigation |
| `/pixel/conversion` | Conversion tracking | Track purchases, signups, goals |
| `/pixel/thankyou` | Legacy support | Backward compatibility |
| `/health` | Health check | Server monitoring |

## 🛠 Client Integration

### Option 1: Basic Integration (Recommended)
Automatic client detection from domain:

**Homepage tracking:**
```html
<script>
(function() {
  var pixel = new Image();
  pixel.src = 'https://avenix-pixel.vercel.app/pixel/home?url=' + 
    encodeURIComponent(window.location.href) + 
    '&time=' + Date.now() + 
    '&device=' + encodeURIComponent(navigator.userAgent);
  pixel.style.display = 'none';
  document.body.appendChild(pixel);
})();
</script>
```

**Conversion tracking:**
```html
<script>
(function() {
  var pixel = new Image();
  pixel.src = 'https://avenix-pixel.vercel.app/pixel/conversion?url=' + 
    encodeURIComponent(window.location.href) + 
    '&time=' + Date.now() + 
    '&device=' + encodeURIComponent(navigator.userAgent);
  pixel.style.display = 'none';
  document.body.appendChild(pixel);
})();
</script>
```

### Option 2: With Client ID
For better tracking control, add `client=YOUR_CLIENT_ID` parameter to the pixel URL.

## 📈 Scaling Benefits

- **Single server instance** handles unlimited clients
- **No per-client configuration** required
- **Automatic client identification** reduces setup complexity
- **Simple integration** for clients - just copy/paste script
- **Cost-effective** - One Vercel deployment for all clients
- **Easy maintenance** - Update once, affects all clients

## 🚀 Deployment

1. Deploy to Vercel: `vercel --prod`
2. Update client scripts with your domain
3. Monitor logs in Vercel dashboard

## 📝 Log Format

```json
{
  "event": "pixel_tracking",
  "clientId": "example.com",
  "pixelSource": "homepage",
  "ip": "192.168.1.1",
  "pageURL": "https://example.com/page",
  "eventTime": "2024-01-01T12:00:00.000Z",
  "userDevice": "Mozilla/5.0...",
  "serverTimestamp": "2024-01-01T12:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://google.com"
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Deploy to Vercel
vercel --prod
```

## 📞 Support

For integration support or custom requirements, contact the Avenix team. 