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

  const allExperiences = [...research, ...internships, ...teaching];

  const getEndLabel = (date: string) => {
    const parts = date.split('–').map((part) => part.trim());
    if (parts.length === 2) {
      return parts[1];
    }
    return date.trim();
  };

  const parseEndValue = (date: string) => {
    const endLabel = getEndLabel(date);
    if (endLabel.toLowerCase() === 'present') {
      return Number.POSITIVE_INFINITY;
    }
    const [month, year] = endLabel.split(' ');
    const monthOrder: Record<string, number> = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    const monthValue = monthOrder[month] ?? 0;
    const yearValue = Number(year) || 0;
    return yearValue * 12 + monthValue;
  };

  const sortedExperiences = allExperiences
    .map((item) => ({
      ...item,
      endLabel: getEndLabel(item.date),
      endValue: parseEndValue(item.date),
    }))
    .sort((a, b) => b.endValue - a.endValue);

  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">Experience</h1>

        <div className="border-t border-[#2a2a2a] pt-8">
          <div className="space-y-2">
            {sortedExperiences.map((item) => (
              <div key={item.id} id={item.id} className="flex justify-between items-center scroll-mt-20">
                <Link href={`/experience/${item.slug}`} className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm">
                  {item.id === 'teaching-1' ? 'INF 115' : item.organization}
                </Link>
                <span className="text-[#969696] text-sm">{item.endLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

