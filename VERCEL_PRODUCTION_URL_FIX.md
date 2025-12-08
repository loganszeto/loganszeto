# Using Production URL Instead

Since you don't see "Preview Deployments" settings, let's use your **production URL** instead. Production deployments usually don't have protection enabled.

## Step 1: Find Your Production URL

1. In Vercel, go to **Settings** → **Domains**
2. Look for your production domain. It will be one of:
   - `health-auto-export.vercel.app` (default Vercel domain)
   - Or a custom domain if you've set one up

## Step 2: Test the Production URL

Your production API endpoint will be:
```
https://health-auto-export.vercel.app/api/sync
```

(Replace `health-auto-export.vercel.app` with your actual production domain)

Test it in your browser - you should see:
```json
{"status":"ok","message":"Health Auto Export API is running","endpoint":"/api/sync"}
```

If you see this JSON (not an authentication page), it's working! ✅

## Step 3: Update Health Auto Export App

1. Open Health Auto Export app on iPhone
2. Go to your automation settings
3. Change the endpoint URL to your **production URL**:
   ```
   https://health-auto-export.vercel.app/api/sync
   ```
4. Tap **"Test Connection"** - should work now!
5. Tap **"Sync Now"** to send your data

## Alternative: Enable OPTIONS Allowlist

If you want to keep using the preview URL, you can enable the **OPTIONS Allowlist**:

1. On the Deployment Protection page you're viewing
2. Find the **"OPTIONS Allowlist"** section
3. Toggle it to **"Enabled"**
4. Add this path: `/api/sync`
5. Click **"Save"**

This allows CORS preflight requests to bypass protection, which might help.

## Why Production URL is Better

- ✅ No authentication required
- ✅ More stable (doesn't change with each deployment)
- ✅ Better for production use
- ✅ No protection by default

---

**Use your production URL - it's the easiest solution!** 🚀

