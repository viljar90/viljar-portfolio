import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const popoverRoot = document.getElementById('popover-root');

function DefinitionPopover({ acronym, title, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null); 

  useLayoutEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, 
        left: rect.left + rect.width / 2,
      });
    }
  }, [isVisible]);

  const popoverContent = (
    <div
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%) translateY(-100%)',
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
      
      <div 
        className={`
          absolute top-full left-1/2 -translate-x-1/2 
          w-0 h-0 border-x-8 border-x-transparent border-t-8
          border-t-bg-element // THE FIX IS HERE
        `}
      />
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