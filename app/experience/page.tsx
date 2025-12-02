'use client';

import { useEffect } from 'react';
import { research, internships, teaching } from '@/lib/experienceData';

export default function Experience() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-12">Experience</h1>
        
        {/* Research Section */}
        <div className="mb-16">
          <h2 className="text-[#e6c384] text-2xl sm:text-3xl mb-8">Research</h2>
          <div className="space-y-8">
            {research.map((item, index) => (
              <div key={index} id={item.id} className="border-l-2 border-[#363646] pl-6 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="text-[#e6c384] text-xl mb-1">{item.title}</h3>
                    <p className="text-[#7c7c7c] text-sm">{item.organization}</p>
                    <p className="text-[#7c7c7c] text-sm">{item.location}</p>
                  </div>
                  <span className="text-[#7c7c7c] text-sm mt-2 sm:mt-0">{item.date}</span>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internships Section */}
        <div className="mb-16">
          <h2 className="text-[#e6c384] text-2xl sm:text-3xl mb-8">Internships</h2>
          <div className="space-y-8">
            {internships.map((item, index) => (
              <div key={index} id={item.id} className="border-l-2 border-[#363646] pl-6 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="text-[#e6c384] text-xl mb-1">{item.title}</h3>
                    <p className="text-[#7c7c7c] text-sm">{item.organization}</p>
                    <p className="text-[#7c7c7c] text-sm">{item.location}</p>
                  </div>
                  <span className="text-[#7c7c7c] text-sm mt-2 sm:mt-0">{item.date}</span>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Section */}
        <div className="mb-16">
          <h2 className="text-[#e6c384] text-2xl sm:text-3xl mb-8">Teaching</h2>
          <div className="space-y-8">
            {teaching.map((item, index) => (
              <div key={index} id={item.id} className="border-l-2 border-[#363646] pl-6 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="text-[#e6c384] text-xl mb-1">{item.title}</h3>
                    <p className="text-[#7c7c7c] text-sm">{item.organization}</p>
                    <p className="text-[#7c7c7c] text-sm">{item.location}</p>
                  </div>
                  <span className="text-[#7c7c7c] text-sm mt-2 sm:mt-0">{item.date}</span>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

