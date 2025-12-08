# Complete Health Auto Export Setup Guide

## Overview

Your Health Auto Export project is set up to deploy separately to **Vercel** (free), while your main website stays on GitHub Pages. This allows API routes to work while keeping your main site on GitHub Pages.

## Architecture

- **Main Website** (`loganszeto` repo) → GitHub Pages → `loganszeto.com`
- **Health Auto Export** (`health-auto-export` repo) → Vercel → `health-auto-export.vercel.app`
- **Link**: When users click "Health Auto Export" on your main site, they go to the Vercel deployment

## Step 1: Deploy Health Auto Export to Vercel

### Quick Steps:

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project:**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose `health-auto-export` repository
   - Click **"Import"**

3. **Configure Project:**
   - Vercel will auto-detect Next.js
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Add:
     - **Name**: `MONGODB_URI`
     - **Value**: Your MongoDB connection string
     - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 1-2 minutes for deployment
   - Your site will be live at: `https://health-auto-export.vercel.app`

## Step 2: Get Your API Endpoint URL

After deployment, your API endpoint will be:
```
https://health-auto-export.vercel.app/api/sync
```

**Save this URL** - you'll need it for the Health Auto Export app!

## Step 3: Configure Health Auto Export App on iPhone

1. **Open Health Auto Export app** on your iPhone

2. **Navigate to API Export:**
   - Tap **Settings** (gear icon)
   - Tap **API Export**

3. **Enable API Export:**
   - Toggle **"Enable API Export"** to **ON** (green)

4. **Set Endpoint URL:**
   - Tap **"Endpoint URL"**
   - Enter: `https://health-auto-export.vercel.app/api/sync`
   - Tap **Done**

5. **Configure Format:**
   - Tap **"Format"**
   - Select **JSON**

6. **Set Sync Settings:**
   - **Sync Frequency**: **Daily** (recommended)
   - **Time Range**: **Last 24 hours**
   - **Aggregate Data**: Enable if you want aggregated data

7. **Test Connection:**
   - Scroll down and tap **"Test Connection"**
   - You should see a success message ✅

8. **Send Initial Data:**
   - Tap **"Sync Now"**
   - Wait for success confirmation
   - Your data is now being sent to Vercel!

## Step 4: Update Main Website Link

After Vercel deployment, update your main website:

1. **Edit** `/Users/loganszeto/Projects/loganszeto/lib/projectsData.ts`
2. **Update** the `liveUrl`:
   ```typescript
   liveUrl: 'https://health-auto-export.vercel.app'
   ```
3. **Commit and push** the change

Now when users click "Health Auto Export" on your main site, they'll go to the Vercel deployment.

## Step 5: View Your Dashboard

Visit: **https://health-auto-export.vercel.app**

You should see:
- Your health metrics (Active Energy, Heart Rate, Steps, Sleep)
- All available metrics from your Apple Watch
- Last sync timestamp
- Auto-refreshing dashboard

## Daily Automatic Sync

Once configured, the Health Auto Export app will automatically sync your health data to Vercel every day. No manual action needed!

## Troubleshooting

### 405 Error?
- Make sure you deployed to Vercel (not GitHub Pages)
- Check the endpoint URL is correct
- Verify the API route exists: `https://health-auto-export.vercel.app/api/sync`

### No Data Appearing?
1. Check Health Auto Export app connection status
2. Manually tap "Sync Now" in the app
3. Wait a few seconds, then refresh the Vercel dashboard
4. Check MongoDB connection is working

### Connection Failed?
- Verify the Vercel deployment is live
- Check the endpoint URL has no typos
- Make sure you're using HTTPS (not HTTP)
- Test the endpoint: `curl https://health-auto-export.vercel.app/api/sync`

## Summary

✅ **Deploy** `health-auto-export` repo to Vercel  
✅ **Add** `MONGODB_URI` environment variable  
✅ **Configure** Health Auto Export app with Vercel URL  
✅ **Update** main website link to Vercel deployment  
✅ **Enjoy** automatic daily health data sync!

## URLs

- **Main Website**: https://loganszeto.com (GitHub Pages)
- **Health Dashboard**: https://health-auto-export.vercel.app (Vercel)
- **API Endpoint**: https://health-auto-export.vercel.app/api/sync
- **GitHub Repo**: https://github.com/loganszeto/health-auto-export

---

**Everything is ready!** Just deploy to Vercel and configure the app. 🚀

