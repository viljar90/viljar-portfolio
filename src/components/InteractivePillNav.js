// src/components/InteractivePillNav.js
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * An accessible and robust animated navigation menu.
 *
 * This component features a "pill" background that animates between selected
 * items with a "stretch-and-shrink" effect. The animation is manually
 * controlled for precise behavior.
 *
 * Key Improvements:
 * 1.  **Accessibility**: Uses `button` elements with appropriate ARIA roles.
 * 2.  **Robustness**: Includes `whitespace-nowrap` to prevent wrapping.
 * 3.  **Smart Focus**: Uses `focus-visible` for keyboard-only focus rings.
 * 4.  **Bulletproof SSR Fix**: The pill is not rendered on the server at all.
 * It is conditionally rendered only on the client-side after hydration.
 * 5.  **Outline Style**: Uses borders instead of background colors for a
 * modern, transparent look.
 */
const InteractivePillNav = ({ menuItems, selected, setSelected }) => {
  const itemsRef = useRef({});

  const [pillStyle, setPillStyle] = useState({
    left: 0,
    width: 0,
  });

  const prevSelectedRef = useRef(selected);
  
  // State to control when transitions and visibility are enabled.
  const [isReady, setIsReady] = useState(false);
  
  // State to ensure the pill is only rendered on the client.
  // This helps with Server-Side Rendering (SSR) by preventing the pill from
  // rendering until the component is mounted on the client side.
  const [isMounted, setIsMounted] = useState(false);

  // On mount, we set isMounted to true. This triggers the pill to render.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Step 1: Set the initial position synchronously before the first paint.
  // This now runs after the pill is first mounted on the client.
  useLayoutEffect(() => {
    if (isMounted && itemsRef.current[selected]) {
      const initialElement = itemsRef.current[selected];
      if (initialElement) {
        const { offsetLeft, offsetWidth } = initialElement;
        setPillStyle({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [isMounted, selected]); // Added selected to dependency array to re-calculate on initial selection change

  // Step 2: Enable transitions and visibility *after* the initial position is set.
  useEffect(() => {
    if (isMounted) {
      // Small timeout to ensure the initial position is fully set and rendered
      // before enabling transitions, preventing a flicker.
      setTimeout(() => setIsReady(true), 50); 
    }
  }, [isMounted]);

  // Step 3: The original, untouched animation logic.
  useEffect(() => {
    if (!isReady) {
      return;
    }

    const currentItemElement = itemsRef.current[selected];
    const prevItemElement = itemsRef.current[prevSelectedRef.current];

    if (currentItemElement) {
      const { offsetLeft: currentLeft, offsetWidth: currentWidth } = currentItemElement;

      if (!prevItemElement || prevItemElement === currentItemElement) {
        setPillStyle({
          left: currentLeft,
          width: currentWidth,
        });
      } else {
        // --- THE ORIGINAL TWO-STEP ANIMATION LOGIC (UNCHANGED) ---
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
      `}</style>
      <div className="w-auto max-w-lg p-1 transform transition-transform duration-200 hover:scale-105"> {/* Added hover:scale-105 */}
        {/* Container now has the border back */}
        <div className="p-1 border border-gray-500 dark:border-gray-700 rounded-full bg-bg-base shadow-lg">
          <ul className="relative flex items-center justify-center whitespace-nowrap" role="tablist">
            {/* The pill is now conditionally rendered only on the client */}
            {isMounted && (
              <div
                className={`animated-pill absolute top-0 bottom-0 z-0 border border-gray-500 dark:border-gray-700 rounded-full ${isReady ? 'animated-pill--visible' : ''}`}
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
            
            {menuItems.map((item) => (
              <li
                key={item}
                ref={(el) => (itemsRef.current[item] = el)}
                role="presentation"
                className="relative z-10"
              >
                <button
                  onClick={() => setSelected(item)}
                  role="tab"
                  aria-selected={item === selected}
                  className={`block w-full cursor-pointer px-4 py-1.5 rounded-md transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-base font-semibold text-sm sm:text-base ${
                    selected === item ? 'text-text-base dark:text-white' : 'text-text-interactive-muted hover:text-text-base dark:hover:text-white'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
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