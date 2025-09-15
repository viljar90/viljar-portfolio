import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const popoverRoot = document.getElementById('popover-root');

function DefinitionPopover({ acronym, title, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, transform: 'translateX(-50%) translateY(-100%)' });
  const triggerRef = useRef(null); 
  const popoverRef = useRef(null);

  useLayoutEffect(() => {
    if (isVisible && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      let newLeft = triggerRect.left + triggerRect.width / 2;
      let newTransform = 'translateX(-50%) translateY(-100%)';
      const margin = 16;

      const popoverLeftEdge = newLeft - (popoverRect.width / 2);
      const popoverRightEdge = newLeft + (popoverRect.width / 2);

      if (popoverRightEdge > viewportWidth - margin) {
        newLeft = viewportWidth - margin;
        newTransform = `translateX(-100%) translateY(-100%)`;
      }
      
      if (popoverLeftEdge < margin) {
        newLeft = margin;
        newTransform = `translateX(0%) translateY(-100%)`;
      }

      setPosition({
        top: triggerRect.top - 10, 
        left: newLeft,
        transform: newTransform,
      });
    }
  }, [isVisible]);

  // --- THIS IS THE NEW LOGIC ---
  // We'll only show the arrow if the popover is perfectly centered.
  const isCentered = position.transform.includes('translateX(-50%)');

  const popoverContent = (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: position.transform,
      }}
      className={`
        w-72 rounded-xl p-4 text-left shadow-lg transition-opacity duration-200 ease-in-out z-50
        bg-bg-element text-text-inverted
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      role="tooltip"
    >
      <h4 className="font-bold mb-2">{title}</h4>
      <div className="opacity-80">
        {children}
      </div>
      
      {/* --- THE ARROW IS NOW RENDERED CONDITIONALLY --- */}
      {isCentered && (
        <div 
          className={`
            absolute top-full left-1/2 -translate-x-1/2 
            w-0 h-0 border-x-8 border-x-transparent border-t-8
            border-t-bg-element
          `}
        />
      )}
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="cursor-pointer underline decoration-dotted underline-offset-4"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {acronym}
      </span>
      {createPortal(popoverContent, popoverRoot)}
    </>
  );
}

export default DefinitionPopover;