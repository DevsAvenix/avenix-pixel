# Avenix Universal Pixel Tracking Server

A scalable universal pixel tracking solution that captures every page visit across multiple client websites with a single server instance.

## 🚀 Features

- **Universal page tracking** - One script tracks all pages on any website
- **Multi-client support** - One server handles unlimited clients
- **Automatic client detection** - Identifies clients by domain or custom ID
- **Complete visitor journey** - Track every page visit and navigation pattern
- **Real-time logging** - Structured JSON logs with full visitor data
- **Super simple integration** - Single JavaScript snippet for clients
- **Vercel-optimized** - Serverless deployment ready

## 📊 Tracked Data

Each page visit captures:
- ✅ Client identification (domain or custom ID)
- ✅ Complete page URL and page title
- ✅ Visit timestamp (client and server)
- ✅ Device/browser information
- ✅ IP address
- ✅ Referrer information
- ✅ User agent details

## 🔗 Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/track` | Universal page tracking (main endpoint) |
| `/pixel/home` | Legacy support |
| `/pixel/conversion` | Legacy support |
| `/pixel/thankyou` | Legacy support |
| `/health` | Health check |

## 🛠 Client Integration

### Simple Universal Script (Recommended)
One script for all pages - automatic client detection:

```html
<script>
// Avenix Universal Pixel - Place before closing </body> tag
(function() {
  var pixel = new Image();
  pixel.src = 'https://avenix-pixel.vercel.app/track?url=' + 
    encodeURIComponent(window.location.href) + 
    '&time=' + Date.now() + 
    '&device=' + encodeURIComponent(navigator.userAgent);
  pixel.style.display = 'none';
  document.body.appendChild(pixel);
})();
</script>
```

### With Custom Client ID
For better tracking control:

```html
<script>
// Replace CLIENT_ID with assigned identifier
(function() {
  var pixel = new Image();
  pixel.src = 'https://avenix-pixel.vercel.app/track?client=CLIENT_ID&url=' + 
    encodeURIComponent(window.location.href) + 
    '&time=' + Date.now() + 
    '&device=' + encodeURIComponent(navigator.userAgent);
  pixel.style.display = 'none';
  document.body.appendChild(pixel);
})();
</script>
```

## 📈 Massive Scaling Benefits

- **Single script** - clients just copy/paste once on all pages
- **Universal tracking** - automatically captures every page visit
- **Zero configuration** - no setup needed for new pages
- **Complete coverage** - never miss a page visit
- **Simple maintenance** - update once, affects all clients
- **Cost-effective** - one server handles unlimited traffic

## 🚀 Client Instructions

**For your hundreds of clients:**
1. Copy the script above
2. Paste before `</body>` tag on every page
3. Done! All pages are now tracked automatically

## 📝 Log Format

```json
{
  "event": "page_view",
  "clientId": "example.com",
  "ip": "192.168.1.1",
  "pageURL": "https://example.com/any-page",
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

## 🎯 Perfect for Scale

This solution is designed for businesses serving hundreds of clients:
- ✅ **One server** handles unlimited clients and traffic
- ✅ **One script** per client (place on all pages)
- ✅ **Zero per-client setup** required
- ✅ **Automatic tracking** of all pages
- ✅ **Complete visitor analytics** out of the box

## 📞 Support

For integration support or custom requirements, contact the Avenix team. 