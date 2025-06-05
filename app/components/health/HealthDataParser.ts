import { parseString } from 'xml2js';

export interface HealthData {
  sleepAnalysis: SleepEntry[];
  vo2Max: VO2MaxEntry[];
  activeEnergy: EnergyEntry[];
}

export interface SleepEntry {
  startDate: Date;
  endDate: Date;
  value: string; // 'INBED' | 'ASLEEP' | 'AWAKE'
  duration: number;
}

export interface VO2MaxEntry {
  date: Date;
  value: number;
}

export interface EnergyEntry {
  date: Date;
  value: number;
}

export class HealthDataParser {
  static async parseXMLData(xmlContent: string): Promise<HealthData> {
    return new Promise((resolve, reject) => {
      parseString(xmlContent, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        const records = result.HealthData.Record;
        const healthData: HealthData = {
          sleepAnalysis: [],
          vo2Max: [],
          activeEnergy: []
        };

        records.forEach((record: any) => {
          const type = record.$.type;
          const startDate = new Date(record.$.startDate);
          const value = record.$.value;

          switch (type) {
            case 'HKCategoryTypeIdentifierSleepAnalysis':
              healthData.sleepAnalysis.push({
                startDate,
                endDate: new Date(record.$.endDate),
                value: record.$.value,
                duration: (new Date(record.$.endDate).getTime() - startDate.getTime()) / (1000 * 60 * 60) // hours
              });
              break;
            
            case 'HKQuantityTypeIdentifierVO2Max':
              healthData.vo2Max.push({
                date: startDate,
                value: parseFloat(value)
              });
              break;
            
            case 'HKQuantityTypeIdentifierActiveEnergyBurned':
              healthData.activeEnergy.push({
                date: startDate,
                value: parseFloat(value)
              });
              break;
          }
        });

        resolve(healthData);
      });
    });
  }

  static processSleepData(sleepEntries: SleepEntry[]): {
    totalSleep: number;
    remSleep: number;
    deepSleep: number;
    lightSleep: number;
  } {
    // This is a simplified version - in reality, we'd need to analyze the sleep stages more carefully
    const totalSleep = sleepEntries.reduce((acc, entry) => 
      entry.value === 'ASLEEP' ? acc + entry.duration : acc, 0);
    
    // For now, we'll estimate these values - in reality, we'd need more detailed sleep stage data
    return {
      totalSleep,
      remSleep: totalSleep * 0.25, // Estimated
      deepSleep: totalSleep * 0.2, // Estimated
      lightSleep: totalSleep * 0.55 // Estimated
    };
  }
} 