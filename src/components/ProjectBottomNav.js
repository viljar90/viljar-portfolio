// src/components/ProjectBottomNav.js
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InteractiveOblongNavItem } from './uiElements';

const ProjectBottomNav = ({ sections, activeSection, onNavItemClick, isDarkMode }) => {
  const scrollContainerRef = useRef(null);
  const itemNavRefs = useRef([]);
  const [showLeftFade, setShowLeftFade] = React.useState(false);
  const [showRightFade, setShowRightFade] = React.useState(false);

  const updateNavFade = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowLeftFade(hasOverflow && el.scrollLeft > 10);
    setShowRightFade(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    updateNavFade();
    scrollContainer.addEventListener('scroll', updateNavFade);
    const resizeObserver = new ResizeObserver(updateNavFade);
    resizeObserver.observe(scrollContainer);
    return () => {
      scrollContainer.removeEventListener('scroll', updateNavFade);
      resizeObserver.disconnect();
    };
  }, [updateNavFade, sections]);

  useEffect(() => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    const activeElement = itemNavRefs.current[activeIndex];
    if (activeElement && scrollContainerRef.current) {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                entry.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
            observer.disconnect();
        }, { root: scrollContainerRef.current, threshold: 1.0 });
        observer.observe(activeElement);
        return () => observer.disconnect();
    }
  }, [activeSection, sections]);

  return (
    <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
      <div className="relative w-full md:w-auto transform transition-transform duration-200 hover:scale-[1.02] bg-bg-muted dark:bg-slate-950 rounded-full shadow-lg border border-gray-500 dark:border-gray-700 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="py-1.5 px-2.5 flex items-center justify-start space-x-2 transition-colors duration-300 overflow-x-auto no-scrollbar"
        >
          {sections.map((item, index) => (
            <InteractiveOblongNavItem
              key={item.id}
              ref={el => (itemNavRefs.current[index] = el)}
              text={item.title}
              onClick={() => onNavItemClick(item.id)}
              isActive={activeSection === item.id}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
        <div className={`absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-bg-muted to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
        <div className={`absolute top-0 bottom-0 right-[-0.1rem] w-24 bg-gradient-to-l from-bg-muted to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
      </div>
    </div>
  );
};

ProjectBottomNav.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  activeSection: PropTypes.string.isRequired,
  onNavItemClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool,
};

export default ProjectBottomNav;