// src/components/ProjectCard.js
import React from 'react';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
  const cardContent = (
    <div className="w-full max-w-md md:max-w-lg xl:max-w-xl bg-bg-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden hover:scale-105 dark:border dark:border-gray-700">
      <div className="flex flex-col-reverse md:flex-row">
        {/* Icon Section */}
        <div className="flex-shrink-0 p-6 bg-bg-overlay flex items-center justify-center md:w-24">
          {project.icon}
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex flex-col justify-center flex-1 text-left">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs xl:text-sm font-medium text-text-muted bg-bg-overlay px-3 py-1 rounded-full dark:border dark:border-gray-700">{tag}</span>
              ))}
            </div>
            
            {/* Title */}
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-text-base mb-1">
              {project.cardTitle}
            </h2>
            
            {/* Description */}
            <p className="text-sm lg:text-base xl:text-lg text-text-muted leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // If the project has a URL, wrap the card in a link that opens a new tab.
  if (project.url) {
    return (
      // --- THIS IS THE FIX ---
      // The href is now constructed dynamically to include the specific project ID for the overview.
      <a href={`#work/project/${project.id}/problem?from=work/overview/${project.id}`} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  // Otherwise, just render the non-clickable card.
  return cardContent;
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensure id is part of the project object
    cardTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;