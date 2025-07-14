// src/hooks/useDesignChapter.js

import { useState, useEffect, useCallback, useRef } from 'react';
import { DESIGN_NAV_ITEMS, DESIGN_CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2700;

export const useDesignChapter = (currentChapter) => {
  const [activeDesignStageKey, setActiveDesignStageKey] = useState(DESIGN_NAV_ITEMS[0].name);
  const [currentDesignStepIndex, setCurrentDesignStepIndex] = useState(0);
  const [displayedDesignTitleChars, setDisplayedDesignTitleChars] = useState('');
  const [displayedDesignMainTextChars, setDisplayedDesignMainTextChars] = useState('');
  const [designStepAnimationPhase, setDesignStepAnimationPhase] = useState('typing-title');
  const [isPlayingDesign, setIsPlayingDesign] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navigationMode, setNavigationMode] = useState('manual');
  const [error, setError] = useState(null);
  const [isDesignChapterFinished, setIsDesignChapterFinished] = useState(false);
  const wasPlayingRef = useRef(false);
  const [designView, setDesignView] = useState('Slideshow');
  const [previousDesignStageKey, setPreviousDesignStageKey] = useState(null);
  const [designAnimationDirection, setDesignAnimationDirection] = useState('next');

  useEffect(() => {
    if (previousDesignStageKey !== null) {
      const timer = setTimeout(() => {
        setPreviousDesignStageKey(null);
      }, 400); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [previousDesignStageKey]);

  const resetForStage = useCallback((stageKey, startPlaying = true) => {
    const stageData = DESIGN_CONTENT[stageKey];
    if (!stageData || !stageData.steps || stageData.steps.length === 0) {
      setError(`Content for stage "${stageKey}" is missing or empty.`);
      setIsPlayingDesign(false);
      return;
    }

    setError(null);
    const firstStep = stageData.steps[0];

    if (firstStep) {
      setActiveDesignStageKey(stageKey);
      setCurrentDesignStepIndex(0);
      setDisplayedDesignTitleChars('');
      setDisplayedDesignMainTextChars('');
      setDesignStepAnimationPhase('typing-title');
      setIsPlayingDesign(startPlaying);
      setIsFadingOut(false);
      setIsDesignChapterFinished(false);
    }
  }, []);

  const setStepContent = useCallback((stageKey, stepIndex, shouldPlay = false) => {
    const stageData = DESIGN_CONTENT[stageKey];
    const stepData = stageData?.steps[stepIndex];

    if (stepData) {
      setActiveDesignStageKey(stageKey);
      setCurrentDesignStepIndex(stepIndex);
      setDisplayedDesignTitleChars(stepData.title);
      setDisplayedDesignMainTextChars(stepData.mainText);
      setDesignStepAnimationPhase('pausing-after-maintext');
      setIsPlayingDesign(shouldPlay);
      setIsFadingOut(false);
    }
  }, []);

  const navigateToStage = useCallback((stageKey) => {
    setNavigationMode('manual');
    resetForStage(stageKey, true);
  }, [resetForStage]);

  const nextStep = useCallback(() => {
    setNavigationMode('manual');
    setIsPlayingDesign(false);

    const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
    const isLastStepOfStage = currentDesignStepIndex >= currentStageData.steps.length - 1;
    const isLastStage = activeDesignStageKey === DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;

    if (isLastStepOfStage && isLastStage) {
      setIsDesignChapterFinished(true);
      return;
    }

    if (!isLastStepOfStage) {
      const nextIndex = currentDesignStepIndex + 1;
      setStepContent(activeDesignStageKey, nextIndex, false);
    } else {
      const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      const nextStageKey = DESIGN_NAV_ITEMS[currentNavIndex + 1].name;
      setStepContent(nextStageKey, 0, false);
    }

    return 'success';
  }, [activeDesignStageKey, currentDesignStepIndex, setStepContent]);

  const prevStep = useCallback(() => {
    setNavigationMode('manual');
    setIsPlayingDesign(false);
    setIsDesignChapterFinished(false);

    if (currentDesignStepIndex > 0) {
      const prevIndex = currentDesignStepIndex - 1;
      setStepContent(activeDesignStageKey, prevIndex, false);
    } else {
      const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      if (currentNavIndex > 0) {
        const prevStageKey = DESIGN_NAV_ITEMS[currentNavIndex - 1].name;
        const prevStageData = DESIGN_CONTENT[prevStageKey];
        const lastStepIndex = prevStageData.steps.length - 1;
        setStepContent(prevStageKey, lastStepIndex, false);
      } else {
        return 'navigate-to-main';
      }
    }

    return 'success';
  }, [activeDesignStageKey, currentDesignStepIndex, setStepContent]);

  // New navigation functions for Document View
  const nextDesignStage = useCallback(() => {
    const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex < DESIGN_NAV_ITEMS.length - 1) {
      setDesignAnimationDirection('next');
      setPreviousDesignStageKey(activeDesignStageKey);
      const nextStageKey = DESIGN_NAV_ITEMS[currentIndex + 1].name;
      setActiveDesignStageKey(nextStageKey);
    }
  }, [activeDesignStageKey]);

  const prevDesignStage = useCallback(() => {
    const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex > 0) {
      setDesignAnimationDirection('prev');
      setPreviousDesignStageKey(activeDesignStageKey);
      const prevStageKey = DESIGN_NAV_ITEMS[currentIndex - 1].name;
      setActiveDesignStageKey(prevStageKey);
    }
  }, [activeDesignStageKey]);

  const togglePlayPause = useCallback(() => {
    setIsPlayingDesign(prev => {
      if (!prev) {
        setNavigationMode('automatic');
      }
      return !prev;
    });
  }, []);

  const replay = useCallback(() => {
    setNavigationMode('automatic');
    setIsDesignChapterFinished(false);
    resetForStage(DESIGN_NAV_ITEMS[0].name, true);
  }, [resetForStage]);

  const toggleDesignView = useCallback(() => {
    setDesignView(prevView => (prevView === 'Slideshow' ? 'Document' : 'Slideshow'));
    setIsPlayingDesign(false);
  }, []);

  useEffect(() => {
    if (currentChapter !== 'design') {
      wasPlayingRef.current = isPlayingDesign;
      setIsPlayingDesign(false);
    } else {
      if (!isDesignChapterFinished && designView === 'Slideshow') {
        setDisplayedDesignTitleChars('');
        setDisplayedDesignMainTextChars('');
        setDesignStepAnimationPhase('typing-title');
        setIsPlayingDesign(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, designView]);

  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign || navigationMode !== 'automatic' || designStepAnimationPhase !== 'all-steps-complete' || designView !== 'Slideshow') {
      return;
    }

    const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex >= DESIGN_NAV_ITEMS.length - 1) {
      setIsPlayingDesign(false);
      setIsDesignChapterFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFadingOut(false);
        const nextIndex = currentIndex + 1;
        const nextStageKey = DESIGN_NAV_ITEMS[nextIndex].name;
        resetForStage(nextStageKey, true);
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, isPlayingDesign, designStepAnimationPhase, activeDesignStageKey, resetForStage, navigationMode]);

  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign || designView !== 'Slideshow') return;

    let timer;
    const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
    const currentStepData = currentStageData?.steps[currentDesignStepIndex];

    if (!currentStepData) {
      setDesignStepAnimationPhase('all-steps-complete');
      return;
    }

    switch (designStepAnimationPhase) {
      case 'typing-title':
        if (displayedDesignTitleChars.length < currentStepData.title.length) {
          timer = setTimeout(() => {
            setDisplayedDesignTitleChars(currentStepData.title.substring(0, displayedDesignTitleChars.length + 1));
          }, TYPEWRITER_SPEED);
        } else {
          setDesignStepAnimationPhase('typing-maintext');
        }
        break;

      case 'typing-maintext':
        if (displayedDesignMainTextChars.length < currentStepData.mainText.length) {
          timer = setTimeout(() => {
            setDisplayedDesignMainTextChars(currentStepData.mainText.substring(0, displayedDesignMainTextChars.length + 1));
          }, TYPEWRITER_SPEED);
        } else {
          setDesignStepAnimationPhase('pausing-after-maintext');
        }
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
            setDesignStepAnimationPhase('all-steps-complete');
          }
        }, currentStepData.pause || LONG_PAUSE_DURATION);
        break;

      case 'backspacing-title':
        if (displayedDesignTitleChars.length > 0) {
          timer = setTimeout(() => {
            setDisplayedDesignTitleChars(prev => prev.slice(0, -1));
          }, BACKSPACE_SPEED);
        } else {
          setDesignStepAnimationPhase('typing-title');
        }
        break;

      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [currentChapter, isPlayingDesign, activeDesignStageKey, currentDesignStepIndex, designStepAnimationPhase, displayedDesignTitleChars, displayedDesignMainTextChars, designView]);


  return {
    error,
    activeDesignStageKey,
    currentDesignStepIndex,
    displayedDesignTitleChars,
    displayedDesignMainTextChars,
    designStepAnimationPhase,
    isPlayingDesign,
    isFadingOut,
    isDesignChapterFinished,
    designView,
    previousDesignStageKey,
    designAnimationDirection,
    navigateToStage,
    nextStep,
    prevStep,
    togglePlayPause,
    replay,
    toggleDesignView,
    nextDesignStage,
    prevDesignStage,
  };
};