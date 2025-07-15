// src/components/DesignChapter.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BlinkingCursor } from './uiElements';
import { DESIGN_NAV_ITEMS, DESIGN_CONTENT } from '../content';

const DocumentContent = React.forwardRef(({ stageKey, onScroll }, ref) => {
    const stageContent = DESIGN_CONTENT[stageKey];

    if (!stageContent) return null;

    let lastTitle = null;

    return (
        <div ref={ref} className="text-left overflow-y-auto h-full px-4 md:px-16 lg:px-24 pt-16 no-scrollbar" onScroll={onScroll}>
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
    );
});
DocumentContent.displayName = 'DocumentContent';
DocumentContent.propTypes = {
    stageKey: PropTypes.string.isRequired,
    onScroll: PropTypes.func.isRequired,
};

const DesignDocumentView = ({ design }) => {
    const scrollContainerRef = useRef(null);
    const { activeDesignStageKey, previousDesignStageKey, designAnimationDirection } = design;
    const [isScrolling, setIsScrolling] = useState(false);
    const [showTopFade, setShowTopFade] = useState(false);
    const [showBottomFade, setShowBottomFade] = useState(true);
    const scrollTimeoutRef = useRef(null);
    
    const updateFades = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const isScrollable = el.scrollHeight > el.clientHeight;
        // A small buffer to prevent the fade from appearing too early
        const buffer = 5;

        setShowTopFade(isScrollable && el.scrollTop > buffer);
        setShowBottomFade(isScrollable && el.scrollTop + el.clientHeight < el.scrollHeight - buffer);
    }, []);


    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            el.scrollTop = 0;
            // A short delay to allow the DOM to update with new content
            // before we check if it's scrollable.
            setTimeout(updateFades, 50); 
        }
    }, [activeDesignStageKey, updateFades]);

    const handleScroll = () => {
        setIsScrolling(true);
        updateFades();

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    };

    return (
        <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-[70vh] overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-base to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showTopFade ? 'opacity-100' : 'opacity-0'}`} />

            {/* Fading overlay for the left side */}
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-8 lg:w-24 bg-gradient-to-r from-bg-base to-transparent pointer-events-none z-20" />
            {/* Fading overlay for the right side */}
            <div className={`hidden md:block absolute top-0 bottom-0 right-0 w-8 lg:w-24 bg-gradient-to-l from-bg-base to-transparent pointer-events-none z-20 transition-opacity duration-300 ${isScrolling ? 'opacity-0' : 'opacity-100'}`} />

            {/* Current Document */}
            <div
                key={activeDesignStageKey}
                className={`w-full h-full absolute inset-0 ${
                    previousDesignStageKey
                        ? designAnimationDirection === 'next'
                            ? 'animate-slide-in-right'
                            : 'animate-slide-in-left'
                        : ''
                }`}
            >
                <DocumentContent ref={scrollContainerRef} stageKey={activeDesignStageKey} onScroll={handleScroll} />
            </div>

            {/* Previous Document (for animation) */}
            {previousDesignStageKey && (
                <div
                    key={previousDesignStageKey}
                    className={`w-full h-full absolute inset-0 ${
                        designAnimationDirection === 'next'
                        ? 'animate-slide-out-left'
                        : 'animate-slide-out-right'
                    }`}
                >
                    <DocumentContent stageKey={previousDesignStageKey} onScroll={handleScroll}/>
                </div>
            )}
            
            <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-base to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showBottomFade ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
};

DesignDocumentView.propTypes = {
    design: PropTypes.shape({
        activeDesignStageKey: PropTypes.oneOf(DESIGN_NAV_ITEMS.map(item => item.name)).isRequired,
        previousDesignStageKey: PropTypes.string,
        designAnimationDirection: PropTypes.string,
    }).isRequired,
};

const DesignChapter = ({
    darkMode,
    design,
    currentDesignStepData,
    showCursorDesignTitle,
    showCursorDesignMainText,
}) => {
    if (design.error) {
        return (
            <div className="w-full text-center text-error">
                <h3 className="text-3xl font-bold mb-4">Error</h3>
                <p className="text-lg">{design.error}</p>
            </div>
        );
    }

    if (design.designView === 'Document') {
        return <DesignDocumentView design={design} />;
    }

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
    previousDesignStageKey: PropTypes.string,
    designAnimationDirection: PropTypes.string,
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