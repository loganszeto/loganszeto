# Fixing Vercel Deployment Protection (401 Error)

Your Vercel deployment has **Deployment Protection** enabled, which is causing the 401 "Authentication Required" error. Here's how to fix it:

## The Problem

The URL you're using (`health-auto-export-eoc0sqn8x-logan-szetos-projects.vercel.app`) is a **preview deployment** that has Vercel Authentication enabled. This blocks the Health Auto Export app from sending data.

## Solution 1: Disable Deployment Protection (Recommended)

1. Go to [vercel.com](https://vercel.com) → Your **health-auto-export** project
2. Click **Settings** → **Deployment Protection**
3. Under **"Preview Deployments"**, set it to **"None"** (or "Password" if you want basic protection)
4. **Save** the settings
5. **Redeploy** your project (or wait for the next deployment)

## Solution 2: Use Production URL Instead

If you want to keep protection on previews, use your **production URL**:

1. Go to Vercel project → **Settings** → **Domains**
2. Find your production domain (usually `health-auto-export.vercel.app` or your custom domain)
3. Use that URL in the Health Auto Export app instead

**Production URL format:**
```
https://health-auto-export.vercel.app/api/sync
```

## Solution 3: Add Bypass Token (Advanced)

If you need to keep protection but allow API access:

1. Go to Vercel project → **Settings** → **Deployment Protection**
2. Generate a **Bypass Token**
3. Add the token to your Health Auto Export app's endpoint URL:
   ```
   https://your-url.vercel.app/api/sync?x-vercel-protection-bypass=YOUR_TOKEN
   ```

**Note:** This is more complex and not recommended for simple use cases.

## Quick Fix Steps

1. **Go to Vercel** → Your project → **Settings** → **Deployment Protection**
2. **Set Preview Deployments to "None"**
3. **Save**
4. **Redeploy** (or push a new commit)
5. **Update Health Auto Export app** with the new URL
6. **Test** - should work now!

## Verify It's Fixed

After disabling protection, test the endpoint:

```bash
curl https://health-auto-export-eoc0sqn8x-logan-szetos-projects.vercel.app/api/sync
```

You should see:
```json
{"status":"ok","message":"Health Auto Export API is running","endpoint":"/api/sync"}
```

If you see this, it's working! ✅

## Also Make Sure

1. **MONGODB_URI is set** in Vercel environment variables
2. **Environment variable is enabled** for Production, Preview, and Development
3. **Project is redeployed** after making changes

---

**The easiest fix is to disable deployment protection on preview deployments!** 🚀

