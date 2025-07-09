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

  export const SunIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  export const MoonIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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

  export const PuzzleIcon = ({ className = "w-12 h-12 text-text-muted" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 4.5C7.5 3.11929 8.61929 2 10 2C11.3807 2 12.5 3.11929 12.5 4.5V6H13.5C14.8978 6 15.5967 6 16.1481 6.22836C16.8831 6.53284 17.4672 7.11687 17.7716 7.85195C18 8.40326 18 9.10218 18 10.5H19.5C20.8807 10.5 22 11.6193 22 13C22 14.3807 20.8807 15.5 19.5 15.5H18V17.2C18 18.8802 18 19.7202 17.673 20.362C17.3854 20.9265 16.9265 21.3854 16.362 21.673C15.7202 22 14.8802 22 13.2 22H12.5V20.25C12.5 19.0074 11.4926 18 10.25 18C9.00736 18 8 19.0074 8 20.25V22H6.8C5.11984 22 4.27976 22 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V15.5H3.5C4.88071 15.5 6 14.3807 6 13C6 11.6193 4.88071 10.5 3.5 10.5H2C2 9.10218 2 8.40326 2.22836 7.85195C2.53284 7.11687 3.11687 6.53284 3.85195 6.22836C4.40326 6 5.10218 6 6.5 6H7.5V4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ChartIcon = ({ className = "w-12 h-12 text-text-muted" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 14.5V17.5M11.5 11.5V17.5M16 8.5V17.5M20.5 5.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
);

 
// --- Blinking Cursor Component ---
export const BlinkingCursor = ({sizeClass = "h-6 md:h-8 lg:h-10"}) => (
  <span
    className={`inline-block w-1 ml-1 bg-text-base align-bottom ${sizeClass}`}
    style={{ animation: 'blinker 1s infinite' }}
  ></span>
);

// --- Animated Border Button ---
export const AnimatedBorderButton = ({ isPlaying, ...props }) => {
  return (
    <button {...props} className={`relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary dark:focus-visible:ring-offset-bg-base rounded-full transform hover:scale-105 active:scale-95 transition-all duration-200 ${props.className || ''}`}>
      <div
        className={`absolute -inset-[1.25px] bg-[conic-gradient(from_var(--rotate),var(--color-anim-1),var(--color-anim-2),var(--color-anim-3))] rounded-full transition-opacity duration-300 animate-spin ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <div className={`relative z-10 w-full h-full flex items-center justify-center bg-bg-base dark:bg-black rounded-full text-text-base dark:text-white ${!isPlaying ? 'ring-1 ring-gray-500 dark:ring-gray-700' : ''}`}>
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
              className={`${baseClasses} relative group overflow-hidden bg-transparent dark:bg-black text-text-base dark:text-white shadow-lg scale-105 ${!isPlaying ? 'ring-1 ring-gray-500 dark:ring-gray-700' : ''} ${className}`}
              onAnimationEnd={handleAnimationEnd}
            >
                <div
                    className={`absolute -top-[150%] -left-[150%] w-[400%] h-[400%] bg-[conic-gradient(from_var(--angle),transparent_var(--fill-percentage),var(--border-color)_100%)] ${animationClass}`}
                    style={{ zIndex: 1 }}
                />
                <div className="absolute z-[2] inset-[1.25px] bg-bg-base dark:bg-black rounded-full" />
                <span className={`relative z-[3] inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>{text}</span>
            </button>
        );
    }

    const inactiveClasses = `bg-transparent text-text-interactive-muted hover:text-text-base dark:hover:text-white shadow-none hover:shadow-sm ${focusRingClasses}`;
    
    return (
        <button ref={ref} onClick={handleItemClick} className={`${baseClasses} ${inactiveClasses} ${className}`}>
            <span className={`inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>{text}</span>
        </button>
    );
});
InteractiveOblongNavItem.displayName = 'InteractiveOblongNavItem';

// SegmentedControl remains the same
export const SegmentedControl = ({ options, activeOption, onOptionClick, isDarkMode }) => {
    const [clickedOption, setClickedOption] = useState(null);

    useEffect(() => {
        if (clickedOption === null) return;
        const timer = setTimeout(() => setClickedOption(null), 300); // Animation duration
        return () => clearTimeout(timer);
    }, [clickedOption]);

    const handleOptionClick = (option) => {
        setClickedOption(option);
        onOptionClick(option);
    };

    return (
        <div className={`flex items-center bg-bg-muted dark:bg-bg-muted p-1 rounded-full shadow-lg border border-gray-500 dark:border-gray-700 transform transition-transform duration-200 hover:scale-105`}>
            {options.map((option) => {
                const isActive = activeOption === option;
                const isClicked = clickedOption === option;
                const activeClasses = `bg-bg-base dark:bg-black text-text-base dark:text-white ring-1 ring-gray-500 dark:ring-gray-700`;
                const inactiveClasses = `text-interactive-muted hover:text-text-base dark:hover:text-white`;

                return (
                    <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className={`font-semibold text-sm sm:text-base py-1.5 px-5 first:rounded-l-full last:rounded-r-full transition-all duration-300 ease-in-out whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-primary ${
                            isActive ? activeClasses : inactiveClasses
                        }`}
                        aria-label={`Select ${option} view`}
                    >
                        <span className={`inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>
                            {option}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};