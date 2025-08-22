// src/components/LandingChapter.js

import React from 'react';
import { BlinkingCursor, PotatoIcon, WavingHandIcon, PrimaryButton } from './uiElements';
import { MAIN_STAGES, CONTENT } from '../content';
import PropTypes from 'prop-types';

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
    onNavigateToChapter,
    landing,
}) => {

    const genMainTextStyle = "text-4xl md:text-5xl lg:text-6xl font-semibold text-center min-h-[1.5em]";
    const genNameTextStyle = `font-semibold text-4xl md:text-5xl lg:text-6xl text-primary dark:text-secondary pt-2 min-h-[3.5rem] md:min-h-[4.5rem] lg:min-h-[5.5rem]`;
    const genTitleSubTextStyle = `font-semibold text-2xl md:text-3xl lg:text-4xl text-text-base min-h-[1.5em]`;
    const SLIDE_DURATION = 300;

    if (activeMainStep === MAIN_STAGES.INSULTS) {
        return <p className={`${genMainTextStyle} text-text-base`}>{displayedChars}{showCursorInsults && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}</p>;
    }
    if (activeMainStep === MAIN_STAGES.INTRO) {
        const isIntroPhase = ['intro-greeting', 'typing-title', 'typing-maintext', 'pausing', 'backspacing-title', 'intro-done'].includes(mainAnimationPhase);
        if (!isIntroPhase) {
            return (
                <div className="text-center">
                    <p className={genNameTextStyle}>&nbsp;</p>
                    <p className={genTitleSubTextStyle}>&nbsp;</p>
                </div>
            );
        }

        if (mainAnimationPhase === 'intro-greeting' && mainAnimationPhase !== 'done') {
            return <p className={`${genMainTextStyle} text-text-base ${isSliding ? `animate-[slideOutRightAndFade_${SLIDE_DURATION}ms_ease-in-out_forwards]` : ''}`}>{displayedChars}{showCursorIntroGreeting && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}</p>;
        }

        const currentStepData = CONTENT.INTRO.steps[landing.introStepIndex];
        const isTyping = showCursorIntroName;
        const showPotatoIcon = !isTyping && currentStepData?.icon === 'potato' && currentStepData.titleParts;
        const showWaveIcon = !isTyping && currentStepData?.icon === 'wave' && currentStepData.titleParts;
        
        return (
            <div className="text-center">
                <p className={genNameTextStyle}>
                  {showPotatoIcon ? (
                    <span className="flex items-center justify-center gap-x-2 md:gap-x-3">
                      {currentStepData.titleParts[0]}
                      <PotatoIcon className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 text-text-base" />
                      {currentStepData.titleParts[1]}
                    </span>
                  ) : showWaveIcon ? (
                    <span className="flex items-center justify-center gap-x-2 md:gap-x-3">
                      {currentStepData.titleParts[0]}
                      <WavingHandIcon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-text-base animate-wave" style={{ transformOrigin: '70% 70%' }} />
                    </span>
                  ) : (
                    <>
                      {displayedNameChars}
                      {showCursorIntroName && <BlinkingCursor sizeClass="h-8 md:h-10 lg:h-12" />}
                    </>
                  )}
                </p>
                <p className={genTitleSubTextStyle}>{displayedTitleChars}{showCursorIntroTitle && <BlinkingCursor sizeClass="h-6 md:h-7 lg:h-8" />}</p>
            </div>
        );
    }
    if (activeMainStep === MAIN_STAGES.HOME) {
        const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];

        return (
            <div className="text-center">
                <p className={genNameTextStyle}>
                    {lastIntroStep?.icon === 'potato' && lastIntroStep.titleParts ? (
                        <span className="flex items-center justify-center gap-x-2 md:gap-x-3">
                            {lastIntroStep.titleParts[0]}
                            <PotatoIcon className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 text-text-base animate-jump-bounce-home" />
                            {lastIntroStep.titleParts[1]}
                        </span>
                    ) : (
                        displayedNameChars
                    )}
                </p>
                <p className={genTitleSubTextStyle}>{displayedTitleChars}</p>
                <div className="mt-6 md:mt-8 animate-fadeIn">
                    <p className="text-xl md:text-2xl lg:text-3xl text-text-muted mb-6 md:mb-8">{displayedHomeQuestion}{showCursorHomeQuestion && <BlinkingCursor sizeClass="h-5 md:h-6 lg:h-7" />}</p>
                    {mainAnimationPhase === 'home-buttons-appear' && (
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            {CONTENT.HOME.BUTTON_OPTIONS.map((btnText) => (
                                <PrimaryButton
                                    key={btnText}
                                    onClick={() => {
                                        if (btnText === "Design") onNavigateToChapter('design');
                                        else if (btnText === "My Work") onNavigateToChapter('work');
                                        else if (btnText === "Me") onNavigateToChapter('me'); // This is the change
                                    }}
                                >
                                    {btnText}
                                </PrimaryButton>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return <div className={`${genMainTextStyle} opacity-0`}>&nbsp;</div>;
};

LandingChapter.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  activeMainStep: PropTypes.string.isRequired,
  mainAnimationPhase: PropTypes.string.isRequired,
  isSliding: PropTypes.bool.isRequired,
  displayedChars: PropTypes.string.isRequired,
  showCursorInsults: PropTypes.bool.isRequired,
  showCursorIntroGreeting: PropTypes.bool.isRequired,
  displayedNameChars: PropTypes.string.isRequired,
  showCursorIntroName: PropTypes.bool.isRequired,
  displayedTitleChars: PropTypes.string.isRequired,
  showCursorIntroTitle: PropTypes.bool.isRequired,
  displayedHomeQuestion: PropTypes.string.isRequired,
  showCursorHomeQuestion: PropTypes.bool.isRequired,
  onNavigateToChapter: PropTypes.func.isRequired,
  landing: PropTypes.object.isRequired,
};

export default LandingChapter;