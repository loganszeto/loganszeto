'use client';

import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [cursorLine1, setCursorLine1] = useState(true);
  const [cursorLine2, setCursorLine2] = useState(false);
  const [cursorLine3, setCursorLine3] = useState(false);

  useEffect(() => {
    // Calculate delays based on text length and typing speed (50ms per character)
    const line1Text = 'Irvine, CA';
    const line2Text = 'Student at UCI studying software engineering with a focus';
    const line3Text = 'in data and AI alignment. Strength Training Enthusiast.';
    
    const line1Time = line1Text.length * 50;
    const line2Time = line2Text.length * 50;
    
    // Start line 2 immediately after line 1 finishes
    const t1 = setTimeout(() => {
      setCursorLine1(false);
      setShowLine2(true);
      setCursorLine2(true);
    }, line1Time);

    // Start line 3 immediately after line 2 finishes
    const t2 = setTimeout(() => {
      setCursorLine2(false);
      setShowLine3(true);
      setCursorLine3(true);
    }, line1Time + line2Time);

    // Hide final cursor after line 3 finishes
    const t3 = setTimeout(() => {
      setCursorLine3(false);
    }, line1Time + line2Time + line3Text.length * 50);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen pl-26 pt-10">
      <div className="h-[300px]"> {/* Fixed height container for intro content */}
        <h1 className="text-[#e6c384] text-5xl mb-6">Logan Szeto</h1>

        {/* Line 1 */}
        <div className="text-gray-400 text-lg mb-1">
          <Typewriter
            words={['Irvine, CA']}
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={0}
            loop={1}
            cursor={cursorLine1}
            cursorStyle="_"
          />
        </div>

        {/* Line 2 */}
        {showLine2 && (
          <div className="text-gray-400 text-lg mb-1">
            <Typewriter
              words={['Student at UCI studying software engineering with a']}
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={0}
              loop={1}
              cursor={cursorLine2}
              cursorStyle="_"
            />
          </div>
        )}

        {/* Line 3 */}
        {showLine3 && (
          <div className="text-gray-400 text-lg mb-4">
            <Typewriter
              words={['focus in data and AI alignment. Strength Training Enthusiast.']}
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={0}
              loop={1}
              cursor={cursorLine3}
              cursorStyle="_"
            />
          </div>
        )}

      </div>

      {/* Posts + Data Section */}
      <div className="mt-10">
        <h1 className="text-[#e6c384] text-3xl mb-6">posts</h1>
        <div className="text-gray-400 text-lg mb-4">. . .</div>
        <div className="text-gray-400 text-lg mb-4">. . .</div>
        <h1 className="text-[#e6c384] mt-2 text-3xl mb-6">data</h1>
        <div className="text-gray-400 text-lg mb-4">. . .</div>
        <div className="text-gray-400 text-lg mb-4">. . .</div>
      </div>
    </div>
  );
}
