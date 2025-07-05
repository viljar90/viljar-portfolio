// src/components/uiElements.js

import React, { useState, useEffect } from 'react';

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

// --- Animated Border Button ---
export const AnimatedBorderButton = ({ isPlaying, ...props }) => {
  return (
    <button {...props} className={`relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-800 rounded-full transform hover:scale-105 active:scale-95 transition-all duration-200 ${props.className || ''}`}>
      <div
        className={`absolute -inset-px bg-[conic-gradient(from_var(--rotate),#5ddcff,#3c67e3,#f059eb)] rounded-full transition-opacity duration-300 animate-spin ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <div className={`relative z-10 w-full h-full flex items-center justify-center bg-black dark:bg-black rounded-full text-white dark:text-white ${!isPlaying ? 'ring-1 ring-gray-500 dark:ring-gray-700' : ''}`}>
  {isPlaying ? (
    <div key="pause" className="animate-scale-in">
      <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105" />
    </div>
  ) : (
    <div key="play" className="animate-scale-in">
      <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105" />
    </div>
  )}
</div>
    </button>
  );
};


// --- InteractiveOblongNavItem Component ---
export const InteractiveOblongNavItem = React.forwardRef(({ text, onClick, className = '', isActive = false, isPlaying = false, isFadingOut = false, isDarkMode = false, onFadeOutEnd }, ref) => {
    const [isClicked, setIsClicked] = useState(false);
    const baseClasses = 'flex-none font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-full cursor-pointer focus:outline-none transition-all duration-200 ease-in-out whitespace-nowrap';
    const focusRingClasses = `focus-visible:ring-2 focus-visible:ring-opacity-75 ${isDarkMode ? 'focus-visible:ring-gray-500' : 'focus-visible:ring-gray-400'}`;

    useEffect(() => {
        if (!isClicked) return;
        const timer = setTimeout(() => setIsClicked(false), 400); // Reset after animation
        return () => clearTimeout(timer);
    }, [isClicked]);

    const handleItemClick = () => {
        setIsClicked(true);
        if (onClick) {
            onClick();
        }
    };
    
    if (isActive) {
        let animationClass = '';
        if (isFadingOut) {
            animationClass = 'animate-fade-out';
        } else if (isPlaying) {
            animationClass = 'animate-gradient-border';
        }

        const handleAnimationEnd = () => {
          if (isFadingOut && onFadeOutEnd) {
            onFadeOutEnd();
          }
        };

        return (
            <button
              ref={ref}
              onClick={handleItemClick}
              className={`${baseClasses} relative group overflow-hidden bg-black text-white shadow-lg scale-105 ${!isPlaying ? 'ring-1 ring-gray-500 dark:ring-gray-700' : ''} ${className}`}
              onAnimationEnd={handleAnimationEnd}
            >
                <div
                    className={`absolute -top-[150%] -left-[150%] w-[400%] h-[400%] bg-[conic-gradient(from_var(--angle),transparent_var(--fill-percentage),var(--border-color)_100%)] ${animationClass}`}
                    style={{ zIndex: 1 }}
                />
                <div className="absolute z-[2] inset-[1.25px] bg-black rounded-full" />
                <span className={`relative z-[3] inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>{text}</span>
            </button>
        );
    }

    const inactiveClasses = `bg-transparent text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white shadow-none hover:shadow-sm ${focusRingClasses}`;    
    return (
        <button ref={ref} onClick={handleItemClick} className={`${baseClasses} ${inactiveClasses} ${className}`}>
            <span className={`inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>{text}</span>
        </button>
    );
});
InteractiveOblongNavItem.displayName = 'InteractiveOblongNavItem';

// SegmentedControl remains the same
export const SegmentedControl = ({ options, activeOption, onOptionClick, isDarkMode }) => {
    return (
        <div className={`flex items-center bg-slate-900 dark:bg-slate-950 p-1 rounded-full shadow-lg border border-gray-500 dark:border-gray-700 transform transition-transform duration-200 hover:scale-105`}>
            {options.map((option) => {
                const isActive = activeOption === option;
                // These classes now correctly handle both dark and light modes for all states.
                const activeClasses = `bg-black dark:bg-black text-white dark:text-white ring-1 ring-gray-500 dark:ring-gray-700`;
                const inactiveClasses = `text-gray-500 dark:text-gray-300 hover:text-white dark:hover:text-white`;

                return (
                    <button
                        key={option}
                        onClick={() => onOptionClick(option)}
                        className={`font-semibold text-sm sm:text-base py-1.5 px-5 first:rounded-l-full last:rounded-r-full transition-all duration-300 ease-in-out whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-gray-400 ${
                            isActive ? activeClasses : inactiveClasses
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