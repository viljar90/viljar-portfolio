// src/components/SpecialisedClipPathSelector.js
import React from 'react';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------
// --- UNIFIED SELECTOR COMPONENT ---
// This single, specialized component handles all states and animations
// (active, inactive, hover, and click transitions) to ensure smooth animations.
// ----------------------------------------------------------------
const Selector = ({ children, id, isActive, hoveredId, onMouseEnter, onMouseLeave, onClick }) => {
  // --- State Determination ---
  const isThisSelectorHovered = id === hoveredId;

  // --- Corrected Dynamic Class Calculation ---

  // 1. Calculate the vertical position (Y-transform) with clearer logic.
  let yPositionClass = '';
  if (isActive) {
    // This selector is the active one.
    if (hoveredId && !isThisSelectorHovered) {
      // It's active, but another selector is hovered, so it gets NUDGED DOWN.
      yPositionClass = 'transform translate-y-2';
    } else {
      // It's active and either not hovered, or hovered itself. It should be at the TOP.
      yPositionClass = 'transform translate-y-0';
    }
  } else {
    // This selector is inactive.
    if (isThisSelectorHovered) {
      // It's inactive, but it's being HOVERED UP.
      yPositionClass = 'transform translate-y-2';
    } else {
      // It's inactive and not being hovered, so it's in its RESTING position.
      yPositionClass = 'transform translate-y-4';
    }
  }

  // 2. Calculate the clip-path "bulge" shape with clearer logic.
  let clipClass = '';
  if (isActive) {
    // This selector is the active one.
    if (hoveredId && !isThisSelectorHovered) {
      // It's active but nudged, so it gets an intermediate bulge.
      clipClass = 'clipped-hover';
    } else {
      // It's the primary active selector, so it gets the full bulge.
      clipClass = 'clipped-normal';
    }
  } else {
    // This selector is inactive.
    if (isThisSelectorHovered) {
      // It's inactive but hovered, so it gets an intermediate bulge.
      clipClass = 'clipped-hover';
    } else {
      // It's inactive and resting, so it gets the most subtle bulge.
      clipClass = 'clipped-subtle';
    }
  }

  // 3. Calculate the inner pill's border color.
  // The border is visible (`border-slate-300`) only when the selector is active.
  // Otherwise, it's transparent to make it look invisible but prevent layout shifts.
  const innerPillBorderClass = isActive ? 'border-slate-300' : 'border-transparent';

  // 4. Calculate the inner pill's text color.
  // The text is black (`text-slate-800`) if active, or if an inactive selector is hovered.
  // Otherwise, it's grey (`text-slate-500`).
  const innerPillTextColorClass = isActive ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-800';

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // The main container for each selector handles the vertical animation.
      className={`group relative transition-transform duration-300 ease-in-out ${yPositionClass}`}
    >
      {/* The Bulge Shape: This animates its clip-path based on the calculated class. */}
      <div 
        className={`
          absolute inset-0 border border-slate-300 rounded-full bg-white
          transition-all duration-300 ease-in-out
          ${clipClass}
        `}
      ></div>
      
      {/* The Inner Pill: Now has its own solid white background to prevent visual glitches. */}
      <div className="relative z-10 p-1.5">
        <div className={`px-6 py-2 font-semibold bg-white rounded-full border whitespace-nowrap transition-colors duration-300 ${innerPillTextColorClass} ${innerPillBorderClass}`}>
          {children}
        </div>
      </div>
    </button>
  );
};

Selector.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  hoveredId: PropTypes.number,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};


// ----------------------------------------------------------------
// --- MAIN APP COMPONENT ---
// This component manages the state and layout for the entire selector system.
// ----------------------------------------------------------------
const SpecialisedClipPathSelector = ({ selectors, activeSelectorId, onSelectorChange }) => {
  // State to track which selector is currently being hovered over.
  const [hoveredSelectorId, setHoveredSelectorId] = React.useState(null);

  return (
    <div className="relative w-full">
      {/* This style tag defines all the different clip-path shapes used for animations. */}
      <style>{`
        /* .clipped-normal: The largest bulge, for the fully active selector. */
        .clipped-normal {
          clip-path: inset(0 0 50% 0);
        }
        /* .clipped-hover: An intermediate bulge for hover/nudge. */
        .clipped-hover {
          clip-path: inset(0 0 65% 0);
        }
        /* .clipped-subtle: The smallest bulge, for an inactive selector's resting state. */
        .clipped-subtle {
          clip-path: inset(0 0 80% 0); 
        }
      `}</style>

      {/* The horizontal line is now shorter (w-5/6) and centered. */}
      <div className="absolute top-1/2 left-1/2 w-5/6 h-px bg-slate-300 transform -translate-x-1/2 -translate-y-[1px]"></div>

      {/* This container lays out the selectors and aligns them correctly. */}
      <div className="flex justify-center items-end space-x-8">
          
          {/* We now map over the data and render a single, unified Selector component for each. */}
          {selectors.map(selector => (
            <Selector
              key={selector.id}
              id={selector.id}
              isActive={activeSelectorId === selector.id}
              hoveredId={hoveredSelectorId}
              onMouseEnter={() => setHoveredSelectorId(selector.id)}
              onMouseLeave={() => setHoveredSelectorId(null)}
              onClick={() => onSelectorChange(selector.id)}
            >
              {selector.label}
            </Selector>
          ))}
      </div>
    </div>
  );
};

SpecialisedClipPathSelector.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  activeSelectorId: PropTypes.number.isRequired,
  onSelectorChange: PropTypes.func.isRequired,
};

export default SpecialisedClipPathSelector;