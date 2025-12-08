# How to Get Your MongoDB Connection String

## Option 1: MongoDB Atlas (Free - Recommended)

MongoDB Atlas offers a free tier (M0) that's perfect for personal projects.

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with your email or GitHub

### Step 2: Create a Free Cluster

1. After signing in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (Free forever)
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"**
5. Wait 3-5 minutes for cluster to be created

### Step 3: Create Database User

1. In the Security section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `loganszeto`)
5. Enter a strong password (save this!)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Vercel/serverless functions)
   - Or add specific IPs: `0.0.0.0/0` (allows all IPs)
4. Click **"Confirm"**

### Step 5: Get Your Connection String

1. Go back to **"Database"** (or **"Clusters"**)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Replace Placeholders

Replace `<username>` and `<password>` in the connection string:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- URL encode the password if it has special characters

**Example:**
```
mongodb+srv://loganszeto:MyPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 7: Add Database Name (Optional)

You can add the database name to the connection string:
```
mongodb+srv://loganszeto:MyPassword123@cluster0.xxxxx.mongodb.net/health-sync?retryWrites=true&w=majority
```

The `/health-sync` part specifies the database name.

## Option 2: Local MongoDB (If You Have It Running)

If you have MongoDB running locally:

```
mongodb://localhost:27017/health-sync
```

Or with authentication:
```
mongodb://username:password@localhost:27017/health-sync
```

## Option 3: Other MongoDB Hosting Services

- **MongoDB Atlas** (recommended - free tier available)
- **Railway** (has MongoDB addon)
- **Render** (has MongoDB addon)
- **MongoDB Compass** (for local development)

## Using the Connection String

### For Local Development:

1. Create `.env.local` in your project root:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/health-sync?retryWrites=true&w=majority
   ```

2. Make sure `.env.local` is in `.gitignore` (don't commit it!)

### For Vercel Deployment:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your connection string
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

## Security Notes

⚠️ **Important:**
- Never commit your connection string to GitHub
- Use environment variables (`.env.local` for local, Vercel env vars for production)
- Keep your database password secure
- Use strong passwords for database users

## Testing Your Connection

After setting up, you can test if it works:

1. The API endpoint will automatically test the connection when it receives data
2. Or check Vercel logs after deployment
3. The Health Dashboard will show an error if the connection fails

## Troubleshooting

### "Authentication failed"
- Check username and password are correct
- Make sure password is URL-encoded if it has special characters
- Verify the database user exists

### "Connection timeout"
- Check Network Access allows your IP (or `0.0.0.0/0` for all)
- Verify the connection string is correct
- Check if your cluster is running

### "Database not found"
- The database will be created automatically when you first insert data
- Or add `/health-sync` to your connection string

## Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Allowed network access (0.0.0.0/0)
- [ ] Got connection string
- [ ] Replaced `<username>` and `<password>`
- [ ] Added to `.env.local` (local) or Vercel env vars (production)
- [ ] Tested connection

---

**Need help?** MongoDB Atlas has great documentation and the free tier is perfect for getting started!

