// src/components/ProjectHeader.js
import React from 'react';
import InteractivePillNav from './InteractivePillNav';
import { PROJECTS } from '../content';
import { SunIcon, MoonIcon } from './uiElements';
import BackButton from './BackButton';

const ProjectHeader = ({ project, darkMode, toggleDarkMode }) => {
  const handleProjectSwitch = (selectedNavText) => {
    const project = PROJECTS.find(p => p.navText === selectedNavText);
    if (project) {
      // --- FIX: Now correctly navigates to the 'problem' section of the selected project ---
      window.location.hash = `work/project/${project.id}/problem`;
    }
  };

  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const from = params.get('from');
  const state = params.get('state');

  let backPath = '#';
  if (from) {
    backPath = `#${from}`;
    if (state) {
      backPath += `?state=${state}`;
    }
  }

  return (
    <div className="fixed top-4 left-0 right-0 w-full px-4 z-50 flex items-center h-12">
      <div className="flex-shrink-0">
        <BackButton href={backPath} />
      </div>
      
      <div className="w-4 sm:w-6 md:w-8 flex-shrink-0" />
      
      <div className="flex-1 min-w-0" />
      
      <div className="flex items-center space-x-4 min-w-0 max-w-full">
        <div className="min-w-0 max-w-full">
          {/* --- THIS IS THE FIX --- */}
          {/* The component now uses the 'auto' variant to fit its content, and the toggle is hidden. */}
          <InteractivePillNav
            menuItems={PROJECTS.map(p => p.navText)}
            selected={project.navText}
            setSelected={handleProjectSwitch}
            variant="auto"
            showToggle={false}
          />
        </div>
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md`}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span>{darkMode ? <SunIcon /> : <MoonIcon />}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;