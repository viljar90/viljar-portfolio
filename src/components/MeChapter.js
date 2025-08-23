// src/components/MeChapter.js

import React from 'react';
import { ME_CONTENT } from '../content';
import ContactCard from './ContactCard'; // Import the new component

const MeChapter = ({ darkMode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-4xl xl:max-w-6xl w-full flex flex-col-reverse md:flex-row md:flex-wrap items-center md:items-start md:space-x-12 xl:space-x-16">
        
        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 xl:w-3/5 text-left pr-0 md:pr-6">
          <div className="text-lg text-text-base mt-8 md:mt-0">
            {/* Shows all paragraphs on small screens */}
            <div className="md:hidden space-y-4">
              {ME_CONTENT.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
            {/* Shows first two paragraphs ONLY on medium screens */}
            <div className="hidden md:block lg:hidden space-y-4">
              {ME_CONTENT.paragraphs.slice(0, 2).map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
            {/* Shows all paragraphs on large screens and up */}
            <div className="hidden lg:block space-y-4">
              {ME_CONTENT.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Card */}
        <div className="w-full md:w-1/2 xl:w-2/5 mt-8 md:mt-0 flex justify-center">
          <div className="lg:scale-110 transition-transform duration-300">
            <ContactCard
              name={ME_CONTENT.name}
              imageUrl={ME_CONTENT.imageUrl}
              pixarUrl={ME_CONTENT.pixarUrl}
              email={ME_CONTENT.email}
              phone={ME_CONTENT.phone}
              linkedinUrl={ME_CONTENT.linkedinUrl}
            />
          </div>
        </div>

        {/* Additional paragraphs for medium screens ONLY, appearing below */}
        <div className="w-full text-left mt-8 hidden md:block lg:hidden">
             <div className="space-y-4 text-lg text-text-base">
                {ME_CONTENT.paragraphs.slice(2).map((p, index) => (
                    <p key={index + 2}>{p}</p>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default MeChapter;