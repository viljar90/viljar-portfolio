// src/components/DesignChapter.js
import React, { useRef, useEffect } from 'react'; // Import useRef and useEffect
import PropTypes from 'prop-types';
import { BlinkingCursor } from './uiElements';
import { DESIGN_NAV_ITEMS, DESIGN_CONTENT } from '../content';

// Updated component for the static "Document" view
const DesignDocumentView = ({ activeDesignStageKey }) => {
    const stageContent = DESIGN_CONTENT[activeDesignStageKey];
    const scrollContainerRef = useRef(null); // Create a ref for the scrolling container

    // Effect to scroll to top when the active stage changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [activeDesignStageKey]);


    if (!stageContent) {
        return <div className="text-error">Content not found for this stage.</div>;
    }

    // Keep track of the last title rendered
    let lastTitle = null;

    return (
        <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-[70vh]">
            {/* Fading overlay for the top */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-base to-transparent z-10 pointer-events-none" />
            
            <div ref={scrollContainerRef} className="text-left overflow-y-auto h-full p-4 pt-16 no-scrollbar">
                <div className="space-y-10 pb-16">
                    {stageContent.steps.map((step, index) => {
                        const showTitle = step.title !== lastTitle;
                        lastTitle = step.title;
                        return (
                            <div key={index}>
                                {showTitle && (
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-text-base dark:text-text-base">
                                        {step.title}
                                    </h3>
                                )}
                                <p className="text-lg sm:text-xl text-text-muted dark:text-text-muted mt-2" style={{ whiteSpace: 'pre-line' }}>
                                    {step.mainText}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fading overlay for the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-base to-transparent z-10 pointer-events-none" />
        </div>
    );
};

DesignDocumentView.propTypes = {
    activeDesignStageKey: PropTypes.oneOf(DESIGN_NAV_ITEMS.map(item => item.name)).isRequired,
};


const DesignChapter = ({
    darkMode,
    design,
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

    if (design.designView === 'Document') {
        return <DesignDocumentView activeDesignStageKey={design.activeDesignStageKey} />;
    }

    // Original "Slideshow" view
    const designStepTitleStyle = `text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-secondary mb-6 min-h-[1.2em] whitespace-pre-line`;
    const designChapterMainTextStyle = `text-2xl sm:text-3xl lg:text-4xl font-light text-text-base dark:text-text-muted mt-2 min-h-[5em]`;

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
                {design.displayedDesignTitleChars}
                {showCursorDesignTitle && <BlinkingCursor sizeClass="h-10 md:h-12 lg:h-14" />}
            </h3>
            <p className={designChapterMainTextStyle} style={{ whiteSpace: 'pre-line' }}>
                {design.displayedDesignMainTextChars}
                {showCursorDesignMainText && <BlinkingCursor sizeClass="h-7 md:h-9 lg:h-10" />}
            </p>
        </div>
    );
};

DesignChapter.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  design: PropTypes.shape({
    error: PropTypes.string,
    designView: PropTypes.string.isRequired,
    activeDesignStageKey: PropTypes.string.isRequired,
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