# 🔗 Make.com Webhook Integration

## 🚀 Quick Setup

Your pixel tracking server automatically sends all tracking data to a Make.com webhook for automation workflows.

---

## 📋 Setup Steps

### 1. Create Make.com Webhook

1. **Log into** [Make.com](https://make.com)
2. **Create new scenario**
3. **Add "Webhooks" module** → **Custom webhook**
4. **Copy the webhook URL** (looks like: `https://hook.make.com/abc123...`)

### 2. Configure Your Pixel Server

**Option A: Environment Variable (Recommended for Vercel)**
```bash
# Set in Vercel dashboard under Environment Variables
MAKE_WEBHOOK_URL=https://hook.make.com/your-webhook-url-here
```

**Option B: Direct Configuration**
Edit `index.js` and replace the webhook URL:
```javascript
const WEBHOOK_CONFIG = {
  enabled: true,
  url: 'https://hook.make.com/your-webhook-url-here',
  timeout: 5000
};
```

### 3. Deploy & Test

1. **Deploy to Vercel** with the webhook URL configured
2. **Visit any tracked website** to trigger a pixel
3. **Check Make.com** - you should see webhook data received

---

## 📊 Data Format

Your Make.com webhook will receive this JSON data for every page visit:

```json
{
  "event": "page_view",
  "clientId": "example.com",
  "ip": "192.168.1.1",
  "pageURL": "https://example.com/products",
  "eventTime": "2024-01-01T12:00:00.000Z",
  "timeSpentSeconds": 45,
  "userDevice": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "serverTimestamp": "2024-01-01T12:00:45.000Z",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "referer": "https://google.com/search?q=example"
}
```

---

## 🛠 Make.com Automation Ideas

### 🎯 Lead Tracking
- **Trigger:** New page visit from specific domain
- **Action:** Add lead to CRM (HubSpot, Salesforce, etc.)

### 📧 Email Notifications
- **Trigger:** High engagement (time spent > 60 seconds)
- **Action:** Send notification email to sales team

### 📊 Analytics Dashboard
- **Trigger:** Every page visit
- **Action:** Send to Google Sheets or Airtable for analysis

### 💬 Slack Alerts
- **Trigger:** New visitor from target company domain
- **Action:** Post to Slack channel with visitor details

### 🔄 CRM Updates
- **Trigger:** Return visitor (same IP/domain)
- **Action:** Update contact record with latest activity

---

## 🔧 Advanced Configuration

### Disable Webhook (Keep Console Logs Only)
```javascript
const WEBHOOK_CONFIG = {
  enabled: false, // Disable webhook
  url: '',
  timeout: 5000
};
```

### Custom Timeout
```javascript
const WEBHOOK_CONFIG = {
  enabled: true,
  url: 'your-webhook-url',
  timeout: 10000 // 10 seconds
};
```

---

## 🔍 Testing & Debugging

### Check Webhook Status
Visit your server root: `https://avenix-pixel.vercel.app/`
```json
{
  "webhook": {
    "enabled": true,
    "configured": true
  }
}
```

### Server Logs
Watch Vercel function logs for:
- ✅ `Webhook sent successfully`
- ⚠️ `Webhook failed: 400 Bad Request`
- ⚠️ `Webhook timeout`

### Make.com Testing
1. **Use webhook tester** in Make.com to see raw data
2. **Check scenario history** for execution details
3. **Test with debug mode** on client websites

---

## 🚨 Error Handling

- **Webhook failures don't affect tracking** - data still logs to Vercel
- **5-second timeout** prevents slow webhooks from blocking requests
- **Automatic retries** - not implemented (Make.com handles reliability)
- **Failed webhook = warning log** but tracking continues normally

---

## 📈 Best Practices

### 1. **Filter Data in Make.com**
Use filters to only process relevant events:
- Specific domains only
- Minimum time spent thresholds
- Exclude internal traffic

### 2. **Batch Processing**
For high-traffic sites, consider:
- Aggregating data before sending to final destination
- Using Make.com's data store for temporary buffering

### 3. **Rate Limiting**
Make.com has usage limits:
- Free plan: 1,000 operations/month
- Paid plans: Higher limits
- Consider filtering to stay within limits

---

## 🆘 Troubleshooting

**Webhook not receiving data?**
- Check webhook URL is correct
- Verify webhook is enabled in Make.com scenario
- Check Vercel logs for webhook errors

**Make.com scenario not triggering?**
- Ensure webhook module is properly configured
- Check Make.com scenario is active
- Use "Run once" to test webhook reception

**High traffic causing issues?**
- Consider filtering data in the server before sending
- Use Make.com's queue features for high-volume processing 