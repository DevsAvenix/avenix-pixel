# 🚀 Avenix Pixel Integration

## Super Simple Integration - Just ONE Line!

Add this single line before your closing `</body>` tag:

```html
<script src="https://avenix-pixel.vercel.app/pixel.js"></script>
```

**That's it!** Your website is now fully tracked with time-on-page analytics.

---

## Advanced Options

### Option 1: Debug Mode (for Testing)
```html
<script>
  window.AvenixConfig = { debug: true };
</script>
<script src="https://avenix-pixel.vercel.app/pixel.js"></script>
```

### Option 2: Async Loading (Best Performance)
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

---

## ✅ Benefits of Domain-Based Tracking

- **Zero configuration** - No client IDs to manage
- **Automatic identification** - Your domain = your client ID
- **One script for everyone** - Same code for all clients
- **No mistakes possible** - Can't use wrong client ID
- **Super simple onboarding** - Just copy/paste once

---

## 📊 What Gets Tracked

✅ **Client identification** (your domain name)  
✅ **Every page visit** on your website  
✅ **Time spent on each page** (in seconds)  
✅ **Complete page URLs**  
✅ **Device and browser information**  
✅ **Visit timestamps**  
✅ **User navigation patterns**

---

## 🔧 Testing Your Integration

1. Add the script to your website
2. Visit any page on your site
3. Open browser DevTools → Console tab
4. Enable debug mode to see: `[Avenix Pixel] Avenix pixel tracking initialized for domain: yourdomain.com`
5. Check Network tab for requests to `avenix-pixel.vercel.app/track`
6. Stay on page for a few seconds, then navigate away
7. Verify tracking pixel was sent with time data

---

## 📈 What You'll See in Analytics

Your data will be identified by your domain name:
- `example.com` - All traffic from example.com
- `shop.example.com` - All traffic from shop.example.com  
- `blog.example.com` - All traffic from blog.example.com

Each subdomain is tracked separately for detailed analytics.

---

## 🆘 Support

If you need help with integration:
- Enable debug mode to see console messages
- Check that the script loads in your Network tab
- Verify requests are sent to our tracking endpoint
- Contact support with your domain name for assistance

---

## 🔒 Privacy & Performance

- **Lightweight** - Minimal impact on page load
- **GDPR compliant** - No personal data collected
- **Domain-based only** - Uses your website's domain name
- **Fast loading** - Cached and optimized delivery
- **Non-blocking** - Won't slow down your website 