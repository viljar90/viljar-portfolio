// src/components/GenericProjectPage.js

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import ProjectBottomNav from './ProjectBottomNav';
import { PrevArrowIcon, NextArrowIcon } from './uiElements';

const GenericProjectPage = ({ project, darkMode, initialSection }) => {
  const [activeSection, setActiveSection] = useState('problem');

  useEffect(() => {
    const sections = [
      { id: 'problem', title: 'The Problem' },
      { id: 'role', title: 'My Role' },
      { id: 'solution', title: 'The Solution' },
      { id: 'impact', title: 'Impact' },
      { id: 'reflections', title: 'Reflections' },
    ];
    const isValidSection = sections.some(s => s.id === initialSection);
    setActiveSection(isValidSection ? initialSection : 'problem');
  }, [initialSection]);

  useEffect(() => {
    const hashParts = window.location.hash.split('?');
    const params = new URLSearchParams(hashParts[1]);
    const fromQuery = params.get('from');
    const stateQuery = params.get('state');

    let newHash = `#work/project/${project.id}/${activeSection}`;
    if (fromQuery) {
      newHash += `?from=${fromQuery}`;
      if (stateQuery) {
        newHash += `&state=${stateQuery}`;
      }
    }

    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [activeSection, project.id]);

  const sections = useMemo(() => [
    { id: 'problem', title: 'The Problem' },
    { id: 'role', title: 'My Role' },
    { id: 'solution', title: 'The Solution' },
    { id: 'impact', title: 'Impact' },
    { id: 'reflections', title: 'Reflections' },
  ], []);

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
  if (!activeSectionData) {
    return null; 
  }
  const content = project.details[activeSection];
  const { isWIP } = project;

  return (
    // The main container is now just for positioning and background.
    <div className="project-page-container w-full h-screen relative">
      
      {isWIP && (
        <div className="absolute top-40 right-4 sm:right-8 md:right-16 lg:right-24 -translate-y-1/2 z-20 pointer-events-none">
          <span className="inline-block text-white bg-bg-element dark:text-black text-4xl font-bold px-6 py-3 rounded transform -rotate-11">
            Under Construction
          </span>
        </div>
      )}

      {/*
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
      */}

      {/* --- THIS IS THE FIX --- */}
      {/* A new, dedicated container for all scrollable content. */}
      {/* It scrolls independently, leaving the nav and banner unaffected. */}
      <div className="w-full h-full overflow-y-auto">
        <div 
          key={activeSection}
          // The responsive top padding is applied here to create the initial space.
          className="content-area w-full max-w-4xl mx-auto text-left px-4 sm:px-8 md:px-16 lg:px-24 pt-[40vh] pb-32 animate-fadeIn"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary dark:text-secondary mb-6">
            {activeSectionData.title}
          </h2>
          <div className="text-lg sm:text-xl text-text-muted dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
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