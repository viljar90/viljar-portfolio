// src/components/GenericProjectPage.js

import React, { useState } from 'react';
import ProjectBottomNav from './ProjectBottomNav'; // The new nav component

const GenericProjectPage = ({ project, darkMode }) => {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState('problem');

  const sections = [
    { id: 'problem', title: 'The Problem' },
    { id: 'role', title: 'My Role' },
    { id: 'solution', title: 'The Solution' },
    { id: 'impact', title: 'Impact' },
    { id: 'reflections', title: 'Reflections' },
  ];

  const activeSectionData = sections.find(s => s.id === activeSection);
  const content = project.details[activeSection];

  return (
    <div className="project-page-container w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      
      {/* Content Area with max-width, padding, and animation */}
      <div 
        key={activeSection} // Add key here to re-trigger animation on change
        className="content-area w-full max-w-4xl flex-grow flex flex-col justify-center text-left mb-24 animate-fadeIn"
      >
        
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary dark:text-secondary mb-6">
          {activeSectionData.title}
        </h2>
        
        {/* Section Content */}
        <p className="text-lg sm:text-xl text-text-muted dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {content}
        </p>

      </div>

      <ProjectBottomNav
        sections={sections}
        activeSection={activeSection}
        onNavItemClick={setActiveSection}
        isDarkMode={darkMode}
      />
    </div>
  );
};

export default GenericProjectPage;