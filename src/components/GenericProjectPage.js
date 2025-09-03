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
    <div className="project-page-container w-full min-h-screen flex flex-col items-center justify-center px-24 md:px-32 lg:px-40 xl:px-64 py-8 sm:py-16 relative">
      
      {isWIP && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <span className="inline-block text-white bg-bg-element dark:text-black text-4xl font-bold px-6 py-3 rounded transform -rotate-11">
            Under Construction
          </span>
        </div>
      )}

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