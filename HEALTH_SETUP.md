# Health Auto Export Setup Guide for loganszeto.com

## Complete Setup Instructions

### Step 1: Install Health Auto Export App

1. Open the App Store on your iPhone
2. Search for "Health Auto Export"
3. Download and install the app
4. Open the app and grant it permission to access your Health data

### Step 2: Configure API Export in the App

1. **Open Health Auto Export app** on your iPhone

2. **Navigate to Settings:**
   - Tap the **Settings** icon (gear icon) in the bottom navigation
   - Scroll down and tap **API Export**

3. **Enable API Export:**
   - Toggle **Enable API Export** to **ON** (green)

4. **Configure Endpoint:**
   - Tap **Endpoint URL**
   - Enter: `https://loganszeto.com/api/health/sync`
   - Tap **Done** or **Save**

5. **Set Format:**
   - Tap **Format**
   - Select **JSON**

6. **Configure Sync Settings:**
   - **Sync Frequency**: Set to **Daily** (recommended)
   - **Time Range**: Set to **Last 24 hours**
   - **Include Workouts**: Enable if you want workout data

7. **Test the Connection:**
   - Tap **Test Connection** at the bottom
   - You should see a success message if everything is configured correctly

8. **Send Initial Data:**
   - Tap **Sync Now** to send your first batch of health data
   - Wait for the success confirmation

### Step 3: Verify Data is Being Received

1. Visit your website: https://loganszeto.com/projects/health-auto-export
2. Scroll down to the "Health Dashboard" section
3. You should see your health metrics displayed:
   - Active Energy (calories)
   - Heart Rate
   - Steps
   - Sleep hours
   - All other metrics from your Apple Watch

### Step 4: Automatic Daily Sync

Once configured, the Health Auto Export app will automatically sync your health data daily to your website. You don't need to do anything else - it will run in the background.

## Troubleshooting

### If data doesn't appear:

1. **Check the endpoint URL:**
   - Make sure it's exactly: `https://loganszeto.com/api/health/sync`
   - No trailing slashes
   - Using HTTPS (not HTTP)

2. **Test the connection:**
   - In the Health Auto Export app, tap "Test Connection"
   - If it fails, check your internet connection

3. **Manually sync:**
   - Tap "Sync Now" in the app
   - Wait a few seconds, then refresh your website

4. **Check app permissions:**
   - Make sure Health Auto Export has permission to read Health data
   - Go to iPhone Settings → Health → Data Access & Devices → Health Auto Export
   - Enable all the metrics you want to sync

### Common Issues:

- **"Connection failed"**: Check that your website is live and the endpoint is correct
- **"No data"**: Make sure you have health data in Apple Health app
- **"Permission denied"**: Grant Health Auto Export access to Health data in iPhone Settings

## What Data Gets Synced?

The app will sync all available health metrics from your Apple Watch, including:
- Active Energy (calories burned)
- Heart Rate
- Steps
- Sleep Analysis
- VO2 Max
- Workouts
- And many more metrics

## API Endpoint Details

- **URL**: `https://loganszeto.com/api/health/sync`
- **Method**: POST
- **Format**: JSON
- **Authentication**: None (public endpoint for your personal data)

## Viewing Your Data

Once synced, visit: **https://loganszeto.com/projects/health-auto-export**

The dashboard will show:
- Latest health metrics
- All available metrics from your Apple Watch
- Last sync timestamp
- Real-time updates (refreshes every 5 minutes)

## Support

If you encounter any issues:
1. Check the Health Auto Export app's connection status
2. Verify the endpoint URL is correct
3. Make sure your website is deployed and accessible
4. Check that MongoDB is configured with your MONGODB_URI environment variable

