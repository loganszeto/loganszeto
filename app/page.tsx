import Link from 'next/link';
import { research, internships, teaching } from '@/lib/experienceData';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="h-[200px]">
          <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">Logan Szeto</h1>

          <div className="text-gray-400 text-base sm:text-lg mb-1">
            Irvine, CA
          </div>

          <div className="text-gray-400 text-base sm:text-lg mb-1">
            Undergraduate @ UCI studying software engineering with a focus
          </div>

          <div className="text-gray-400 text-base sm:text-lg mb-4">
            in data and AI alignment.
          </div>
        </div>

        {/* Research Section */}
        <div className="mt-8 mb-6">
          <h2 className="text-[#e6c384] text-lg sm:text-xl mb-3">Research</h2>
          <div className="space-y-2">
            {research.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <Link 
                  href={`/experience#${item.id}`}
                  className="text-gray-400 hover:text-[#e6c384] transition-colors text-sm sm:text-base"
                >
                  {item.organization}
                </Link>
                <span className="text-[#7c7c7c] text-xs sm:text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Internships Section */}
        <div className="mb-6">
          <h2 className="text-[#e6c384] text-lg sm:text-xl mb-3">Internships</h2>
          <div className="space-y-2">
            {internships.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <Link 
                  href={`/experience#${item.id}`}
                  className="text-gray-400 hover:text-[#e6c384] transition-colors text-sm sm:text-base"
                >
                  {item.organization}
                </Link>
                <span className="text-[#7c7c7c] text-xs sm:text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Section */}
        <div className="mb-6">
          <h2 className="text-[#e6c384] text-lg sm:text-xl mb-3">Teaching</h2>
          <div className="space-y-2">
            {teaching.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <Link 
                  href={`/experience#${item.id}`}
                  className="text-gray-400 hover:text-[#e6c384] transition-colors text-sm sm:text-base"
                >
                  {item.organization}
                </Link>
                <span className="text-[#7c7c7c] text-xs sm:text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
