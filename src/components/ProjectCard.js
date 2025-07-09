// src/components/ProjectCard.js
import React from 'react';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full max-w-lg bg-bg-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden hover:scale-105">
      <div className="flex flex-col md:flex-row">
        {/* Icon Section */}
        <div className="flex-shrink-0 p-6 bg-bg-muted flex items-center justify-center md:w-24">
          {project.icon}
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex flex-col justify-center flex-1 text-left">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-text-muted bg-bg-muted px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-text-base mb-1">
              {project.title}
            </h2>
            
            {/* Description */}
            <p className="text-text-muted text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node.isRequired,
  }).isRequired,
};

export default ProjectCard;