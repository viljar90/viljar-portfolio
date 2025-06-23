// src/hooks/useLandingChapter.js

import { useState, useEffect } from 'react';
import { MAIN_STAGES, MAIN_NAV_ITEMS, CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2600;
const SLIDE_DURATION = 300;

export const useLandingChapter = (currentChapter, navigatedManually) => {
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

  // Effect 1 (previously Effect 3 in App.js): Resets content when active step changes
  useEffect(() => {
    if (currentChapter !== 'main') return;
    if (navigatedManually.current) {
      navigatedManually.current = false;
      return;
    }
    setCurrentSubLineIndex(0);
    setDisplayedChars('');
    setIntroStepIndex(0);
    setDisplayedNameChars('');
    setDisplayedTitleChars('');
    setDisplayedHomeQuestion('');
    setIntroGreetingPhase('typing-greeting');

    if (activeMainStep === MAIN_STAGES.INSULTS) {
      setMainAnimationPhase('typing-insult');
    } else if (activeMainStep === MAIN_STAGES.INTRO) {
      setMainAnimationPhase('intro-greeting');
    } else if (activeMainStep === MAIN_STAGES.HOME) {
      const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];
      setDisplayedNameChars(lastIntroStep.title);
      setDisplayedTitleChars(lastIntroStep.mainText);
      setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION);
      setMainAnimationPhase('typing-home-question');
    }
  }, [activeMainStep, currentChapter, navigatedManually]);

  // Effect 2 (previously Effect 4 in App.js): Auto-play for chapter
  useEffect(() => {
    if (currentChapter !== 'main' || !isPlaying) return;
    if (mainAnimationPhase === 'insults-done' || mainAnimationPhase === 'intro-done') {
      navigatedManually.current = false;
      const transitionToNextStep = () => {
        setActiveMainStep(prevActiveStep => {
          const currentIndex = MAIN_NAV_ITEMS.findIndex(item => item.name === prevActiveStep);
          if (currentIndex >= MAIN_NAV_ITEMS.length - 1) {
            setIsPlaying(false);
            return prevActiveStep;
          }
          const nextIndex = (currentIndex + 1);
          return MAIN_NAV_ITEMS[nextIndex].name;
        });
      };
      const currentStepConfig = MAIN_NAV_ITEMS.find(item => item.name === activeMainStep);
      const pauseDuration = currentStepConfig?.pauseAfter !== undefined ? currentStepConfig.pauseAfter : LONG_PAUSE_DURATION;
      const timer = setTimeout(transitionToNextStep, pauseDuration);
      return () => clearTimeout(timer);
    }
  }, [mainAnimationPhase, isPlaying, currentChapter, activeMainStep, navigatedManually]);

  // Effect 3 (previously Effect 5 in App.js): Typewriter and animation logic
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

      switch (mainAnimationPhase) {
        case 'typing-title':
          if (displayedNameChars.length < currentStepData.title.length) {
            timer = setTimeout(() => setDisplayedNameChars(currentStepData.title.substring(0, displayedNameChars.length + 1)), TYPEWRITER_SPEED);
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
              setIntroStepIndex(prev => prev + 1);
              if (nextStepData.mainText === currentStepData.mainText) {
                setMainAnimationPhase('backspacing-title');
              } else if (nextStepData.title === currentStepData.title) {
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
      }
    }
    return () => clearTimeout(timer);
  }, [activeMainStep, mainAnimationPhase, displayedChars, currentSubLineIndex, displayedNameChars, displayedTitleChars, displayedHomeQuestion, isPlaying, currentChapter, introStepIndex, introGreetingPhase]);

  return {
    // State values
    activeMainStep,
    isPlaying,
    currentSubLineIndex,
    displayedChars,
    mainAnimationPhase,
    displayedNameChars,
    displayedTitleChars,
    displayedHomeQuestion,
    introStepIndex,
    isSliding,
    // State setters
    setActiveMainStep,
    setIsPlaying,
    setCurrentSubLineIndex,
    setDisplayedChars,
    setMainAnimationPhase,
    setDisplayedNameChars,
    setDisplayedTitleChars,
    setDisplayedHomeQuestion,
    setIntroStepIndex,
    setIntroGreetingPhase,
  };
};