'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HealthData } from '../../components/health/HealthDataParser';
import VO2MaxChart from '../../components/charts/VO2MaxChart';
import SleepChart from '../../components/charts/SleepChart';
import CaloriesChart from '../../components/charts/CaloriesChart';

export default function RecoveryLoop() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await fetch('/data/health.json');
      if (!response.ok) {
        throw new Error('Failed to fetch health data');
      }
      const data = await response.json();
      
      // Convert string dates back to Date objects
      const processedData: HealthData = {
        sleepAnalysis: data.sleepAnalysis.map((entry: any) => ({
          ...entry,
          startDate: new Date(entry.startDate),
          endDate: new Date(entry.endDate)
        })),
        vo2Max: data.vo2Max.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        })),
        activeEnergy: data.activeEnergy.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }))
      };

      setHealthData(processedData);
      setLastUpdated(new Date(data.lastUpdated || Date.now()));
    } catch (err) {
      setError('Error loading health data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <Link 
          href="/data" 
          className="text-[#e6c384] hover:text-gray-400 transition-colors mb-6 inline-block"
        >
          ← Back to Projects
        </Link>
        
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">The Recovery Loop</h1>
        <h2 className="text-[#7c7c7c] text-xl mb-8">A Strength Training Insights Dashboard</h2>

        {lastUpdated && (
          <p className="text-[#7c7c7c] text-sm mb-4">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}

        {loading ? (
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-400">Loading your health data...</p>
          </div>
        ) : error ? (
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : healthData ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VO2MaxChart data={healthData.vo2Max} />
              <CaloriesChart data={healthData.activeEnergy} />
            </div>
            <SleepChart data={healthData.sleepAnalysis} />
          </div>
        ) : null}

        <div className="mt-12 space-y-8">
          <section>
            <h3 className="text-[#e6c384] text-2xl mb-4">About This Project</h3>
            <p className="text-gray-400 text-base sm:text-lg">
              The Recovery Loop is a personal health analytics dashboard that helps uncover relationships 
              between sleep, recovery, and cardiovascular health in the context of strength training.
              Using data from your Apple Watch, you can identify patterns and optimize your 
              training and recovery.
            </p>
          </section>

          <section>
            <h3 className="text-[#e6c384] text-2xl mb-4">Data Pipeline</h3>
            <p className="text-gray-400 text-base sm:text-lg">
              Your health data is automatically synced from your Apple Watch through Health Auto Export, 
              stored securely in iCloud, and updated to this dashboard via GitHub. The process is fully 
              automated, ensuring your dashboard always shows your latest metrics.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 