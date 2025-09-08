// src/components/Accordion.js
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowDownIcon } from './uiElements';

const Accordion = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  const contentRef = useRef(null);
  const [cardStyle, setCardStyle] = useState({});
  const cardRef = useRef(null);
  
  // --- NEW (PART 1): State to track user interaction ---
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (startOpen && contentRef.current) {
      contentRef.current.style.maxHeight = '1000px'; 
    }
  }, [startOpen]);

  const toggleAccordion = () => {
    // --- NEW (PART 2): Set interacted on click ---
    if (!hasInteracted) setHasInteracted(true);
    setIsOpen(!isOpen);
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? '0px'
        : `${contentRef.current.scrollHeight}px`;
    }
  };

  const handleMouseMove = (e) => {
    // --- NEW (PART 3): Set interacted on mouse move ---
    if (!hasInteracted) setHasInteracted(true);
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -2;
    const rotateY = (x / width) * 2;
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
    // --- NEW (PART 4): Add conditional animation class ---
    <div 
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-bg-base dark:border dark:border-gray-700 rounded-xl shadow-lg w-full mb-6 transition-transform duration-200 ease-out ${!hasInteracted ? 'animate-nudge-loop' : ''}`}
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