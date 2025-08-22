// src/components/MeChapter.js

import React, { useState, useEffect } from 'react';
import { ME_CONTENT } from '../content';
import ProfilePicture from '../assets/profile.png';
import PixarProfilePicture from '../assets/pixar-profile.png';

const MeChapter = ({ darkMode }) => {
  const [showPixar, setShowPixar] = useState(false);

  // This effect will run on a timer to switch the image
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPixar(prevShowPixar => !prevShowPixar);
    }, 3000); // Switch every 3 seconds

    // This is a cleanup function that stops the timer when you navigate away
    return () => clearInterval(interval);
  }, []); // The empty array ensures this effect runs only once

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-2xl">
        {/* Container for the two images */}
        <div className="relative w-32 h-32 rounded-full mx-auto mb-8">
          <img
            src={ProfilePicture}
            alt="Viljar Tornøe"
            className={`w-full h-full rounded-full border-4 border-primary dark:border-secondary shadow-lg object-cover transition-opacity duration-1000 ease-in-out absolute top-0 left-0 ${showPixar ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src={PixarProfilePicture}
            alt="Viljar Tornøe - Pixar Style"
            className={`w-full h-full rounded-full border-4 border-primary dark:border-secondary shadow-lg object-cover transition-opacity duration-1000 ease-in-out absolute top-0 left-0 ${showPixar ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-secondary mb-6">
          {ME_CONTENT.title}
        </h1>
        <div className="text-left space-y-4 text-lg text-text-base">
          {ME_CONTENT.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeChapter;