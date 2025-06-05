const fs = require('fs');
const path = require('path');

// Update these paths based on your Health Auto Export settings
const HEALTH_EXPORT_PATH = process.env.HEALTH_EXPORT_PATH || path.join(process.env.HOME, 'Library/Mobile Documents/iCloud~com~healthyapps~healthexport/Documents/latest_export.json');
const OUTPUT_PATH = path.join(process.cwd(), 'public/data/health.json');

function processHealthData() {
  try {
    // Read the Health Auto Export data
    const rawData = JSON.parse(fs.readFileSync(HEALTH_EXPORT_PATH, 'utf8'));
    
    // Process the data into our format
    const processedData = {
      lastUpdated: new Date().toISOString(),
      vo2Max: rawData.samples
        .filter(sample => sample.type === 'HKQuantityTypeIdentifierVO2Max')
        .map(sample => ({
          date: sample.startDate,
          value: sample.value
        })),
      activeEnergy: rawData.samples
        .filter(sample => sample.type === 'HKQuantityTypeIdentifierActiveEnergyBurned')
        .map(sample => ({
          date: sample.startDate,
          value: sample.value
        })),
      sleepAnalysis: rawData.samples
        .filter(sample => sample.type === 'HKCategoryTypeIdentifierSleepAnalysis')
        .map(sample => ({
          startDate: sample.startDate,
          endDate: sample.endDate,
          value: sample.value === 0 ? 'INBED' : 
                 sample.value === 1 ? 'ASLEEP' : 'AWAKE'
        }))
    };

    // Ensure the output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the processed data
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(processedData, null, 2));
    console.log('Health data processed successfully');
  } catch (error) {
    console.error('Error processing health data:', error);
    process.exit(1);
  }
}

processHealthData(); 