// src/hooks/useDesignChapter.js

import { useState, useEffect } from 'react';
import { DESIGN_NAV_ITEMS, DESIGN_CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2700;

export const useDesignChapter = (currentChapter, navigatedManually) => {
  const [activeDesignStageKey, setActiveDesignStageKey] = useState(DESIGN_NAV_ITEMS[0].name);
  const [currentDesignStepIndex, setCurrentDesignStepIndex] = useState(0);
  const [displayedDesignTitleChars, setDisplayedDesignTitleChars] = useState('');
  const [displayedDesignMainTextChars, setDisplayedDesignMainTextChars] = useState('');
  const [designStepAnimationPhase, setDesignStepAnimationPhase] = useState('typing-title');
  const [isPlayingDesign, setIsPlayingDesign] = useState(false);

  // Effect 1: Resets Design Chapter step animations. (No changes here)
  useEffect(() => {
    if (navigatedManually.current) {
      navigatedManually.current = false;
      return;
    }
    if (currentChapter !== 'design') return;
    setCurrentDesignStepIndex(0);
    setDisplayedDesignTitleChars('');
    setDisplayedDesignMainTextChars('');
    setDesignStepAnimationPhase('typing-title');
    setIsPlayingDesign(true);
  }, [activeDesignStageKey, currentChapter, navigatedManually]);

  // Effect 2: Typewriter animation for individual steps.
  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign) return () => { };

    let timer;
    const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
    if (!currentStageData || !currentStageData.steps || currentStageData.steps.length === 0) {
      setDesignStepAnimationPhase('all-steps-complete');
      return;
    }
    const currentStepData = currentStageData.steps[currentDesignStepIndex];
    if (!currentStepData) {
      setDesignStepAnimationPhase('all-steps-complete');
      return;
    }

    switch (designStepAnimationPhase) {
      case 'typing-title':
        if (displayedDesignTitleChars.length < currentStepData.title.length) {
          timer = setTimeout(() => setDisplayedDesignTitleChars(currentStepData.title.substring(0, displayedDesignTitleChars.length + 1)), TYPEWRITER_SPEED);
        } else { setDesignStepAnimationPhase('typing-maintext'); }
        break;
      case 'typing-maintext':
        if (displayedDesignMainTextChars.length < currentStepData.mainText.length) {
          timer = setTimeout(() => setDisplayedDesignMainTextChars(currentStepData.mainText.substring(0, displayedDesignMainTextChars.length + 1)), TYPEWRITER_SPEED);
        } else { setDesignStepAnimationPhase('pausing-after-maintext'); }
        break;
      case 'pausing-after-maintext':
        timer = setTimeout(() => {
          if (currentDesignStepIndex < currentStageData.steps.length - 1) {
            const nextStepData = currentStageData.steps[currentDesignStepIndex + 1];
            setCurrentDesignStepIndex(prev => prev + 1);

            if (nextStepData.mainText === currentStepData.mainText) {
              setDesignStepAnimationPhase('backspacing-title');
            } else if (nextStepData.title === currentStepData.title) {
              setDisplayedDesignMainTextChars('');
              setDesignStepAnimationPhase('typing-maintext');
            } else {
              setDisplayedDesignTitleChars('');
              setDisplayedDesignMainTextChars('');
              setDesignStepAnimationPhase('typing-title');
            }
          } else {
            // *** FIXED LOGIC: START ***
            // This is the last step of the current section.
            // Check if this is also the last section of the entire chapter.
            const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
            if (currentIndex >= DESIGN_NAV_ITEMS.length - 1) {
              // If so, stop the animation for good. This is the only place this happens now.
              setIsPlayingDesign(false);
            }
            // Signal that this section's animation is complete.
            setDesignStepAnimationPhase('all-steps-complete');
            // *** FIXED LOGIC: END ***
          }
        }, currentStepData.pause || LONG_PAUSE_DURATION);
        break;
      case 'backspacing-title':
        if (displayedDesignTitleChars.length > 0) {
          timer = setTimeout(() => setDisplayedDesignTitleChars(prev => prev.slice(0, -1)), BACKSPACE_SPEED);
        } else {
          setDesignStepAnimationPhase('typing-title');
        }
        break;
      default: break;
    }
    return () => clearTimeout(timer);
  }, [currentChapter, isPlayingDesign, activeDesignStageKey, currentDesignStepIndex, designStepAnimationPhase, displayedDesignTitleChars, displayedDesignMainTextChars]);

  // Effect 3: Autoplay for chapter.
  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign || designStepAnimationPhase !== 'all-steps-complete') {
      return () => { };
    }

    const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);

    // *** FIXED LOGIC: START ***
    // The conflicting "stop" command was removed.
    // Now we just add a guard to prevent this hook from running after the final section.
    if (currentIndex >= DESIGN_NAV_ITEMS.length - 1) {
      return;
    }
    // *** FIXED LOGIC: END ***

    const currentStageConfig = DESIGN_NAV_ITEMS.find(item => item.name === activeDesignStageKey);
    const pauseDuration = currentStageConfig?.pauseAfter !== undefined ? currentStageConfig.pauseAfter : LONG_PAUSE_DURATION;

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      setActiveDesignStageKey(DESIGN_NAV_ITEMS[nextIndex].name);
    }, pauseDuration);

    return () => clearTimeout(timer);
  }, [currentChapter, isPlayingDesign, designStepAnimationPhase, activeDesignStageKey]);

  return {
    // State values
    activeDesignStageKey,
    currentDesignStepIndex,
    displayedDesignTitleChars,
    displayedDesignMainTextChars,
    designStepAnimationPhase,
    isPlayingDesign,
    // State setters
    setActiveDesignStageKey,
    setCurrentDesignStepIndex,
    setDisplayedDesignTitleChars,
    setDisplayedDesignMainTextChars,
    setDesignStepAnimationPhase,
    setIsPlayingDesign,
  };
};
