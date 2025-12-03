# Complete Health Auto Export Setup for loganszeto.com

## ✅ What's Been Set Up

### 1. Database & API Endpoints
- ✅ MongoDB connection configured (`lib/mongodb.ts`)
- ✅ API endpoint to receive data: `/api/health/sync`
- ✅ API endpoint to fetch data: `/api/health/data`
- ✅ Data models created for health metrics

### 2. Dashboard
- ✅ Health dashboard component created
- ✅ Displays: Active Energy, Heart Rate, Steps, Sleep, and all metrics
- ✅ Auto-refreshes every 5 minutes
- ✅ Shows last updated timestamp

### 3. Website Integration
- ✅ Dashboard integrated into `/projects/health-auto-export` page
- ✅ Styled to match your personal website
- ✅ Setup instructions included on the page

## 📱 How to Configure Health Auto Export App on Your iPhone

### Step-by-Step Instructions:

1. **Download the App**
   - Open App Store on iPhone
   - Search "Health Auto Export"
   - Install the app

2. **Grant Permissions**
   - Open Health Auto Export app
   - Allow access to Health data when prompted
   - Go to iPhone Settings → Health → Data Access & Devices → Health Auto Export
   - Enable all metrics you want to sync

3. **Configure API Export**
   - Open Health Auto Export app
   - Tap **Settings** (gear icon)
   - Tap **API Export**
   - Toggle **Enable API Export** to **ON**

4. **Set Endpoint URL**
   - Tap **Endpoint URL**
   - Enter exactly: `https://loganszeto.com/api/health/sync`
   - Tap **Done**

5. **Configure Format**
   - Tap **Format**
   - Select **JSON**

6. **Set Sync Frequency**
   - Tap **Sync Frequency**
   - Select **Daily** (recommended)

7. **Set Time Range**
   - Tap **Time Range**
   - Select **Last 24 hours**

8. **Test Connection**
   - Scroll down and tap **Test Connection**
   - You should see "Connection successful" or similar

9. **Send Initial Data**
   - Tap **Sync Now**
   - Wait for success confirmation
   - Your data will now appear on your website!

## 🌐 Viewing Your Data

Visit: **https://loganszeto.com/projects/health-auto-export**

The dashboard will show:
- Latest health metrics (Active Energy, Heart Rate, Steps, Sleep)
- All available metrics from your Apple Watch
- Last sync timestamp
- Auto-refreshes every 5 minutes

## 🔄 Automatic Daily Sync

Once configured, the app will automatically sync your health data to your website every day. You don't need to do anything - it runs in the background.

## 🛠️ Technical Details

### API Endpoint
- **URL**: `https://loganszeto.com/api/health/sync`
- **Method**: POST
- **Format**: JSON
- **Database**: MongoDB (stored in `health-sync` database, `health-data` collection)

### Data Flow
1. Health Auto Export app sends data → `https://loganszeto.com/api/health/sync`
2. API stores data in MongoDB
3. Dashboard fetches data from `/api/health/data`
4. Data displays on your website

### Environment Variables Needed
Make sure your deployment has:
- `MONGODB_URI` - Your MongoDB connection string

## 🐛 Troubleshooting

### No data appearing?
1. Check endpoint URL is exactly: `https://loganszeto.com/api/health/sync`
2. Test connection in the app
3. Manually sync by tapping "Sync Now"
4. Refresh your website after a few seconds
5. Check MongoDB connection is working

### Connection failed?
1. Verify your website is live and accessible
2. Check the endpoint URL has no typos
3. Make sure you're using HTTPS (not HTTP)
4. Check your internet connection

### Permission issues?
1. Go to iPhone Settings → Health → Data Access & Devices
2. Find Health Auto Export
3. Enable all metrics you want to sync

## 📊 What Data Gets Synced?

All available metrics from your Apple Watch, including:
- Active Energy (calories)
- Heart Rate
- Steps
- Sleep Analysis
- VO2 Max
- Workouts
- And many more health metrics

## 🚀 Next Steps

1. **Configure the app** using the steps above
2. **Test the connection** in the app
3. **Sync your data** by tapping "Sync Now"
4. **Visit your website** to see your health dashboard
5. **Enjoy automatic daily syncs!**

## 📝 Notes

- Data syncs automatically daily (you can also manually sync anytime)
- Dashboard refreshes every 5 minutes when viewing
- All data is stored securely in your MongoDB database
- Only you can access your health data through your website

---

**Need help?** Check the Health Auto Export app's connection status and make sure your website is deployed with the MongoDB connection configured.

