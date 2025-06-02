# Avenix Universal Pixel Tracking Server

A scalable universal pixel tracking solution with **hosted JavaScript integration** that captures every page visit and time spent across unlimited client websites with just one line of code.

## 🚀 Features

- **ONE LINE integration** - Clients just add `<script src="..."></script>`
- **Centralized updates** - Modify script once, updates everywhere automatically
- **Universal page tracking** - Tracks all pages on any website
- **Time spent tracking** - Measures actual time users spend on each page
- **Multi-client support** - One server handles unlimited clients
- **Automatic client detection** - Identifies clients by domain or custom ID
- **Hosted JavaScript** - No complex code for clients to copy/paste
- **Auto-caching** - Browser caches script for better performance
- **Real-time logging** - Structured JSON logs with full visitor data
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
| `/pixel.js` | Hosted JavaScript tracking script |
| `/track` | Universal page tracking API |
| `/health` | Health check |

## 🛠 Super Simple Client Integration

### For Your Clients - Just ONE Line!

```html
<script src="https://avenix-pixel.vercel.app/pixel.js"></script>
```

**That's it!** Place before `</body>` tag and all pages are tracked automatically with domain-based identification.

### Advanced Options

**Debug mode (for testing):**
```html
<script>
  window.AvenixConfig = { debug: true };
</script>
<script src="https://avenix-pixel.vercel.app/pixel.js"></script>
```

**Async loading (best performance):**
```html
<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://avenix-pixel.vercel.app/pixel.js';
    s.async = true;
    document.head.appendChild(s);
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

- **One line integration** - clients just add one script tag
- **Centralized control** - update script logic once, affects all clients
- **Universal tracking** - automatically captures every page visit + time spent
- **Zero configuration** - no setup needed for new pages
- **Browser caching** - script loads fast after first visit
- **Version control** - track and manage script versions centrally
- **Easy debugging** - enable debug mode for any client
- **Cost-effective** - one server handles unlimited traffic

## 🚀 For Your Hundreds of Clients

**Give them this:**
```html
<script src="https://avenix-pixel.vercel.app/pixel.js"></script>
```

**Benefits for clients:**
- ✅ Copy/paste once, works forever
- ✅ Auto-updates with new features
- ✅ No maintenance required
- ✅ Fast loading and cached
- ✅ Works on all pages automatically

**Benefits for you:**
- ✅ Update tracking logic anytime
- ✅ No need to contact clients for updates
- ✅ Version control and rollbacks
- ✅ Centralized debugging
- ✅ Easy A/B testing of tracking methods

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

## 🎯 Perfect Solution for Scale

- ✅ **One server** handles unlimited clients and traffic
- ✅ **One line of code** per client (add once, works forever)
- ✅ **Centralized updates** - modify tracking logic anytime
- ✅ **Zero per-client maintenance** required
- ✅ **Complete analytics** - page views + engagement metrics
- ✅ **Enterprise ready** - built for hundreds of clients

## 📞 Support

For integration support or custom requirements, contact the Avenix team.

## 🔗 Make.com Webhook Integration

**Automatically send all tracking data to Make.com for powerful automation workflows!**

- ✅ **CRM Integration** - Auto-add leads to HubSpot, Salesforce, etc.
- ✅ **Email Alerts** - Notify sales team of high-engagement visitors  
- ✅ **Analytics Dashboard** - Send data to Google Sheets, Airtable
- ✅ **Slack Notifications** - Alert team of target company visits
- ✅ **Custom Workflows** - Unlimited automation possibilities

**Setup:** Configure `MAKE_WEBHOOK_URL` environment variable → See `WEBHOOK_SETUP.md` for details.

--- 