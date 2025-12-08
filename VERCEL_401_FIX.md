# Fixing 401 Authentication Error on Vercel

You're getting a 401 "Authentication Required" error when the Health Auto Export app tries to send data to your Vercel deployment. Here's how to fix it:

## Most Likely Cause: Missing Environment Variable

The 401 error is likely happening because the `MONGODB_URI` environment variable is not set in Vercel, causing the API route to fail during initialization.

## Step 1: Add MONGODB_URI to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Find your **health-auto-export** project
3. Click on the project
4. Go to **Settings** → **Environment Variables**
5. Click **"Add New"**
6. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://loganszeto:c7F7AJOR1@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority`
   - **Environment**: Select **ALL THREE** (Production, Preview, Development)
7. Click **"Save"**

## Step 2: Redeploy Your Project

After adding the environment variable:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots** (⋯) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete (1-2 minutes)

**OR** just push a new commit to trigger a redeploy:
```bash
cd /Users/loganszeto/Projects/health-auto-export
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

## Step 3: Test the Endpoint

After redeploying, test the endpoint:

1. Visit in browser: `https://health-auto-export-eoc0sqn8x-logan-szetos-projects.vercel.app/api/sync`
2. You should see: `{"status":"ok","message":"Health Auto Export API is running","endpoint":"/api/sync"}`

If you see this, the endpoint is working!

## Step 4: Update Health Auto Export App

1. Open Health Auto Export app on iPhone
2. Go to your automation settings
3. Make sure the endpoint URL is exactly:
   ```
   https://health-auto-export-eoc0sqn8x-logan-szetos-projects.vercel.app/api/sync
   ```
4. Tap **"Test Connection"** - should work now!
5. Tap **"Sync Now"** to send your first data

## Alternative: Check Vercel Protection Settings

If the issue persists:

1. Go to Vercel project → **Settings** → **Deployment Protection**
2. Make sure **"Vercel Authentication"** is **DISABLED** (unless you want to require login)
3. If it's enabled, disable it for the API routes

## Verify Environment Variable is Set

To verify the env var is set correctly:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. You should see `MONGODB_URI` listed
3. Make sure it's enabled for **Production**, **Preview**, and **Development**

## Check Vercel Logs

If still not working:

1. Go to Vercel project → **Deployments**
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Click on `/api/sync`
5. Check the logs for any errors

Common errors you might see:
- `MONGODB_URI is not defined` → Environment variable not set
- `Authentication failed` → Wrong MongoDB password
- `Connection timeout` → MongoDB network access not configured

## Quick Checklist

- [ ] Added `MONGODB_URI` to Vercel environment variables
- [ ] Enabled for Production, Preview, and Development
- [ ] Redeployed the project
- [ ] Tested endpoint in browser (should return JSON)
- [ ] Updated Health Auto Export app with correct URL
- [ ] Tested connection in app
- [ ] Synced data successfully

---

**The most common issue is forgetting to add the environment variable to Vercel!** Once you add it and redeploy, it should work. 🚀

