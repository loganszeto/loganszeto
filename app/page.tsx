'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const portraits = [
    {
      src: '/placeholders/travel-1.png',
      location: 'Bainbridge Island, Washington',
    },
    {
      src: '/placeholders/travel-2.png',
      location: 'Carlsbad Flower Field, California',
    },
    {
      src: '/placeholders/travel-3.png',
      location: 'Gum Wall, Seattle',
    },
    {
      src: '/placeholders/travel-4.png',
      location: 'Huntington Library, California',
    },
    {
      src: '/placeholders/travel-5.png',
      location: 'Sacramento, California',
    },
    {
      src: '/placeholders/travel-6.png',
      location: 'Shibuya, Japan',
    },
  ];

  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => {
    setPortraitIndex(Math.floor(Math.random() * portraits.length));
  }, [portraits.length]);

  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 py-24 justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div className="w-full md:w-[240px]">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
              <img
                src={portraits[portraitIndex].src}
                alt={portraits[portraitIndex].location}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 text-[#969696] text-xs text-center">
              {portraits[portraitIndex].location}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">Logan Szeto</h1>
            <p className="text-[#969696] text-base leading-relaxed max-w-xl">
              I’m a Software Engineering student at UC Irvine who likes building practical tools
              that help people understand what their software and AI systems are actually doing.
              Most of my work revolves around turning complex data and model outputs into something
              measurable, transparent, and easy to trust. Outside of school and projects, I enjoy
              traveling and staying active by playing pickleball.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
