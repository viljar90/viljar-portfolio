// src/components/Accordion.js
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowDownIcon } from './uiElements';

const Accordion = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  const contentRef = useRef(null);
  const [cardStyle, setCardStyle] = useState({});
  const cardRef = useRef(null);
  
  // State to track if the accordion has ever been opened by the user
  const [hasBeenOpened, setHasBeenOpened] = useState(startOpen);

  useEffect(() => {
    if (startOpen && contentRef.current) {
      contentRef.current.style.maxHeight = '1000px'; 
    }
  }, [startOpen]);

  const toggleAccordion = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // --- THIS IS THE FIX ---
    // The "hasBeenOpened" state is now set to true only when the accordion is opened.
    // It will remain true even if the accordion is subsequently closed.
    if (newIsOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }

    if (contentRef.current) {
      contentRef.current.style.maxHeight = newIsOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  };

  const handleMouseMove = (e) => {
    // The parallax effect on hover is preserved, but it no longer stops the animation.
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -4;
    const rotateY = (x / width) * 4;
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };
   
  const handleMouseLeave = () => {
    setCardStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0)'
    });
  };

  return (
    // --- THIS IS THE FIX ---
    // The animation now depends on `hasBeenOpened` instead of the more general `hasInteracted`.
    <div 
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-bg-base dark:border dark:border-gray-700 rounded-xl shadow-lg w-full mb-6 transition-transform duration-200 ease-out ${!hasBeenOpened ? 'animate-nudge-loop' : ''}`}
    >
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-secondary rounded-xl"
        aria-expanded={isOpen}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-secondary text-left">
          {title}
        </h2>
        <ArrowDownIcon
          className={`w-6 h-6 text-text-muted transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
        style={{ maxHeight: startOpen ? undefined : '0px' }}
      >
        <div className="px-6 pb-6 text-lg sm:text-xl text-text-muted dark:text-slate-300 leading-relaxed whitespace-pre-line text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  startOpen: PropTypes.bool,
};

export default Accordion;