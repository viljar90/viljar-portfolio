// src/components/DefinitionPopover.js

import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

// We get the portal root element once
const popoverRoot = document.getElementById('popover-root');

function DefinitionPopover({ acronym, title, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null); // Ref to get the position of the acronym

  // This effect calculates the position of the popover
  useLayoutEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        // Position it above the acronym
        top: rect.top - 10, // 10px spacing from the text
        // Center it horizontally with the acronym
        left: rect.left + rect.width / 2,
      });
    }
  }, [isVisible]);

  const triggerStyle = {
    cursor: 'pointer',
    textDecoration: 'underline dotted',
    textUnderlineOffset: '3px',
  };

  const popoverStyle = {
    // Positioning is now 'fixed' to relate to the viewport
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    // This transform trick centers the popover and pushes it up
    transform: 'translateX(-50%) translateY(-100%)',
    
    // Appearance (same as before)
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '280px',
    textAlign: 'left',
    zIndex: 1000, // High z-index to appear on top of everything
    
    // Animation (same as before)
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  };
  
  const popoverArrowStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-1px)',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid #333',
  };

  const popoverContent = (
    <div style={popoverStyle}>
      <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{title}</h4>
      <div style={{ opacity: 0.8 }}>{children}</div>
      <div style={popoverArrowStyle}></div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        style={triggerStyle}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {acronym}
      </span>
      {/* The popover is "teleported" to the 'popover-root' div */}
      {createPortal(popoverContent, popoverRoot)}
    </>
  );
}

export default DefinitionPopover;