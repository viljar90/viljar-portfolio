// src/components/ProjectOverview.js
import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

const ProjectOverview = ({ projects, currentProjectIndex, onNext, onPrev }) => {
  const project = projects[currentProjectIndex];

  if (!project) {
    return <div>No projects to display.</div>;
  }

  return (
    <div className="w-full flex items-center justify-center relative">
        <ProjectCard project={project} />
    </div>
  );
};

ProjectOverview.propTypes = {
  projects: PropTypes.array.isRequired,
  currentProjectIndex: PropTypes.number.isRequired,
};

export default ProjectOverview;