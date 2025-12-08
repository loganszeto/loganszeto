# Setting Up Your MongoDB Connection String

Now that you have your connection string, here's what to do:

## Step 1: Format Your Connection String

Make sure your connection string includes:
1. Your username and password (replace placeholders)
2. Database name (`/health-sync`)
3. Connection options (`?retryWrites=true&w=majority`)

**Format:**
```
mongodb+srv://loganszeto:YOUR_PASSWORD@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with your actual password.

## Step 2: Add to Local Development (.env.local)

1. Open your project root: `/Users/loganszeto/Projects/loganszeto/`
2. Create or edit `.env.local` file
3. Add this line:
   ```bash
   MONGODB_URI=mongodb+srv://loganszeto:YOUR_PASSWORD@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority
   ```
4. Replace `YOUR_PASSWORD` with your actual password
5. Save the file

## Step 3: Test Locally

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Test the API endpoint:
   - Visit: `http://localhost:3000/api/health/sync` (should show status)
   - Or visit: `http://localhost:3000/api/health/data` (should show empty or existing data)

3. Check the terminal for any MongoDB connection errors

## Step 4: Add to Vercel (For Deployment)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Find your project (or import `health-auto-export` repo if not deployed yet)
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: Your complete connection string (same as in `.env.local`)
   - **Environment**: Select all three (Production, Preview, Development)
6. Click **"Save"**
7. **Redeploy** your project (Vercel will automatically redeploy when you add env vars)

## Step 5: Verify Network Access in MongoDB Atlas

Make sure MongoDB Atlas allows connections from anywhere:

1. Go to MongoDB Atlas
2. Click **Security** → **Network Access**
3. Make sure there's an entry for `0.0.0.0/0` (allows all IPs)
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

## Quick Checklist

- [ ] Connection string has username and password (no placeholders)
- [ ] Connection string includes `/health-sync` database name
- [ ] Connection string includes `?retryWrites=true&w=majority`
- [ ] Added to `.env.local` file
- [ ] Tested locally (no errors)
- [ ] Added to Vercel environment variables
- [ ] MongoDB Network Access allows `0.0.0.0/0`
- [ ] Ready to deploy!

---

**Once these are done, you're ready to deploy and start syncing health data!** 🚀

