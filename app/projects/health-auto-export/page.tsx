'use client';

import Link from 'next/link';
import { projects } from '@/lib/projectsData';
import HealthDashboard from '@/app/components/health/HealthDashboard';

export default function HealthAutoExport() {
  const project = projects.find(p => p.slug === 'health-auto-export');

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <Link 
          href="/data" 
          className="text-[#e6c384] hover:text-gray-400 transition-colors mb-6 inline-block"
        >
          ← Back to Projects
        </Link>
        
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-2">{project?.title}</h1>
            <p className="text-gray-400 text-base sm:text-lg mb-4">
              {project?.description}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-8">
          {project?.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7c7c7c] hover:text-[#e6c384] transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          )}
          {project?.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7c7c7c] hover:text-[#e6c384] transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="bg-[#1f1f28] border border-[#363646] rounded-lg p-8 mb-8">
          <h2 className="text-[#e6c384] text-2xl mb-4">Setup Instructions</h2>
          <div className="space-y-4 text-gray-400 text-sm">
            <div>
              <p className="mb-2 font-semibold text-[#e6c384]">1. Install Health Auto Export App</p>
              <p>Download the <a href="https://www.healthyapps.dev/" target="_blank" rel="noopener noreferrer" className="text-[#e6c384] hover:underline">Health Auto Export</a> app on your iPhone from the App Store.</p>
            </div>
            <div>
              <p className="mb-2 font-semibold text-[#e6c384]">2. Configure API Export</p>
              <p className="mb-2">In the Health Auto Export app:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-[#7c7c7c]">
                <li>Open the app and go to <strong>Settings</strong> → <strong>API Export</strong></li>
                <li>Toggle <strong>Enable API Export</strong> to ON</li>
                <li>Set <strong>Endpoint URL</strong> to: <code className="bg-[#16161d] px-2 py-1 rounded text-[#e6c384]">https://loganszeto.com/api/health/sync</code></li>
                <li>Set <strong>Format</strong> to <strong>JSON</strong></li>
                <li>Set <strong>Sync Frequency</strong> to <strong>Daily</strong> (recommended)</li>
                <li>Set <strong>Time Range</strong> to <strong>Last 24 hours</strong></li>
                <li>Tap <strong>Test Connection</strong> to verify it works</li>
                <li>Tap <strong>Sync Now</strong> to send your first batch of data</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-[#e6c384]">3. View Dashboard</p>
              <p>Once data is synced, it will appear in the dashboard below. The app will automatically sync daily.</p>
            </div>
            <div className="bg-[#16161d] border border-[#363646] rounded p-4 mt-4">
              <p className="text-[#7c7c7c] text-xs">
                📖 For detailed setup instructions, see the <a href="https://www.healthyapps.dev/blog/how-to-connect-to-apple-health-server" target="_blank" rel="noopener noreferrer" className="text-[#e6c384] hover:underline">Health Auto Export setup guide</a>
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-[#1f1f28] border border-[#363646] rounded-lg p-8">
          <h2 className="text-[#e6c384] text-2xl mb-6">Health Dashboard</h2>
          <HealthDashboard />
        </div>
      </div>
    </div>
  );
}

