// src/components/ProjectOverview.js
import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import { PrevArrowIcon, NextArrowIcon } from './uiElements';

const ProjectOverview = ({ projects, currentProjectIndex, onNext, onPrev }) => {
  const project = projects[currentProjectIndex];

  if (!project) {
    return <div>No projects to display.</div>;
  }

  const arrowButtonClass = "absolute z-20 p-2 rounded-full text-text-muted hover:text-text-base hover:bg-bg-muted/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all opacity-40 hover:opacity-100 top-1/2 -translate-y-1/2";

  return (
    <div className="w-full flex items-center justify-center relative">
        <button onClick={onPrev} className={`${arrowButtonClass} left-0 md:-left-12 lg:-left-20`}>
            <PrevArrowIcon />
        </button>
        <ProjectCard project={project} />
        <button onClick={onNext} className={`${arrowButtonClass} right-0 md:-right-12 lg:-right-20`}>
            <NextArrowIcon />
        </button>
    </div>
  );
};

ProjectOverview.propTypes = {
  projects: PropTypes.array.isRequired,
  currentProjectIndex: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default ProjectOverview;