// src/components/BackButton.js
import React from 'react';
import { PrevArrowIcon } from './uiElements';

const BackButton = ({ href }) => {
  const handleClick = (e) => {
    // Prevent the default link behavior that causes a full page reload.
    e.preventDefault();
    // Navigate to the correct hash within the single-page application.
    window.location.href = href;
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label="Go back to previous page"
      className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md"
    >
      <PrevArrowIcon className="w-7 h-7" />
    </a>
  );
};

export default BackButton;