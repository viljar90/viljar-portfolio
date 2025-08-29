// src/hooks/useLandingChapter.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { MAIN_STAGES, MAIN_NAV_ITEMS, CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2600;
const SLIDE_DURATION = 300;

export const useLandingChapter = (currentChapter, navigatedManually, isAppReady) => {
  const [activeMainStep, setActiveMainStep] = useState(MAIN_STAGES.INSULTS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSubLineIndex, setCurrentSubLineIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState('');
  const [mainAnimationPhase, setMainAnimationPhase] = useState('typing-insult');
  const [displayedNameChars, setDisplayedNameChars] = useState('');
  const [displayedTitleChars, setDisplayedTitleChars] = useState('');
  const [displayedHomeQuestion, setDisplayedHomeQuestion] = useState('');
  const [introStepIndex, setIntroStepIndex] = useState(0);
  const [introGreetingPhase, setIntroGreetingPhase] = useState('typing-greeting');
  const [isSliding, setIsSliding] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLandingChapterFinished, setIsLandingChapterFinished] = useState(false);
  const wasPlayingRef = useRef(true);

  // This hook no longer updates the URL. App.js is now responsible for that.

  const togglePlayPause = useCallback(() => {
    setIsPlaying(p => !p);
  }, []);

  const replayLandingChapter = useCallback(() => {
    navigatedManually.current = false;
    setActiveMainStep(MAIN_STAGES.INSULTS);
    setIsLandingChapterFinished(false);
    setIsPlaying(true);
  }, [navigatedManually]);

  const setStepContent = useCallback((stage, stepIndex, subLineIndex = 0) => {
    navigatedManually.current = true;
    setIsPlaying(false);
    setActiveMainStep(stage);

    if (stage === MAIN_STAGES.INSULTS) {
      setCurrentSubLineIndex(subLineIndex);
      setDisplayedChars(CONTENT.INSULTS.LINES[subLineIndex].text);
      setMainAnimationPhase('pausing-insult');
    } else if (stage === MAIN_STAGES.INTRO) {
      setIntroStepIndex(stepIndex);
      if (stepIndex === -1) { // Special case for the initial greeting
        setDisplayedChars(CONTENT.INTRO.GREETING);
        setDisplayedNameChars('');
        setDisplayedTitleChars('');
        setMainAnimationPhase('intro-greeting');
      } else {
        const stepData = CONTENT.INTRO.steps[stepIndex];
        const titleToSet = stepData.titleParts ? stepData.titleParts.join(' ') : stepData.title;
        setDisplayedNameChars(titleToSet);
        setDisplayedTitleChars(stepData.mainText);
        setDisplayedChars('');
        setMainAnimationPhase('pausing');
      }
    } else if (stage === MAIN_STAGES.HOME) {
      const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];
      const lastTitle = lastIntroStep.titleParts ? lastIntroStep.titleParts.join(' ') : lastIntroStep.title;
      setDisplayedNameChars(lastTitle);
      setDisplayedTitleChars(lastIntroStep.mainText);
      setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION);
      setMainAnimationPhase('home-buttons-appear');
    }
  }, [navigatedManually]);

  const handleNextLine = useCallback(() => {
    if (activeMainStep === MAIN_STAGES.INSULTS) {
      if (currentSubLineIndex < CONTENT.INSULTS.LINES.length - 1) {
        setStepContent(MAIN_STAGES.INSULTS, 0, currentSubLineIndex + 1);
      } else {
        setStepContent(MAIN_STAGES.INTRO, -1);
      }
    } else if (activeMainStep === MAIN_STAGES.INTRO) {
      if (introStepIndex < CONTENT.INTRO.steps.length - 1) {
        setStepContent(MAIN_STAGES.INTRO, introStepIndex + 1);
      } else {
        setStepContent(MAIN_STAGES.HOME, 0);
      }
    } else if (activeMainStep === MAIN_STAGES.HOME) {
      return 'navigate-to-design';
    }
  }, [activeMainStep, currentSubLineIndex, introStepIndex, setStepContent]);

  const handlePrevLine = useCallback(() => {
    if (activeMainStep === MAIN_STAGES.HOME) {
      setStepContent(MAIN_STAGES.INTRO, CONTENT.INTRO.steps.length - 1);
    } else if (activeMainStep === MAIN_STAGES.INTRO) {
      if (introStepIndex > 0) {
        setStepContent(MAIN_STAGES.INTRO, introStepIndex - 1);
      } else {
        setStepContent(MAIN_STAGES.INSULTS, CONTENT.INSULTS.LINES.length - 1);
      }
    } else if (activeMainStep === MAIN_STAGES.INSULTS) {
      if (currentSubLineIndex > 0) {
        setStepContent(MAIN_STAGES.INSULTS, 0, currentSubLineIndex - 1);
      }
    }
  }, [activeMainStep, introStepIndex, currentSubLineIndex, setStepContent]);

  useEffect(() => {
    if (currentChapter !== 'main') {
      wasPlayingRef.current = isPlaying;
      setIsPlaying(false);
    } else {
      if (activeMainStep === MAIN_STAGES.HOME) {
        setMainAnimationPhase('typing-home-question');
        setDisplayedHomeQuestion('');
        setIsPlaying(true);
      } else {
        setIsPlaying(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter]);

  useEffect(() => {
    if (currentChapter !== 'main' || navigatedManually.current) {
        if (navigatedManually.current) navigatedManually.current = false;
        return;
    }
    setCurrentSubLineIndex(0);
    setDisplayedChars('');
    setIntroStepIndex(0);
    setDisplayedNameChars('');
    setDisplayedTitleChars('');
    setDisplayedHomeQuestion('');
    setIntroGreetingPhase('typing-greeting');
    setIsFadingOut(false); 

    if (activeMainStep === MAIN_STAGES.INSULTS) {
      setMainAnimationPhase('typing-insult');
    } else if (activeMainStep === MAIN_STAGES.INTRO) {
      setMainAnimationPhase('intro-greeting');
    } else if (activeMainStep === MAIN_STAGES.HOME) {
      const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];
      const lastTitle = lastIntroStep.titleParts ? lastIntroStep.titleParts.join(' ') : lastIntroStep.title;
      setDisplayedNameChars(lastTitle);
      setDisplayedTitleChars(lastIntroStep.mainText);
      setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION);
      setMainAnimationPhase('typing-home-question');
    }
  }, [activeMainStep, currentChapter, navigatedManually]);

  useEffect(() => {
    if (currentChapter !== 'main' || !isPlaying) return;
    if (mainAnimationPhase === 'insults-done' || mainAnimationPhase === 'intro-done') {
      const currentStepConfig = MAIN_NAV_ITEMS.find(item => item.name === activeMainStep);
      const pauseDuration = currentStepConfig?.pauseAfter !== undefined ? currentStepConfig.pauseAfter : LONG_PAUSE_DURATION;

      const transitionToNextStep = () => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsFadingOut(false);
          navigatedManually.current = false;
          setActiveMainStep(prevActiveStep => {
            const currentIndex = MAIN_NAV_ITEMS.findIndex(item => item.name === prevActiveStep);
            if (currentIndex >= MAIN_NAV_ITEMS.length - 1) {
              setIsPlaying(false);
              return prevActiveStep;
            }
            const nextIndex = (currentIndex + 1);
            return MAIN_NAV_ITEMS[nextIndex].name;
          });
        }, 1500); 
      };

      const timer = setTimeout(transitionToNextStep, pauseDuration);
      return () => clearTimeout(timer);
    }
  }, [mainAnimationPhase, isPlaying, currentChapter, activeMainStep, navigatedManually]);

  useEffect(() => {
    if (currentChapter !== 'main' || !isPlaying) return () => { };
    let timer;

    if (activeMainStep === MAIN_STAGES.INSULTS) {
      const currentLineData = CONTENT.INSULTS.LINES[currentSubLineIndex];
      if (!currentLineData) return;

      if (mainAnimationPhase === 'typing-insult') {
        if (displayedChars.length < currentLineData.text.length) {
          timer = setTimeout(() => setDisplayedChars(currentLineData.text.substring(0, displayedChars.length + 1)), TYPEWRITER_SPEED);
        } else { setMainAnimationPhase('pausing-insult'); }
      } else if (mainAnimationPhase === 'pausing-insult') {
        const pauseDuration = currentLineData.pause || LONG_PAUSE_DURATION;
        timer = setTimeout(() => {
          if (currentSubLineIndex < CONTENT.INSULTS.LINES.length - 1) {
            setCurrentSubLineIndex(prev => prev + 1); setDisplayedChars(''); setMainAnimationPhase('typing-insult');
          } else { setMainAnimationPhase('insults-done'); }
        }, pauseDuration);
      }
    } else if (activeMainStep === MAIN_STAGES.INTRO) {
      if (mainAnimationPhase === 'intro-greeting') {
        if (introGreetingPhase === 'typing-greeting') {
          if (displayedChars.length < CONTENT.INTRO.GREETING.length) {
            timer = setTimeout(() => setDisplayedChars(CONTENT.INTRO.GREETING.substring(0, displayedChars.length + 1)), TYPEWRITER_SPEED);
          } else {
            timer = setTimeout(() => setIntroGreetingPhase('sliding-out'), 1000);
          }
        } else if (introGreetingPhase === 'sliding-out') {
          setIsSliding(true);
          timer = setTimeout(() => {
            setIsSliding(false);
            setDisplayedChars('');
            setIntroGreetingPhase('done');
            setMainAnimationPhase('typing-title');
          }, SLIDE_DURATION);
        }
        return () => clearTimeout(timer);
      }

      const currentStageData = CONTENT.INTRO;
      const currentStepData = currentStageData.steps[introStepIndex];
      if (!currentStepData) return;

      const titleToType = currentStepData.titleParts ? currentStepData.titleParts.join(' ') : currentStepData.title;

      switch (mainAnimationPhase) {
        case 'typing-title':
          if (displayedNameChars.length < titleToType.length) {
            timer = setTimeout(() => setDisplayedNameChars(titleToType.substring(0, displayedNameChars.length + 1)), TYPEWRITER_SPEED);
          } else { setMainAnimationPhase('typing-maintext'); }
          break;
        case 'typing-maintext':
          if (displayedTitleChars.length < currentStepData.mainText.length) {
            timer = setTimeout(() => setDisplayedTitleChars(currentStepData.mainText.substring(0, displayedTitleChars.length + 1)), TYPEWRITER_SPEED);
          } else { setMainAnimationPhase('pausing'); }
          break;
        case 'pausing':
          timer = setTimeout(() => {
            if (introStepIndex < currentStageData.steps.length - 1) {
              const nextStepData = currentStageData.steps[introStepIndex + 1];
              const nextTitleToType = nextStepData.titleParts ? nextStepData.titleParts.join(' ') : nextStepData.title;
              setIntroStepIndex(prev => prev + 1);
              if (nextStepData.mainText === currentStepData.mainText) {
                setMainAnimationPhase('backspacing-title');
              } else if (nextTitleToType === titleToType) {
                setDisplayedTitleChars('');
                setMainAnimationPhase('typing-maintext');
              } else {
                setDisplayedNameChars('');
                setDisplayedTitleChars('');
                setMainAnimationPhase('typing-title');
              }
            } else {
              setMainAnimationPhase('intro-done');
            }
          }, currentStepData.pause || LONG_PAUSE_DURATION);
          break;
        case 'backspacing-title':
          if (displayedNameChars.length > 0) {
            timer = setTimeout(() => setDisplayedNameChars(prev => prev.slice(0, -1)), BACKSPACE_SPEED);
          } else { setMainAnimationPhase('typing-title'); }
          break;
        default: break;
      }

    } else if (activeMainStep === MAIN_STAGES.HOME) {
      if (mainAnimationPhase === 'typing-home-question') {
        if (displayedHomeQuestion.length < CONTENT.INTRO.QUESTION.length) {
          timer = setTimeout(() => setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION.substring(0, displayedHomeQuestion.length + 1)), TYPEWRITER_SPEED);
        } else {
          setMainAnimationPhase('home-buttons-appear');
        }
      } else if (mainAnimationPhase === 'home-buttons-appear') {
        setIsPlaying(false);
        setIsLandingChapterFinished(true); // Mark as finished
      }
    }
    return () => clearTimeout(timer);
  }, [activeMainStep, mainAnimationPhase, displayedChars, currentSubLineIndex, displayedNameChars, displayedTitleChars, displayedHomeQuestion, isPlaying, currentChapter, introStepIndex, introGreetingPhase]);

  return {
    activeMainStep,
    isPlaying,
    isFadingOut,
    isLandingChapterFinished,
    currentSubLineIndex,
    displayedChars,
    mainAnimationPhase,
    displayedNameChars,
    displayedTitleChars,
    displayedHomeQuestion,
    introStepIndex,
    isSliding,
    togglePlayPause,
    replayLandingChapter,
    handleNextLine,
    handlePrevLine,
    setActiveMainStep, 
    setIsPlaying, 
  };
};