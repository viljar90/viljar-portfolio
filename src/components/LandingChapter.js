// src/components/LandingChapter.js

import React from 'react';
import { BlinkingCursor } from './uiElements';
import { MAIN_STAGES, CONTENT } from '../content';

const LandingChapter = ({
    darkMode,
    activeMainStep,
    mainAnimationPhase,
    isSliding,
    displayedChars,
    showCursorInsults,
    showCursorIntroGreeting,
    displayedNameChars,
    showCursorIntroName,
    displayedTitleChars,
    showCursorIntroTitle,
    displayedHomeQuestion,
    showCursorHomeQuestion,
    onNavigateToChapter
}) => {

    const genMainTextStyle = "text-4xl md:text-5xl lg:text-6xl font-semibold text-center min-h-[1.5em]";
    const genNameTextStyle = `font-semibold text-4xl md:text-5xl lg:text-6xl ${darkMode ? 'text-sky-400' : 'text-sky-600'} pt-2 min-h-[3.5rem] md:min-h-[4.5rem] lg:min-h-[5.5rem]`;
    const genTitleSubTextStyle = `font-semibold text-2xl md:text-3xl lg:text-4xl text-slate-100 dark:text-slate-300 min-h-[1.5em]`;
    const SLIDE_DURATION = 300; // This is needed for the animation class

    if (activeMainStep === MAIN_STAGES.INSULTS) {
        return <p className={`${genMainTextStyle} text-slate-100 dark:text-slate-200`}>{displayedChars}{showCursorInsults && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}</p>;
    }
    if (activeMainStep === MAIN_STAGES.INTRO) {
        if (mainAnimationPhase === 'intro-greeting' && mainAnimationPhase !== 'done') {
            return <p className={`${genMainTextStyle} text-slate-100 dark:text-slate-200 ${isSliding ? `animate-[slideOutRightAndFade_${SLIDE_DURATION}ms_ease-in-out_forwards]` : ''}`}>{displayedChars}{showCursorIntroGreeting && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}</p>;
        }
        return (
            <div className="text-center">
                <p className={genNameTextStyle}>{displayedNameChars}{showCursorIntroName && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}</p>
                <p className={genTitleSubTextStyle}>{displayedTitleChars}{showCursorIntroTitle && <BlinkingCursor sizeClass="h-6 md:h-7 lg:h-8" />}</p>
            </div>
        );
    }
    if (activeMainStep === MAIN_STAGES.HOME) {
        return (
            <div className="text-center">
                <p className={genNameTextStyle}>{displayedNameChars}</p>
                <p className={genTitleSubTextStyle}>{displayedTitleChars}</p>
                <div className="mt-6 md:mt-8 animate-fadeIn">
                    <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 dark:text-slate-300 mb-6 md:mb-8">{displayedHomeQuestion}{showCursorHomeQuestion && <BlinkingCursor sizeClass="h-5 md:h-6 lg:h-7" />}</p>
                    {mainAnimationPhase === 'home-buttons-appear' && (
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            {CONTENT.HOME.BUTTON_OPTIONS.map((btnText) => (
                                <button key={btnText} onClick={() => { if (btnText === "Design") onNavigateToChapter('design'); else console.log(`${btnText} clicked!`); }}
                                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 w-full sm:w-auto text-sm md:text-base"
                                >{btnText}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return <div className={`${genMainTextStyle} opacity-0`}>&nbsp;</div>;
};

export default LandingChapter;