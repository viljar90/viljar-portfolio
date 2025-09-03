import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const InteractivePillNav = ({ menuItems, selected, setSelected }) => {
  const itemsRef = useRef({});
  const scrollContainerRef = useRef(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const [pillStyle, setPillStyle] = useState({
    left: 0,
    width: 0,
  });

  const prevSelectedRef = useRef(selected);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const updateNavFade = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    const scrollBuffer = 5; // To prevent fades from showing on minimal scroll
    setShowLeftFade(hasOverflow && el.scrollLeft > scrollBuffer);
    setShowRightFade(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - scrollBuffer);
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
  }, [updateNavFade, menuItems]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  }, [isMounted, selected]);

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
        setPillStyle({
          left: currentLeft,
          width: currentWidth,
        });
      } else {
        const { offsetLeft: prevLeft, offsetWidth: prevWidth } = prevItemElement;
        const isMovingRight = currentLeft > prevLeft;
        const stretchWidth = isMovingRight
          ? currentLeft + currentWidth - prevLeft
          : prevLeft + prevWidth - currentLeft;
        const stretchLeft = isMovingRight ? prevLeft : currentLeft;

        setPillStyle({
          left: stretchLeft,
          width: stretchWidth,
        });

        const timer = setTimeout(() => {
          setPillStyle({
            left: currentLeft,
            width: currentWidth,
          });
        }, 250);

        return () => {
          clearTimeout(timer);
          prevSelectedRef.current = selected;
        };
      }
    }
    
    prevSelectedRef.current = selected;
  }, [selected, isReady]);

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
        className="transform transition-transform duration-200 hover:scale-103"
        style={{ maxWidth: '778px' }}
      >
        <div 
          className="p-1 border border-gray-300 dark:border-gray-700 rounded-full bg-white shadow-lg"
        >
          <div className="relative rounded-full overflow-hidden">
            <ul ref={scrollContainerRef} className="relative flex items-center justify-start whitespace-nowrap overflow-x-auto no-scrollbar" role="tablist">
              {isMounted && (
                <div
                  className={`animated-pill absolute top-0 bottom-0 z-0 bg-black dark:bg-gray-700 rounded-full ${isReady ? 'animated-pill--visible' : ''}`}
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
                    className={`block w-full cursor-pointer px-4 py-1.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-base font-semibold text-sm sm:text-base ${
                      isSelected ? 'text-white dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span className={`inline-block ${isClicked ? 'animate-text-bounce' : ''}`}>
                      {item}
                    </span>
                  </button>
                </li>
              )})}
            </ul>
            <div className={`absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
            <div className={`absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
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
};

export default InteractivePillNav;