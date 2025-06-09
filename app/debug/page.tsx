'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDebugData();
  }, []);

  const fetchDebugData = async () => {
    try {
      const response = await fetch('/api/health/debug');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch debug data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-[#e6c384]">Loading debug data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data) return <div className="p-4 text-[#e6c384]">No data available</div>;

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <Link 
          href="/" 
          className="text-[#e6c384] hover:text-gray-400 transition-colors mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">Health Data Debug View</h1>
        
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-[#e6c384] text-xl font-semibold mb-2">Latest Data Received</h2>
            <p className="text-[#7c7c7c] text-sm mb-4">
              Timestamp: {new Date(data.timestamp).toLocaleString()}
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[#e6c384] font-medium mb-2">Raw Data:</h3>
                <pre className="bg-gray-800 p-4 rounded overflow-auto max-h-96 text-[#7c7c7c]">
                  {JSON.stringify(data.rawData, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="text-[#e6c384] font-medium mb-2">Parsed Data:</h3>
                <pre className="bg-gray-800 p-4 rounded overflow-auto max-h-96 text-[#7c7c7c]">
                  {JSON.stringify(data.parsedData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 