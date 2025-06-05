import Link from 'next/link';

export default function RecoveryLoop() {
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
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl sm:text-3xl text-[#e6c384] mb-4">Overview</h2>
            <p className="text-gray-400 text-base sm:text-lg">
              The Recovery Loop is a comprehensive platform designed to support individuals in their recovery journey. 
              It provides essential tools and resources for maintaining sobriety and mental well-being, creating a 
              supportive environment for those seeking to overcome addiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl text-[#e6c384] mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-400 text-base sm:text-lg space-y-2">
              <li>Daily check-ins and mood tracking</li>
              <li>Community support and connection</li>
              <li>Progress visualization and milestone tracking</li>
              <li>Resource library for recovery education</li>
              <li>Emergency support access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl text-[#e6c384] mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-400 text-base sm:text-lg space-y-2">
              <li>Next.js for the frontend framework</li>
              <li>Tailwind CSS for styling</li>
              <li>TypeScript for type-safe development</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 