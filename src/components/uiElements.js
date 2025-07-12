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


  export const PrevArrowIcon = ({ className = "w-12 h-12 text-icon-interactive hover:text-icon-base transition-colors" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  export const NextArrowIcon = ({ className = "w-12 h-12 text-icon-interactive hover:text-icon-base transition-colors" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  export const PuzzleIcon = ({ className = "w-12 h-12 text-icon-static" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 4.5C7.5 3.11929 8.61929 2 10 2C11.3807 2 12.5 3.11929 12.5 4.5V6H13.5C14.8978 6 15.5967 6 16.1481 6.22836C16.8831 6.53284 17.4672 7.11687 17.7716 7.85195C18 8.40326 18 9.10218 18 10.5H19.5C20.8807 10.5 22 11.6193 22 13C22 14.3807 20.8807 15.5 19.5 15.5H18V17.2C18 18.8802 18 19.7202 17.673 20.362C17.3854 20.9265 16.9265 21.3854 16.362 21.673C15.7202 22 14.8802 22 13.2 22H12.5V20.25C12.5 19.0074 11.4926 18 10.25 18C9.00736 18 8 19.0074 8 20.25V22H6.8C5.11984 22 4.27976 22 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V15.5H3.5C4.88071 15.5 6 14.3807 6 13C6 11.6193 4.88071 10.5 3.5 10.5H2C2 9.10218 2 8.40326 2.22836 7.85195C2.53284 7.11687 3.11687 6.53284 3.85195 6.22836C4.40326 6 5.10218 6 6.5 6H7.5V4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

  export const ChartIcon = ({ className = "w-12 h-12 text-icon-static" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 14.5V17.5M11.5 11.5V17.5M16 8.5V17.5M20.5 5.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );

  export const MagicIcon = ({ className = "w-12 h-12 text-icon-static" }) => (
      <svg className={className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(-1, 1)" transformOrigin="center">
              <path d="M20.75 0.742188C20.75 0.327974 20.4142 -0.0078125 20 -0.0078125C19.5858 -0.0078125 19.25 0.327974 19.25 0.742188V1.49219H18.5C18.0858 1.49219 17.75 1.82797 17.75 2.24219C17.75 2.6564 18.0858 2.99219 18.5 2.99219H19.25V3.74219C19.25 4.1564 19.5858 4.49219 20 4.49219C20.4142 4.49219 20.75 4.1564 20.75 3.74219V2.99219H21.5C21.9142 2.99219 22.25 2.6564 22.25 2.24219C22.25 1.82797 21.9142 1.49219 21.5 1.49219H20.75V0.742188Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M14.6804 15.2333L13.6388 18.1446C13.5669 18.3614 13.4358 18.5539 13.2602 18.7003C13.0802 18.8504 12.8609 18.9457 12.6283 18.975C12.3957 19.0043 12.1597 18.9663 11.948 18.8655C11.7364 18.7647 11.5581 18.6053 11.4343 18.4063C11.4274 18.3954 11.4209 18.3842 11.4146 18.3729L9.5954 15.0813L5.70741 15.188C5.47203 15.1925 5.24049 15.1279 5.04144 15.0021C4.84238 14.8764 4.68456 14.6951 4.58748 14.4806C4.4904 14.2662 4.45833 14.0279 4.49523 13.7954C4.53096 13.5703 4.6298 13.3602 4.78006 13.1893L6.96388 10.5501L5.82742 6.86934C5.82457 6.86009 5.82189 6.85079 5.8194 6.84144C5.76289 6.62965 5.76306 6.40672 5.81991 6.19502C5.87675 5.98333 5.98826 5.7903 6.14326 5.6353C6.29826 5.4803 6.49129 5.36879 6.70298 5.31195C6.91468 5.2551 7.13761 5.25493 7.34939 5.31144C7.35875 5.31393 7.36805 5.31661 7.3773 5.31946L11.0581 6.45592L13.6962 4.27309C13.8672 4.12284 14.0773 4.024 14.3024 3.98828C14.5349 3.95137 14.7731 3.98344 14.9876 4.08052C15.2021 4.1776 15.3834 4.33542 15.5091 4.53448C15.6348 4.73353 15.6994 4.96507 15.6949 5.20045L15.6948 5.20665L15.5883 9.08833L18.8797 10.9066C18.8915 10.9131 18.9031 10.9199 18.9145 10.9271C19.1131 11.0512 19.272 11.2295 19.3725 11.441C19.473 11.6525 19.5109 11.8883 19.4817 12.1207C19.4525 12.353 19.3574 12.5721 19.2077 12.7521C19.0614 12.928 18.869 13.0594 18.6522 13.1317L15.7415 14.173L24.2804 22.7119C24.5733 23.0048 24.5733 23.4797 24.2804 23.7726C23.9875 24.0655 23.5126 24.0655 23.2197 23.7726L14.6804 15.2333ZM11.7022 7.86993L14.1773 5.82193L14.0763 9.50352C14.0686 9.78381 14.2179 10.045 14.4634 10.1806L17.6018 11.9143L14.1561 13.1471C14.0414 13.1817 13.9333 13.2443 13.8427 13.3349C13.7551 13.4225 13.6937 13.5264 13.6585 13.6369L12.4216 17.0939L10.6875 13.9563C10.5518 13.7109 10.2907 13.5617 10.0105 13.5694L6.32891 13.6704L8.37787 11.1942C8.53908 10.9994 8.59127 10.7365 8.51666 10.4948L7.40622 6.89826L11.0028 8.00871C11.2444 8.0833 11.5073 8.03113 11.7022 7.86993Z" fill="currentColor"/>
              <path d="M2 20.2422C2 19.828 2.33579 19.4922 2.75 19.4922H3.5V18.7422C3.5 18.328 3.83579 17.9922 4.25 17.9922C4.66421 17.9922 5 18.328 5 18.7422V19.4922H5.75C6.16421 19.4922 6.5 19.828 6.5 20.2422C6.5 20.6564 6.16421 20.9922 5.75 20.9922H5V21.7422C5 22.1564 4.66421 22.4922 4.25 22.4922C3.83579 22.4922 3.5 22.1564 3.5 21.7422V20.9922H2.75C2.33579 20.9922 2 20.6564 2 20.2422Z" fill="currentColor"/>
              <path d="M9.5 -0.0078125C9.91421 -0.0078125 10.25 0.327974 10.25 0.742188V2.99219C10.25 3.4064 9.91421 3.74219 9.5 3.74219C9.08579 3.74219 8.75 3.4064 8.75 2.99219V0.742188C8.75 0.327974 9.08579 -0.0078125 9.5 -0.0078125Z" fill="currentColor"/>
              <path d="M1.25 8.99219C0.835786 8.99219 0.5 9.32797 0.5 9.74219C0.5 10.1564 0.835786 10.4922 1.25 10.4922H3.5C3.91421 10.4922 4.25 10.1564 4.25 9.74219C4.25 9.32797 3.91421 8.99219 3.5 8.99219H1.25Z" fill="currentColor"/>
          </g>
      </svg>
  );

  export const PieChartIcon = ({ className = "w-12 h-12 text-icon-static" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.2 14C17.477 14 17.6155 14 17.7278 14.0615C17.8204 14.1122 17.9065 14.2075 17.9478 14.3047C17.9978 14.4225 17.9852 14.5479 17.96 14.7987C17.8296 16.0987 17.3822 17.3514 16.6518 18.4445C15.7727 19.7601 14.5233 20.7855 13.0615 21.391C11.5997 21.9965 9.99113 22.155 8.43928 21.8463C6.88743 21.5376 5.46197 20.7757 4.34315 19.6568C3.22433 18.538 2.4624 17.1126 2.15372 15.5607C1.84504 14.0089 2.00347 12.4003 2.60897 10.9385C3.21447 9.47671 4.23985 8.22728 5.55544 7.34823C6.64856 6.61783 7.90125 6.17039 9.20131 6.03995C9.45207 6.01479 9.57745 6.00221 9.69528 6.0522C9.79249 6.09344 9.88776 6.17964 9.9385 6.27224C10 6.38449 10 6.52299 10 6.79999V13.2C10 13.48 10 13.62 10.0545 13.727C10.1024 13.8211 10.1789 13.8976 10.273 13.9455C10.38 14 10.52 14 10.8 14H17.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2.79999C14 2.52298 14 2.38448 14.0615 2.27223C14.1122 2.17963 14.2075 2.09344 14.3047 2.0522C14.4225 2.0022 14.5479 2.01478 14.7987 2.03993C16.6271 2.22333 18.346 3.03229 19.6569 4.34313C20.9677 5.65398 21.7767 7.37289 21.9601 9.20129C21.9852 9.45206 21.9978 9.57744 21.9478 9.69527C21.9066 9.79248 21.8204 9.88774 21.7278 9.93848C21.6155 9.99998 21.477 9.99999 21.2 9.99999L14.8 9.99999C14.52 9.99999 14.38 9.99999 14.273 9.94549C14.1789 9.89755 14.1024 9.82106 14.0545 9.72698C14 9.62003 14 9.48001 14 9.19999V2.79999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  );

  export const VideoEditorIcon = ({ className = "w-12 h-12 text-icon-static" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2.5L17 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 2.5L7 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 12L7 12M22 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2.5 7L7 7M21.5 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21.5 17.75C21.9142 17.75 22.25 17.4142 22.25 17C22.25 16.5858 21.9142 16.25 21.5 16.25V17.75ZM17 16.25C16.5858 16.25 16.25 16.5858 16.25 17C16.25 17.4142 16.5858 17.75 17 17.75V16.25ZM7 17.75C7.41421 17.75 7.75 17.4142 7.75 17C7.75 16.5858 7.41421 16.25 7 16.25L7 17.75ZM17 17.75L21.5 17.75V16.25L17 16.25V17.75ZM2 17.75L7 17.75L7 16.25L2 16.25L2 17.75Z" fill="currentColor"/>
        <path d="M14 12C14 11.4722 13.4704 11.1162 12.4112 10.4043C11.3375 9.68271 10.8006 9.3219 10.4003 9.58682C10 9.85174 10 10.5678 10 12C10 13.4322 10 14.1483 10.4003 14.4132C10.8006 14.6781 11.3375 14.3173 12.4112 13.5957C13.4704 12.8838 14 12.5278 14 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.352 4.28094 21.7133 5.37486 21.8731 7M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.64799 19.7191 2.28672 18.6251 2.12687 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
      <div className={`relative z-10 w-full h-full flex items-center justify-center bg-bg-base dark:bg-black rounded-full text-icon-interactive group-hover:text-icon-base ${!isPlaying ? 'ring-1 ring-gray-500 dark:ring-gray-700' : ''}`}>
  {isPlaying ? (
    <div key="pause" className="animate-scale-in">
      <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" />
    </div>
  ) : (
    <div key="play" className="animate-scale-in">
      <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" />
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
                const inactiveClasses = `text-text-interactive-muted hover:text-text-base dark:hover:text-white`;

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

// --- New Icons for ViewSwitcher ---
export const DocumentIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

export const QuoteIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m21.95 8.721-.025-.168-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222-.474.197.484 1.939.597-.144c.191-.048.424-.104.689-.171.271-.05.56-.187.882-.312.317-.143.686-.238 1.028-.467.344-.218.741-.4 1.091-.692.339-.301.748-.562 1.05-.944.33-.358.656-.734.909-1.162.293-.408.492-.856.702-1.299.19-.443.343-.896.468-1.336.237-.882.343-1.72.384-2.437.034-.718.014-1.315-.028-1.747a7.028 7.028 0 0 0-.063-.539zm-11 0-.025-.168-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939.597-.144c.191-.048.424-.104.689-.171.271-.05.56-.187.882-.312.317-.143.686-.238 1.028-.467.344-.218.741-.4 1.091-.692.339-.301.748-.562 1.05-.944.33-.358.656-.734.909-1.162.293-.408.492-.856.702-1.299.19-.443.343-.896.468-1.336.237-.882.343-1.72.384-2.437.034-.718.014-1.315-.028-1.747a7.571 7.571 0 0 0-.064-.537z"/>
    </svg>
);

// --- ViewSwitcherButton Component ---
export const ViewSwitcherButton = ({ currentView, onClick, isDarkMode }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick();
        setTimeout(() => setIsClicked(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            className={`h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem] flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent dark:bg-bg-muted text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md`}
            aria-label={`Switch to ${currentView === 'Slideshow' ? 'Document' : 'Slideshow'} view`}
        >
            <span className={isClicked ? 'animate-click-bounce' : ''}>
                {currentView === 'Slideshow' ? <DocumentIcon /> : <QuoteIcon />}
            </span>
        </button>
    );
};