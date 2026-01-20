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

export default function ZotHacksPage() {
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
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">ZotWee</h1>
        <p className="text-[#969696] text-base mb-8">ZotHacks 2023</p>

        <div className="border-t border-[#2a2a2a] pt-8">
          <div className="space-y-6 text-[#c8c8c8] text-base leading-relaxed">
            <p>
              ZotWee started from a very simple and very real problem. During an ICS 31
              lecture in PCB, I suddenly needed to find a bathroom but had no idea where
              the nearest one was. After talking with friends, I realized this was a
              common issue, especially for new students who are not yet familiar with
              campus. That moment led to the idea for ZotWee.
            </p>
            <p>
              ZotWee is a web application that helps students quickly find nearby
              gender-neutral bathrooms on campus. The app shows the user’s current
              location on a map and highlights all known gender-neutral restrooms with
              interactive markers. When a user clicks a button, ZotWee finds the closest
              bathroom and displays the most efficient walking route to get there. Each
              bathroom marker also includes additional details such as the exact room
              location and whether the restroom is ADA-compliant.
            </p>
            <p>
              We built ZotWee by first collecting and organizing campus restroom data
              into a JavaScript dataset. Using the Google Maps API and Google Directions
              API, we handled location tracking, map rendering, and walking route
              calculations. We added custom markers and pop-ups using HTML to clearly
              display bathroom information directly on the map. One of our biggest
              technical challenges was routing. We initially used Leaflet with satellite
              maps, but after many hours of work we discovered it did not support
              pedestrian paths. With limited time left, we switched to Google Maps and
              rewrote our routing logic to match the new API.
            </p>
            <p>
              Despite losing team members before the hackathon even began, I am most
              proud of how quickly we adapted and delivered a working product. ZotWee
              was my first real experience with front-end development and API
              integration, and it taught me how to debug unfamiliar systems and stay
              calm under time pressure. In the future, I would like to add user
              accounts, allow bathroom ratings, and expand the amount of information
              available for each restroom to make ZotWee even more helpful for the
              campus community.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-[#c8c8c8] text-lg mb-4 font-normal">Product Screens</h2>
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
            <p className="text-[#969696] text-xs mt-3 text-center">
              Use the arrows or dots to browse the screens.
            </p>
          </div>

          <div className="mt-10">
            <a
              href="https://zot-wee.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#c8c8c8] text-sm hover:opacity-80 transition-opacity"
            >
              Visit ZotWee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
