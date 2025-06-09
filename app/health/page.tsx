'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface HealthDataPoint {
  date: string;
  value: number;
}

interface SleepDataPoint {
  startDate: string;
  endDate: string;
  value: 'INBED' | 'ASLEEP' | 'AWAKE';
}

interface HealthData {
  activeEnergy: HealthDataPoint[];
  sleepAnalysis: SleepDataPoint[];
}

interface StoredHealthData {
  timestamp: string;
  data: HealthData;
}

export default function HealthPage() {
  const [healthData, setHealthData] = useState<StoredHealthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await fetch('/api/health/sync');
      const result = await response.json();
      setHealthData(result.data);
    } catch (err) {
      setError('Failed to fetch health data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Process calories data for the chart
  const processCaloriesData = () => {
    if (!healthData.length) return [];
    
    // Get the most recent data entry
    const latestData = healthData[healthData.length - 1].data;
    
    return latestData.activeEnergy.map(point => ({
      time: new Date(point.date).toLocaleString(),
      calories: point.value
    }));
  };

  // Process sleep data for the chart
  const processSleepData = () => {
    if (!healthData.length) return [];
    
    // Get the most recent data entry
    const latestData = healthData[healthData.length - 1].data;
    
    return latestData.sleepAnalysis.map(point => ({
      time: new Date(point.startDate).toLocaleString(),
      duration: (new Date(point.endDate).getTime() - new Date(point.startDate).getTime()) / (1000 * 60 * 60), // Convert to hours
      status: point.value
    }));
  };

  if (loading) return <div className="p-4">Loading health data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Health Data Dashboard</h1>
      
      <div className="space-y-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processCaloriesData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#8884d8"
                  name="Calories Burned"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sleep Analysis</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processSleepData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#82ca9d"
                  name="Sleep Duration (hours)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 