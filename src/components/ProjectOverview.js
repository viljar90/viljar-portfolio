// src/components/ProjectOverview.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

const ProjectOverview = ({
  projects,
  currentProjectIndex,
  previousProjectIndex,
  animationDirection,
  setPreviousProjectIndex,
}) => {
  const currentProject = projects[currentProjectIndex];
  const previousProject =
    previousProjectIndex !== null ? projects[previousProjectIndex] : null;

  useEffect(() => {
    if (previousProjectIndex !== null) {
      const timer = setTimeout(() => {
        setPreviousProjectIndex(null);
      }, 400); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [previousProjectIndex, setPreviousProjectIndex]);

  if (!currentProject) {
    return <div>No projects to display.</div>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Current Card */}
      <div
        key={currentProject.id}
        className={`w-full h-full absolute inset-0 flex items-center justify-center ${
          previousProject
            ? animationDirection === 'next'
              ? 'animate-slide-in-right'
              : 'animate-slide-in-left'
            : ''
        }`}
      >
        <ProjectCard project={currentProject} />
      </div>

      {/* Previous Card (for animation) */}
      {previousProject && (
        <div
          key={previousProject.id}
          className={`w-full h-full absolute inset-0 flex items-center justify-center ${
            animationDirection === 'next'
              ? 'animate-slide-out-left'
              : 'animate-slide-out-right'
          }`}
        >
          <ProjectCard project={previousProject} />
        </div>
      )}
    </div>
  );
};

ProjectOverview.propTypes = {
  projects: PropTypes.array.isRequired,
  currentProjectIndex: PropTypes.number.isRequired,
  previousProjectIndex: PropTypes.number,
  animationDirection: PropTypes.string.isRequired,
  setPreviousProjectIndex: PropTypes.func.isRequired,
};

ProjectOverview.defaultProps = {
  previousProjectIndex: null,
};

export default ProjectOverview;