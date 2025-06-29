import React from 'react';
import { BlinkingCursor } from './uiElements';

const DesignChapter = ({
    darkMode,
    currentDesignStepData,
    displayedDesignTitleChars,
    showCursorDesignTitle,
    displayedDesignMainTextChars,
    showCursorDesignMainText,
}) => {
    // *** FIXED LOGIC: Added responsive text sizes for consistency ***
    const designStepTitleStyle = `text-4xl sm:text-5xl lg:text-6xl font-bold ${darkMode ? 'text-sky-300' : 'text-sky-500'} mb-6 min-h-[1.2em] whitespace-pre-line`;
    const designChapterMainTextStyle = `text-2xl sm:text-3xl lg:text-4xl font-light ${darkMode ? 'text-slate-100' : 'text-slate-200'} mt-2 min-h-[5em]`;

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
                {displayedDesignTitleChars}
                {showCursorDesignTitle && <BlinkingCursor sizeClass="h-10 md:h-12 lg:h-14" />}
            </h3>
            <p className={designChapterMainTextStyle} style={{ whiteSpace: 'pre-line' }}>
                {displayedDesignMainTextChars}
                {showCursorDesignMainText && <BlinkingCursor sizeClass="h-7 md:h-9 lg:h-10" />}
            </p>
        </div>
    );
};

export default DesignChapter;