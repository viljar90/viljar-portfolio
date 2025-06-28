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
  
  export const SkipIcon = ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18l8.5-6L4 6v12zM13 6v12l8.5-6L13 6z"/>
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

// --- NEW Animated Border Button ---
export const AnimatedBorderButton = ({ isPlaying, ...props }) => {
  return (
    <button {...props} className={`relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-800 rounded-full ${props.className || ''}`}>
      {/* Animated gradient border. It's hidden when not playing */}
      <div
        className={`absolute -inset-0.5 bg-[conic-gradient(from_var(--rotate),#5ddcff,#3c67e3,#f059eb)] rounded-full transition-opacity duration-300 animate-spin ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      {/* Inner button face - this has the solid background and holds the icon */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-black dark:text-slate-200">
        {isPlaying ? <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
      </div>
    </button>
  );
};


// --- InteractiveOblongNavItem Component ---
export const InteractiveOblongNavItem = React.forwardRef(({ text, onClick, className = '', colorScheme = 'black', isActive = false, isDarkMode = false }, ref) => {
  const colorSchemes = {
    black: { focusRing: 'focus-visible:ring-gray-600' },
    blue: { focusRing: 'focus-visible:ring-sky-500' }
  };
  const currentSchemeConfig = colorSchemes[colorScheme] || colorSchemes.blue;
  const inactiveTextColor = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const inactiveHoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300';
  const inactiveFocusRing = isDarkMode ? 'focus-visible:ring-gray-500' : 'focus-visible:ring-gray-400';

  if (isActive) {
    return (
      <button ref={ref} onClick={onClick}
        className={`bg-black text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 ${currentSchemeConfig.focusRing} focus-visible:ring-opacity-75 transition-all duration-200 ease-in-out scale-105 shadow-lg whitespace-nowrap ${className}`}
        aria-label={`Maps to ${text}, currently active`}
      >{text}</button>
    );
  }
  return (
    <button ref={ref} onClick={onClick}
      className={`bg-transparent ${inactiveHoverBg} ${inactiveTextColor} font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 ${inactiveFocusRing} focus-visible:ring-opacity-75 transition-all duration-200 ease-in-out whitespace-nowrap shadow-none hover:shadow-sm ${className}`}
      aria-label={`Maps to ${text}`}
    >{text}</button>
  );
});
InteractiveOblongNavItem.displayName = 'InteractiveOblongNavItem';

// *** MODIFIED: SegmentedControl component with updated focus ring styling ***
export const SegmentedControl = ({ options, activeOption, onOptionClick, isDarkMode }) => {
    return (
        // The container creates the outer shape and holds the buttons together
        <div className={`flex items-center bg-gray-50 dark:bg-slate-800 p-1 rounded-full shadow-lg border border-gray-300 dark:border-gray-700`}>
            {options.map((option, index) => {
                const isActive = activeOption === option;
                
                // Determine the rounding for each button based on its position
                let roundingClass = '';
                if (index === 0) {
                    roundingClass = 'rounded-l-full'; // Left side is rounded
                } else if (index === options.length - 1) {
                    roundingClass = 'rounded-r-full'; // Right side is rounded
                }
                // Any middle buttons would have no rounding, creating flat edges

                // Define the focus ring color to match the bottom navigation
                const focusRingClass = isDarkMode ? 'focus-visible:ring-gray-500' : 'focus-visible:ring-gray-400';

                return (
                    <button
                        key={option}
                        onClick={() => onOptionClick(option)}
                        // The button classes now use the conditional rounding and new focus color
                        className={`font-semibold text-sm sm:text-base py-1.5 px-5 transition-all duration-300 ease-in-out whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 ${focusRingClass} ${roundingClass} ${
                            isActive
                                ? 'bg-black text-white dark:bg-slate-600'
                                : `text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700`
                        }`}
                        aria-label={`Select ${option} view`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};