# Next Steps: Getting Your MongoDB Connection String

You're at step 2 of 3 in the MongoDB Atlas connection setup. Here's what to do:

## Step 1: Click "Drivers" (Connect to your application)

Click on the **"Drivers"** option (the one with the binary code icon - 1011 / 1011).

This will take you to step 3 where you'll see the connection string.

## Step 2: Select Node.js Driver

On the next screen:
1. You'll see a dropdown for **"Driver"**
2. Select **"Node.js"** from the dropdown
3. You'll see a version dropdown - select the latest version (usually 6.0 or higher)

## Step 3: Copy the Connection String

You'll see a connection string that looks like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

1. Click the **"Copy"** button next to the connection string
2. Paste it somewhere safe (like a text editor)

## Step 4: Replace Username and Password

The connection string has placeholders `<username>` and `<password>`.

1. Replace `<username>` with the database username you created earlier
2. Replace `<password>` with the database password you created earlier

**Example:**
- If your username is `loganszeto` and password is `MyPassword123`
- Change from: `mongodb+srv://<username>:<password>@cluster0...`
- To: `mongodb+srv://loganszeto:MyPassword123@cluster0...`

## Step 5: Add Database Name (Optional but Recommended)

Add `/health-sync` before the `?` to specify the database name:

```
mongodb+srv://loganszeto:MyPassword123@cluster0.xxxxx.mongodb.net/health-sync?retryWrites=true&w=majority
```

## Step 6: Use the Connection String

### For Local Development:
Create a file called `.env.local` in your project root (`/Users/loganszeto/Projects/loganszeto/`):

```bash
MONGODB_URI=mongodb+srv://loganszeto:MyPassword123@cluster0.xxxxx.mongodb.net/health-sync?retryWrites=true&w=majority
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your complete connection string (with username/password replaced)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

## Important Notes

⚠️ **Password Special Characters:**
If your password has special characters like `@`, `#`, `%`, etc., you need to URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `%` becomes `%25`
- `&` becomes `%26`
- etc.

Or use a password without special characters to avoid encoding issues.

## Quick Checklist

- [ ] Clicked "Drivers" option
- [ ] Selected "Node.js" as the driver
- [ ] Copied the connection string
- [ ] Replaced `<username>` with your actual username
- [ ] Replaced `<password>` with your actual password
- [ ] Added `/health-sync` before the `?` (optional)
- [ ] Created `.env.local` file (for local development)
- [ ] Added to Vercel environment variables (for deployment)

---

**You're almost there!** Once you have the connection string, you can use it in your project. 🚀

