# Avenix Universal Pixel Tracking Server

A scalable universal pixel tracking solution that captures every page visit and **time spent on each page** across multiple client websites with a single server instance.

## 🚀 Features

- **Universal page tracking** - One script tracks all pages on any website
- **Time spent tracking** - Measures actual time users spend on each page
- **Multi-client support** - One server handles unlimited clients
- **Automatic client detection** - Identifies clients by domain or custom ID
- **Complete visitor journey** - Track every page visit and engagement metrics
- **Real-time logging** - Structured JSON logs with full visitor data
- **Super simple integration** - Single JavaScript snippet for clients
- **Vercel-optimized** - Serverless deployment ready

## 📊 Tracked Data

Each page visit captures:
- ✅ Client identification (domain or custom ID)
- ✅ Complete page URL and page title
- ✅ Visit timestamp (when user arrived)
- ✅ **Time spent on page (in seconds)**
- ✅ Device/browser information
- ✅ IP address
- ✅ Referrer information
- ✅ User agent details

## 🔗 Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/track` | Universal page tracking with time spent |
| `/health` | Health check |

## 🛠 Enhanced Client Integration

### Time Tracking Script (Recommended)
Captures actual time spent on each page:

```html
<script>
// Avenix Universal Pixel with Time Tracking
(function() {
  var startTime = Date.now();
  var pageURL = window.location.href;
  var sent = false;
  
  function sendPixel(timeSpent) {
    if (sent) return; // Prevent duplicate sends
    sent = true;
    
    var pixel = new Image();
    pixel.src = 'https://avenix-pixel.vercel.app/track?url=' + 
      encodeURIComponent(pageURL) + 
      '&time=' + startTime + 
      '&timeSpent=' + Math.round(timeSpent / 1000) + 
      '&device=' + encodeURIComponent(navigator.userAgent);
    pixel.style.display = 'none';
    document.body.appendChild(pixel);
  }
  
  // Send pixel when user leaves the page
  window.addEventListener('beforeunload', function() {
    var timeSpent = Date.now() - startTime;
    sendPixel(timeSpent);
  });
  
  // Send pixel when page becomes hidden (mobile/tab switching)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      var timeSpent = Date.now() - startTime;
      sendPixel(timeSpent);
    }
  });
  
  // Fallback: send after 30 seconds if user is still on page
  setTimeout(function() {
    if (!sent) {
      var timeSpent = Date.now() - startTime;
      sendPixel(timeSpent);
    }
  }, 30000);
  
})();
</script>
```

### With Custom Client ID
For better tracking control:

```html
<script>
// Replace CLIENT_ID with assigned identifier
(function() {
  var startTime = Date.now();
  var pageURL = window.location.href;
  var sent = false;
  var clientId = 'CLIENT_ID';
  
  function sendPixel(timeSpent) {
    if (sent) return;
    sent = true;
    
    var pixel = new Image();
    pixel.src = 'https://avenix-pixel.vercel.app/track?client=' + clientId + 
      '&url=' + encodeURIComponent(pageURL) + 
      '&time=' + startTime + 
      '&timeSpent=' + Math.round(timeSpent / 1000) + 
      '&device=' + encodeURIComponent(navigator.userAgent);
    pixel.style.display = 'none';
    document.body.appendChild(pixel);
  }
  
  window.addEventListener('beforeunload', function() {
    var timeSpent = Date.now() - startTime;
    sendPixel(timeSpent);
  });
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      var timeSpent = Date.now() - startTime;
      sendPixel(timeSpent);
    }
  });
  
  setTimeout(function() {
    if (!sent) {
      var timeSpent = Date.now() - startTime;
      sendPixel(timeSpent);
    }
  }, 30000);
  
})();
</script>
```

## ⏱️ Time Tracking Features

- **Accurate measurement** - Tracks from page load to page leave
- **Multiple triggers** - Captures time on page unload, tab switch, or timeout
- **Prevents duplicates** - Only sends once per page visit
- **Mobile optimized** - Handles tab switching and app backgrounding
- **Fallback timer** - Ensures data is captured even if events don't fire

## 📈 Massive Scaling Benefits

- **Single script** - clients just copy/paste once on all pages
- **Universal tracking** - automatically captures every page visit + time spent
- **Zero configuration** - no setup needed for new pages
- **Complete analytics** - page views + engagement metrics
- **Simple maintenance** - update once, affects all clients
- **Cost-effective** - one server handles unlimited traffic

## 🚀 Client Instructions

**For your hundreds of clients:**
1. Copy the enhanced script above
2. Paste before `</body>` tag on every page
3. Done! All pages tracked with time spent automatically

## 📝 Enhanced Log Format

```json
{
  "event": "page_view",
  "clientId": "example.com",
  "ip": "192.168.1.1",
  "pageURL": "https://example.com/any-page",
  "eventTime": "2024-01-01T12:00:00.000Z",
  "timeSpentSeconds": 45,
  "userDevice": "Mozilla/5.0...",
  "serverTimestamp": "2024-01-01T12:00:45.000Z",
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

## 🎯 Perfect for Scale + Analytics

This solution provides both scale and deep insights:
- ✅ **One server** handles unlimited clients and traffic
- ✅ **One script** per client (place on all pages)
- ✅ **Zero per-client setup** required
- ✅ **Page views + time spent** analytics
- ✅ **Complete engagement metrics** out of the box

## 📞 Support

For integration support or custom requirements, contact the Avenix team. 