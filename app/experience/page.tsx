'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">Experience</h1>

        <div className="border-t border-[#2a2a2a] pt-8">
          {/* Research Section */}
          <div className="mb-10">
            <h2 className="text-[#c8c8c8] text-xl mb-4 font-normal">Research</h2>
            <div className="space-y-1">
              {research.map((item) => (
                <div key={item.id} id={item.id} className="flex justify-between items-center scroll-mt-20">
                  <Link href={`/experience/${item.slug}`} className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm">
                    {item.organization}
                  </Link>
                  <span className="text-[#969696] text-sm">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Internships Section */}
          <div className="mb-10">
            <h2 className="text-[#c8c8c8] text-xl mb-4 font-normal">Internships</h2>
            <div className="space-y-1">
              {internships.map((item) => (
                <div key={item.id} id={item.id} className="flex justify-between items-center scroll-mt-20">
                  <Link href={`/experience/${item.slug}`} className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm">
                    {item.organization}
                  </Link>
                  <span className="text-[#969696] text-sm">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Section */}
          <div className="mb-10">
            <h2 className="text-[#c8c8c8] text-xl mb-4 font-normal">Teaching</h2>
            <div className="space-y-1">
              {teaching.map((item) => (
                <div key={item.id} id={item.id} className="flex justify-between items-center scroll-mt-20">
                  <Link href={`/experience/${item.slug}`} className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm">
                    {item.id === 'teaching-1' ? 'INF 115' : item.organization}
                  </Link>
                  <span className="text-[#969696] text-sm">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

