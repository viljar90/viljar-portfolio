// src/components/InteractivePillNav.js
import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InteractivePillNav = ({ 
  menuItems, 
  selected, 
  setSelected, 
  variant = 'full', 
  showToggle = true, 
  width = null, 
  fullWidth = false 
}) => {
  const itemsRef = useRef({});
  const scrollContainerRef = useRef(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [internalVariant, setInternalVariant] = useState(variant);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const prevSelectedRef = useRef(selected);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const updateNavFade = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    const scrollBuffer = 5;
    setShowLeftFade(hasOverflow && el.scrollLeft > scrollBuffer);
    setShowRightFade(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - scrollBuffer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      updateNavFade();
      scrollContainer.addEventListener('scroll', updateNavFade);
      const resizeObserver = new ResizeObserver(updateNavFade);
      resizeObserver.observe(scrollContainer);
      return () => {
        scrollContainer.removeEventListener('scroll', updateNavFade);
        resizeObserver.disconnect();
      };
    }
  }, [updateNavFade, menuItems, internalVariant, variant]);

  useEffect(() => {
    if (clickedItem === null) return;
    const timer = setTimeout(() => setClickedItem(null), 300);
    return () => clearTimeout(timer);
  }, [clickedItem]);

  const handleItemClick = (item) => {
      setClickedItem(item);
      setSelected(item);
  };

  useLayoutEffect(() => {
    if (isMounted && itemsRef.current[selected]) {
      const initialElement = itemsRef.current[selected];
      if (initialElement) {
        const { offsetLeft, offsetWidth } = initialElement;
        setPillStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [isMounted, selected, menuItems, internalVariant, variant]);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => setIsReady(true), 50); 
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isReady) return;

    const currentItemElement = itemsRef.current[selected];
    const prevItemElement = itemsRef.current[prevSelectedRef.current];

    if (currentItemElement) {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                entry.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
            observer.disconnect();
        }, { root: scrollContainerRef.current, threshold: 1.0 });
        observer.observe(currentItemElement);
        
      const { offsetLeft: currentLeft, offsetWidth: currentWidth } = currentItemElement;

      if (!prevItemElement || prevItemElement === currentItemElement) {
        setPillStyle({ left: currentLeft, width: currentWidth });
      } else {
        const { offsetLeft: prevLeft } = prevItemElement;
        const isMovingRight = currentLeft > prevLeft;
        
        const stretchWidth = isMovingRight
          ? currentLeft + currentWidth - prevLeft
          : prevLeft + prevItemElement.offsetWidth - currentLeft;
        const stretchLeft = isMovingRight ? prevLeft : currentLeft;

        setPillStyle({ left: stretchLeft, width: stretchWidth });

        const timer = setTimeout(() => {
          setPillStyle({ left: currentLeft, width: currentWidth });
        }, 250);

        return () => {
          clearTimeout(timer);
          prevSelectedRef.current = selected;
        };
      }
    }
    
    prevSelectedRef.current = selected;
  }, [selected, isReady, menuItems, internalVariant, variant]);

  const handleToggleClick = () => {
    if (variant === 'auto') {
        setInternalVariant(currentView => (currentView === 'auto' ? 'full' : 'auto'));
    } else {
        setInternalVariant(currentView => (currentView === 'full' ? 'compressed' : 'full'));
    }
  };

  const getToggleText = () => {
    if (internalVariant === 'compressed' || internalVariant === 'auto') {
        return 'Show all';
    }
    return 'Collapse';
  };
  
  const getContainerStyleAndClass = () => {
    let style = { transition: 'max-width 350ms ease-in-out' };
    let className = 'flex items-center gap-2';

    if (width) {
        style.maxWidth = width;
        className += ' w-full';
        return { style, className };
    }
    if (fullWidth) {
        style.maxWidth = '100%';
        className += ' w-full';
        return { style, className };
    }

    const currentVariant = showToggle ? internalVariant : variant;

    if (currentVariant === 'auto') {
        style.maxWidth = 'none';
        className += ' w-auto';
    } else if (currentVariant === 'compressed') {
        style.maxWidth = showToggle ? '340px' : '250px';
        className += ' w-full';
    } else { // 'full'
        style.maxWidth = showToggle ? '900px' : '778px';
        className += ' w-full';
    }
    
    return { style, className };
  };

  const { style: containerStyle, className: containerClassName } = getContainerStyleAndClass();

  return (
    <>
      <style>{`
        .animated-pill {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }
        .animated-pill--visible {
          opacity: 1;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes text-bounce {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        }
        .animate-text-bounce {
            animation: text-bounce 0.3s ease-in-out;
        }
      `}</style> 
      
      <div 
        className={containerClassName}
        style={containerStyle}
      >
        {showToggle && (
            <button
                onClick={handleToggleClick}
                className="flex-shrink-0 cursor-pointer px-4 py-1.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-900 font-semibold text-base border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500"
            >
                {getToggleText()}
            </button>
        )}

        <div className="min-w-0 flex-1">
          <div 
          className="p-1 border border-border-interactive rounded-full bg-bg-base shadow-lg backdrop-blur-sm transform transition-transform duration-200 hover:scale-103"
          >
            <div className="relative rounded-full overflow-hidden">
              <ul ref={scrollContainerRef} className="relative flex items-center justify-start whitespace-nowrap overflow-x-auto no-scrollbar" role="tablist">
              
              {isMounted && (
                  <div
                  className={`animated-pill absolute top-0 bottom-0 z-0 bg-bg-element rounded-full ${isReady ? 'animated-pill--visible' : ''}`}
                  style={{
                      left: `${pillStyle.left}px`,
                      width: `${pillStyle.width}px`,
                      transition: isReady 
                      ? 'left 250ms ease-out, width 250ms ease-out, opacity 300ms ease-in-out' 
                      : 'none',
                  }}
                  aria-hidden="true"
                  />
              )}

              {menuItems.map((item) => {
                  const isClicked = clickedItem === item;
                  const isSelected = selected === item;
                  return (
                  <li
                    key={item}
                    ref={(el) => (itemsRef.current[item] = el)}
                    role="presentation"
                    className="relative z-10"
                  >
                    <button
                        onClick={() => handleItemClick(item)}
                        role="tab"
                        aria-selected={isSelected}
                        className={`block w-full cursor-pointer px-4 py-1.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-900 font-semibold text-base ${
                        isSelected ? 'text-text-inverted' : 'text-gray-500 hover:text-black dark:hover:text-white'
                        }`}
                    >
                        <span className={`inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>
                        {item}
                        </span>
                    </button>
                  </li>
                )})}
              </ul>
              
              {/* --- FIX: Added z-20 to both gradient divs --- */}
              <div className={`absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-bg-base to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} pointer-events-none z-20`}></div>
              <div className={`absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-bg-base to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} pointer-events-none z-20`}></div>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

InteractivePillNav.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['full', 'compressed', 'auto']),
    showToggle: PropTypes.bool,
    width: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default InteractivePillNav;