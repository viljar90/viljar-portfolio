// src/components/uiElements.js

import React from 'react';

// --- SVG Icons ---
export const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);

export const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" />
  </svg>
);

export const ReplayIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
    </svg>
);

export const PrevArrowIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export const NextArrowIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// --- Blinking Cursor Component ---
export const BlinkingCursor = ({sizeClass = "h-6 md:h-8 lg:h-10"}) => (
  <span
    className={`inline-block w-1 ml-1 bg-slate-100 dark:bg-slate-300 align-bottom ${sizeClass}`}
    style={{ animation: 'blinker 1s infinite' }}
  ></span>
);

// --- InteractiveOblongNavItem Component ---
export const InteractiveOblongNavItem = React.forwardRef(({ text, onClick, className = '', colorScheme = 'black', isActive = false, isDarkMode = false }, ref) => {
  const colorSchemes = {
    black: { focusRing: 'focus:ring-gray-600' },
    blue: { focusRing: 'focus:ring-sky-500' }
  };
  const currentSchemeConfig = colorSchemes[colorScheme] || colorSchemes.blue;
  const inactiveTextColor = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const inactiveHoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300';
  const inactiveFocusRing = isDarkMode ? 'focus:ring-gray-500' : 'focus:ring-gray-400';

  if (isActive) {
    return (
      <button ref={ref} onClick={onClick}
        className={`bg-black text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-full cursor-pointer focus:outline-none focus:ring-2 ${currentSchemeConfig.focusRing} focus:ring-opacity-75 transition-all duration-200 ease-in-out scale-105 shadow-lg whitespace-nowrap ${className}`}
        aria-label={`Maps to ${text}, currently active`}
      >{text}</button>
    );
  }
  return (
    <button ref={ref} onClick={onClick}
      className={`bg-transparent ${inactiveHoverBg} ${inactiveTextColor} font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-full cursor-pointer focus:outline-none focus:ring-2 ${inactiveFocusRing} focus:ring-opacity-75 transition-all duration-200 ease-in-out whitespace-nowrap shadow-none hover:shadow-sm ${className}`}
      aria-label={`Maps to ${text}`}
    >{text}</button>
  );
});
InteractiveOblongNavItem.displayName = 'InteractiveOblongNavItem';