'use client';

import { useState } from 'react';

const images = [
  {
    src: "/zotwee/zotwee-hero.png",
    alt: "ZotWee landing screen",
  },
  {
    src: "/zotwee/zotwee-map.png",
    alt: "ZotWee campus restroom map",
  },
  {
    src: "/zotwee/zotwee-street.png",
    alt: "ZotWee navigation view",
  },
];

export default function ZotWeeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-2">
      <div className="relative">
        <div className="overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-auto"
          />
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#1a1a1a] text-[#c8c8c8] px-3 py-2 text-sm border border-[#2a2a2a] hover:opacity-80 transition-opacity"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#1a1a1a] text-[#c8c8c8] px-3 py-2 text-sm border border-[#2a2a2a] hover:opacity-80 transition-opacity"
          aria-label="Next image"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full transition-opacity ${
              index === currentIndex ? 'bg-[#c8c8c8]' : 'bg-[#4a4a4a]'
            }`}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
