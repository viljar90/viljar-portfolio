import { useState, useEffect, useCallback } from 'react';
import { DESIGN_NAV_ITEMS, DESIGN_CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2700;

export const useDesignChapter = (currentChapter) => {
  // Internal state
  const [activeDesignStageKey, setActiveDesignStageKey] = useState(DESIGN_NAV_ITEMS[0].name);
  const [currentDesignStepIndex, setCurrentDesignStepIndex] = useState(0);
  const [displayedDesignTitleChars, setDisplayedDesignTitleChars] = useState('');
  const [displayedDesignMainTextChars, setDisplayedDesignMainTextChars] = useState('');
  const [designStepAnimationPhase, setDesignStepAnimationPhase] = useState('typing-title');
  const [isPlayingDesign, setIsPlayingDesign] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navigationMode, setNavigationMode] = useState('automatic'); // 'automatic' | 'manual'

  // Internal method to reset for new stage
  const resetForStage = useCallback((stageKey, startPlaying = true) => {
    const stageData = DESIGN_CONTENT[stageKey];
    const firstStep = stageData?.steps[0];
    
    if (firstStep) {
      setActiveDesignStageKey(stageKey);
      setCurrentDesignStepIndex(0);
      setDisplayedDesignTitleChars('');
      setDisplayedDesignMainTextChars('');
      setDesignStepAnimationPhase('typing-title');
      setIsPlayingDesign(startPlaying);
      setIsFadingOut(false);
    }
  }, []);

  // Internal method to set content for specific step
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

  // Public API methods
  const navigateToStage = useCallback((stageKey) => {
    setNavigationMode('manual');
    resetForStage(stageKey, true); // Don't auto-start for manual navigation
  }, [resetForStage]);

  const nextStep = useCallback(() => {
    setNavigationMode('manual');
    setIsPlayingDesign(false);
    
    const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
    const isLastStepOfStage = currentDesignStepIndex >= currentStageData.steps.length - 1;
    const isLastStage = activeDesignStageKey === DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
    
    if (isLastStepOfStage && isLastStage) {
      return 'navigate-to-work'; // Signal to App.js to navigate chapters
    }
    
    if (!isLastStepOfStage) {
    // Move to next step in same stage
    const nextIndex = currentDesignStepIndex + 1;
    setStepContent(activeDesignStageKey, nextIndex, false);
} else {
      // Move to first step of next stage
      const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      const nextStageKey = DESIGN_NAV_ITEMS[currentNavIndex + 1].name;
      setStepContent(nextStageKey, 0, false);
    }
    
    return 'success';
  }, [activeDesignStageKey, currentDesignStepIndex, setStepContent]);

  const prevStep = useCallback(() => {
    setNavigationMode('manual');
    setIsPlayingDesign(false);
    
    if (currentDesignStepIndex > 0) {
      // Move to previous step in same stage
      const prevIndex = currentDesignStepIndex - 1;
      setStepContent(activeDesignStageKey, prevIndex, false);
    } else {
      // Move to last step of previous stage
      const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      if (currentNavIndex > 0) {
        const prevStageKey = DESIGN_NAV_ITEMS[currentNavIndex - 1].name;
        const prevStageData = DESIGN_CONTENT[prevStageKey];
        const lastStepIndex = prevStageData.steps.length - 1;
        setStepContent(prevStageKey, lastStepIndex, false);
      } else {
        return 'navigate-to-main'; // Signal to App.js to navigate chapters
      }
    }
    
    return 'success';
  }, [activeDesignStageKey, currentDesignStepIndex, setStepContent]);

  const togglePlayPause = useCallback(() => {
    if (!isPlayingDesign) {
      // Resume from correct phase
      const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
      const currentStepData = currentStageData?.steps[currentDesignStepIndex];
      
      if (currentStepData && displayedDesignTitleChars.length < currentStepData.title.length) {
        setDesignStepAnimationPhase('typing-title');
      } else if (currentStepData && displayedDesignMainTextChars.length < currentStepData.mainText.length) {
        setDesignStepAnimationPhase('typing-maintext');
      } else {
        setDesignStepAnimationPhase('pausing-after-maintext');
      }
    }
    setIsPlayingDesign(prev => !prev);
  }, [isPlayingDesign, activeDesignStageKey, currentDesignStepIndex, displayedDesignTitleChars, displayedDesignMainTextChars]);

  const replay = useCallback(() => {
    setNavigationMode('automatic');
    resetForStage(DESIGN_NAV_ITEMS[0].name, true);
  }, [resetForStage]);

  // Effect 1: Handle chapter transitions
  useEffect(() => {
    if (currentChapter === 'design' && navigationMode === 'automatic') {
      // Only auto-start when entering design chapter in automatic mode
      if (activeDesignStageKey === DESIGN_NAV_ITEMS[0].name && currentDesignStepIndex === 0) {
        setIsPlayingDesign(true);
      }
    } else if (currentChapter !== 'design') {
      setIsPlayingDesign(false);
    }
  }, [currentChapter, navigationMode, activeDesignStageKey, currentDesignStepIndex]);

  // Effect 2: Typewriter animation
  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign) return;
    
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
  }, [currentChapter, isPlayingDesign, activeDesignStageKey, currentDesignStepIndex, designStepAnimationPhase, displayedDesignTitleChars, displayedDesignMainTextChars]);

  // Effect 3: Auto-advance to next stage
  useEffect(() => {
    // Only check if we're playing and completed all steps - don't block based on navigationMode
    if (currentChapter !== 'design' || !isPlayingDesign || designStepAnimationPhase !== 'all-steps-complete') {
      return;
    }
    
    const currentIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex >= DESIGN_NAV_ITEMS.length - 1) {
      setIsPlayingDesign(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFadingOut(false);
        // Reset to automatic mode when auto-advancing
        setNavigationMode('automatic');
        const nextIndex = currentIndex + 1;
        const nextStageKey = DESIGN_NAV_ITEMS[nextIndex].name;
        resetForStage(nextStageKey, true);
      }, 1500);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentChapter, isPlayingDesign, designStepAnimationPhase, activeDesignStageKey, resetForStage]);

  // Public API
  return {
    // State (read-only)
    activeDesignStageKey,
    currentDesignStepIndex,
    displayedDesignTitleChars,
    displayedDesignMainTextChars,
    designStepAnimationPhase,
    isPlayingDesign,
    isFadingOut,
    
    // Methods (actions)
    navigateToStage,
    nextStep,
    prevStep,
    togglePlayPause,
    replay,
  };
};