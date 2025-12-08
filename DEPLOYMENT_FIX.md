# Fix for 405 Error - API Routes Deployment

## The Problem

You're getting a **405 Not Allowed** error because **GitHub Pages is static hosting** and cannot run API routes (serverless functions). API routes require a platform that supports server-side execution.

## The Solution

You need to deploy your website to a platform that supports API routes. Here are your options:

### Option 1: Deploy to Vercel (Recommended)

Vercel supports Next.js API routes out of the box and is free for personal projects.

#### Steps:

1. **Connect your GitHub repo to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `loganszeto` repository

2. **Configure Environment Variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `MONGODB_URI` with your MongoDB connection string
   - Save

3. **Deploy:**
   - Vercel will automatically deploy
   - Your site will be available at `loganszeto.vercel.app`
   - Or connect your custom domain `loganszeto.com`

4. **Update Health Auto Export App:**
   - Change endpoint URL to: `https://loganszeto.com/api/health/sync`
   - (Or use the Vercel URL if custom domain isn't set up yet)

### Option 2: Use Netlify

Netlify also supports Next.js API routes.

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add `MONGODB_URI` environment variable
6. Deploy

### Option 3: Keep GitHub Pages for Static, Separate API

If you want to keep GitHub Pages for the static site, you could:
- Deploy just the API routes to Vercel/Netlify
- Update the endpoint URL in Health Auto Export to point to the API deployment
- Keep your main site on GitHub Pages

## Current Status

- ✅ API routes are properly configured with CORS
- ✅ MongoDB connection is set up
- ✅ Dashboard is ready to display data
- ❌ Need to deploy to a platform that supports API routes

## Quick Fix

**For immediate testing**, you can:

1. Deploy to Vercel (takes 2 minutes)
2. Update Health Auto Export endpoint to your Vercel URL
3. Test the sync

## After Deployment

Once deployed to Vercel/Netlify:

1. Your API endpoint will be: `https://loganszeto.com/api/health/sync`
2. The Health Auto Export app will be able to POST data successfully
3. Your dashboard will display the health data

## Verify It's Working

After deploying, test the endpoint:
```bash
curl -X GET https://loganszeto.com/api/health/sync
```

You should get:
```json
{
  "status": "ok",
  "message": "Health Auto Export API is running",
  ...
}
```

If you get that, the API is working and ready to receive data from Health Auto Export!

