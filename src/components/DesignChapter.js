import React from 'react';
import PropTypes from 'prop-types';
import { BlinkingCursor } from './uiElements';

const DesignChapter = ({
    darkMode,
    design, // Changed to accept the whole design object
    currentDesignStepData,
    showCursorDesignTitle,
    showCursorDesignMainText,
}) => {
    // Check if there's an error from the hook
    if (design.error) {
        return (
            <div className="w-full text-center text-error">
                <h3 className="text-3xl font-bold mb-4">Error</h3>
                <p className="text-lg">{design.error}</p>
            </div>
        );
    }
    
    // *** FIXED LOGIC: Added responsive text sizes for consistency ***
    const designStepTitleStyle = `text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-secondary mb-6 min-h-[1.2em] whitespace-pre-line`;
    const designChapterMainTextStyle = `text-2xl sm:text-3xl lg:text-4xl font-light text-text-base dark:text-text-muted mt-2 min-h-[5em]`;

    // Add safety check for undefined currentDesignStepData
    if (!currentDesignStepData) {
        return (
            <div className="w-full mt-[-4em] sm:mt-[-2em] md:mt-0">
                <h3 className={`${designStepTitleStyle} opacity-0`}>&nbsp;</h3>
                <p className={`${designChapterMainTextStyle} opacity-0`}>&nbsp;</p>
            </div>
        );
    }

    return (
        <div className="w-full mt-[-4em] sm:mt-[-2em] md:mt-0">
            <h3 className={designStepTitleStyle}>
                {design.displayedDesignTitleChars} {/* Use design.displayedDesignTitleChars */}
                {showCursorDesignTitle && <BlinkingCursor sizeClass="h-10 md:h-12 lg:h-14" />}
            </h3>
            <p className={designChapterMainTextStyle} style={{ whiteSpace: 'pre-line' }}>
                {design.displayedDesignMainTextChars} {/* Use design.displayedDesignMainTextChars */}
                {showCursorDesignMainText && <BlinkingCursor sizeClass="h-7 md:h-9 lg:h-10" />}
            </p>
        </div>
    );
};

DesignChapter.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  design: PropTypes.shape({
    error: PropTypes.string,
    displayedDesignTitleChars: PropTypes.string.isRequired,
    displayedDesignMainTextChars: PropTypes.string.isRequired,
  }).isRequired,
  currentDesignStepData: PropTypes.shape({
    title: PropTypes.string,
    mainText: PropTypes.string,
  }),
  showCursorDesignTitle: PropTypes.bool.isRequired,
  showCursorDesignMainText: PropTypes.bool.isRequired,
};

export default DesignChapter;