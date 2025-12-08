# Fixing MongoDB Authentication Error

You're getting "bad auth : authentication failed". Here's how to fix it:

## Step 1: Verify Your Database User Exists

1. Go to MongoDB Atlas
2. Click **Security** → **Database Access**
3. Look for user `loganszeto` in the list
4. If it doesn't exist, you need to create it (see below)

## Step 2: Reset the Password

1. In **Database Access**, find user `loganszeto`
2. Click the **pencil icon** (Edit) next to the user
3. Click **"Edit Password"**
4. Click **"Autogenerate Secure Password"** (recommended)
   - **OR** enter a new password (make it simple, no special characters)
5. **IMPORTANT:** Copy the new password immediately!
6. Click **"Update User"**

## Step 3: Update Your Connection String

1. Open `.env.local` in your project
2. Replace the password in the connection string with the NEW password
3. Make sure there are NO angle brackets `< >` around the password

**Format:**
```
MONGODB_URI=mongodb+srv://loganszeto:NEW_PASSWORD@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority
```

## Step 4: Restart Dev Server

After updating the password:
1. Stop the dev server (Ctrl+C)
2. Restart: `npm run dev`
3. Test again: `curl http://localhost:3003/api/health/data/`

## Step 5: Verify Network Access

Make sure MongoDB allows connections:

1. Go to MongoDB Atlas → **Security** → **Network Access**
2. Check if there's an entry for `0.0.0.0/0` (allows all IPs)
3. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"** → **"Confirm"**

## Common Issues

### Password has special characters
If your password has `@`, `#`, `%`, etc., you need to URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`

**Better solution:** Use a password without special characters.

### Angle brackets in password
If MongoDB gave you a password like `<c7F7AJOR1>`, the angle brackets are NOT part of the password. Use just `c7F7AJOR1`.

### User doesn't exist
If user `loganszeto` doesn't exist:
1. Click **"Add New Database User"**
2. Username: `loganszeto`
3. Password: Autogenerate or create one
4. Privileges: **"Read and write to any database"**
5. Click **"Add User"**

## Test Your Connection

After fixing, run:
```bash
node test-mongodb.js
```

You should see:
```
✅ Connected to MongoDB!
✅ Database ping successful!
```

---

**Once authentication works, your health data sync will work!** 🚀

