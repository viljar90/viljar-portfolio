// src/components/GenericProjectPage.js

import React, { useState, useCallback, useMemo } from 'react'; // 1. Import useMemo
import ProjectBottomNav from './ProjectBottomNav';
import { PrevArrowIcon, NextArrowIcon } from './uiElements';

const GenericProjectPage = ({ project, darkMode }) => {
  const [activeSection, setActiveSection] = useState('problem');

  // 2. Wrap the sections array in a useMemo hook
  const sections = useMemo(() => [
    { id: 'problem', title: 'Problem' },
    { id: 'role', title: 'My Role' },
    { id: 'solution', title: 'Solution' },
    { id: 'impact', title: 'Impact' },
    { id: 'reflections', title: 'Reflections' },
  ], []); // The empty dependency array [] means it will only be created once.

  const handleNextSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex].id);
  }, [activeSection, sections]);

  const handlePrevSection = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    setActiveSection(sections[prevIndex].id);
  }, [activeSection, sections]);


  const activeSectionData = sections.find(s => s.id === activeSection);
  const content = project.details[activeSection];

  return (
    <div className="project-page-container w-full min-h-screen flex flex-col items-center justify-center px-24 md:px-40 lg:px-56 py-8 sm:py-16 relative">
      
      <button
        onClick={handlePrevSection}
        className="fixed z-20 p-2 rounded-full text-text-muted hover:text-text-base hover:bg-bg-muted/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all opacity-40 hover:opacity-100 left-4 md:left-12 lg:left-20 xl:left-48 top-1/2 -translate-y-1/2"
        aria-label="Previous Section"
      >
        <PrevArrowIcon />
      </button>
      <button
        onClick={handleNextSection}
        className="fixed z-20 p-2 rounded-full text-text-muted hover:text-text-base hover:bg-bg-muted/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all opacity-40 hover:opacity-100 right-4 md:right-12 lg:right-20 xl:right-48 top-1/2 -translate-y-1/2"
        aria-label="Next Section"
      >
        <NextArrowIcon />
      </button>

      <div 
        key={activeSection}
          className="content-area w-full max-w-3xl flex-grow flex flex-col justify-center text-left mb-24 animate-fadeIn"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-primary dark:text-secondary mb-6">
          {activeSectionData.title}
        </h2>
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