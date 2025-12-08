# How to Handle Your MongoDB Password

Your connection string has a placeholder `<db_password>` that needs to be replaced with your actual password.

## Option 1: If You Remember Your Password

Simply replace `<db_password>` with your actual password:

**Before:**
```
mongodb+srv://loganszeto:<db_password>@cluster0.1ja8pim.mongodb.net/?appName=Cluster0
```

**After (example):**
```
mongodb+srv://loganszeto:MyPassword123@cluster0.1ja8pim.mongodb.net/?appName=Cluster0
```

## Option 2: If You Don't Remember Your Password

You'll need to reset it or create a new user:

### Reset Password for Existing User:

1. Go to MongoDB Atlas
2. Click **Security** → **Database Access**
3. Find the user `loganszeto` in the list
4. Click the **pencil icon** (Edit) next to the user
5. Click **"Edit Password"**
6. Click **"Autogenerate Secure Password"** or enter a new password
7. **IMPORTANT:** Copy the new password immediately!
8. Click **"Update User"**
9. Use the new password in your connection string

### Create a New User (Alternative):

1. Go to **Security** → **Database Access**
2. Click **"Add New Database User"**
3. Username: `healthuser` (or any name you want)
4. Password: Click **"Autogenerate Secure Password"** (copy it!)
5. Privileges: **"Read and write to any database"**
6. Click **"Add User"**
7. Use the new username and password in your connection string

## Complete Connection String Format

After replacing the password, also add the database name:

**Recommended format:**
```
mongodb+srv://loganszeto:YOUR_PASSWORD@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority
```

Changes:
- Replace `YOUR_PASSWORD` with your actual password
- Added `/health-sync` before the `?` (database name)
- Added `?retryWrites=true&w=majority` (connection options)

## Special Characters in Password

If your password has special characters like `@`, `#`, `%`, `&`, you need to URL-encode them:

- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `/` → `%2F`
- `=` → `%3D`

**Example:**
If password is `My@Pass#123`, use `My%40Pass%23123` in the connection string.

**Easier option:** Use a password without special characters to avoid encoding.

## Using the Connection String

### For Local Development:

Create `.env.local` in your project root:
```bash
MONGODB_URI=mongodb+srv://loganszeto:YOUR_PASSWORD@cluster0.1ja8pim.mongodb.net/health-sync?retryWrites=true&w=majority
```

### For Vercel:

1. Go to Vercel project → Settings → Environment Variables
2. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your complete connection string (with password)
   - **Environment**: All (Production, Preview, Development)
3. Click **Save**

## Quick Steps Right Now

1. **Go to MongoDB Atlas** → Security → Database Access
2. **Find user `loganszeto`** → Click Edit (pencil icon)
3. **Click "Edit Password"** → Generate new password
4. **Copy the password** immediately
5. **Replace `<db_password>`** in your connection string
6. **Add `/health-sync`** before the `?` for database name
7. **Use it** in `.env.local` or Vercel

---

**You're almost done!** Just need to get that password set. 🚀

