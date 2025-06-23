// src/App.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
// import LiquidGlass from 'liquid-glass-react'; // <-- REMOVED
import {
  MAIN_STAGES,
  MAIN_NAV_ITEMS,
  CONTENT,
  // DESIGN_STAGE_KEYS, // <-- REMOVED
  DESIGN_NAV_ITEMS,
  DESIGN_CONTENT,
} from './content';
import {
    PlayIcon,
    PauseIcon,
    ReplayIcon,
    PrevArrowIcon,
    NextArrowIcon,
    InteractiveOblongNavItem
} from './components/uiElements';
import LandingChapter from './components/LandingChapter';
import DesignChapter from './components/DesignChapter';
import { useLandingChapter } from './hooks/useLandingChapter';
import { useDesignChapter } from './hooks/useDesignChapter';


// --- Animation Configuration ---
const ANIMATION_DURATION_CHAPTER = "0.5s";

// --- Keyframes for CSS Animations ---
const animationKeyframes = `
  @keyframes blinker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes slideOutRightAndFade {
    from { transform: translateX(0%); opacity: 1; }
    to { transform: translateX(50%); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUpIn {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideDownOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100%); opacity: 0; }
  }

  /* --- CSS for Nav Fade Effect --- */
  .fade-right {
    -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
    mask-image: linear-gradient(to right, black 90%, transparent 100%);
  }
  .fade-left {
    -webkit-mask-image: linear-gradient(to left, black 90%, transparent 100%);
    mask-image: linear-gradient(to left, black 90%, transparent 100%);
  }
  .fade-both {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  
  /* --- Hide Scrollbar CSS --- */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- Main App Component ---
function App() {
  // --- Top-Level State ---
  const [darkMode, setDarkMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('main');

  // --- NEW: State for Nav Bar Fade Effect ---
  const [navFadeClass, setNavFadeClass] = useState('');

  // --- Shared Refs ---
  const mainChapterRef = useRef(null);
  const designChapterRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mainItemRefs = useRef([]);
  const designItemRefs = useRef([]);
  const navigatedManually = useRef(false);

  // --- Logic Hooks ---
  const landing = useLandingChapter(currentChapter, navigatedManually);
  const design = useDesignChapter(currentChapter, navigatedManually);

  // --- Chapter Animation Classes ---
  const [mainChapterAnimClass, setMainChapterAnimClass] = useState(`animate-[slideUpIn_${ANIMATION_DURATION_CHAPTER}_ease-out_forwards]`);
  const [designChapterAnimClass, setDesignChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');

  // --- useEffect Hooks ---

  // Effect 1: Manages chapter slide transitions
  useEffect(() => {
    const duration = ANIMATION_DURATION_CHAPTER;
    if (currentChapter === 'design') {
      setMainChapterAnimClass(`animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`);
      setDesignChapterAnimClass(`animate-[slideUpIn_${duration}_ease-out_forwards]`);
    } else if (currentChapter === 'main') {
      setDesignChapterAnimClass(`animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`);
      setMainChapterAnimClass(`animate-[slideUpIn_${duration}_ease-out_forwards]`);
    }
  }, [currentChapter]);

  // Effect 2: Manages pause/resume on chapter scroll
  useEffect(() => {
    if (currentChapter === 'design') {
      landing.setIsPlaying(false);
      const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
      const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
      const isDesignChapterFinal = design.activeDesignStageKey === lastDesignStageKey && design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
      if (!isDesignChapterFinal) {
        design.setIsPlayingDesign(true);
      }
    } else if (currentChapter === 'main') {
      design.setIsPlayingDesign(false);
      if (landing.activeMainStep !== MAIN_STAGES.HOME) {
        landing.setIsPlaying(true);
      } else {
        // When returning to the main chapter on the final 'Home' step,
        // ensure the animation is paused and the buttons are visible.
        landing.setIsPlaying(false);
        landing.setMainAnimationPhase('home-buttons-appear');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter]);


  // Effect 3: Intersection Observer for detecting visible chapter
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newChapter = entry.target === mainChapterRef.current ? 'main' : 'design';
          if (currentChapter !== newChapter) {
            setCurrentChapter(newChapter);
          }
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const mainRefCurrent = mainChapterRef.current;
    const designRefCurrent = designChapterRef.current;
    if (mainRefCurrent) observer.observe(mainRefCurrent);
    if (designRefCurrent) observer.observe(designRefCurrent);
    return () => {
      if (mainRefCurrent) observer.unobserve(mainRefCurrent);
      if (designRefCurrent) observer.unobserve(designRefCurrent);
    };
  }, [currentChapter]);


  // Effect 4: Stepper Auto-scroll (Main and Design)
  useEffect(() => {
    const items = currentChapter === 'main' ? MAIN_NAV_ITEMS : DESIGN_NAV_ITEMS;
    const activeStepOrStage = currentChapter === 'main' ? landing.activeMainStep : design.activeDesignStageKey;
    const refs = currentChapter === 'main' ? mainItemRefs : designItemRefs;
    if (!Array.isArray(refs.current)) refs.current = [];
    refs.current = refs.current.slice(0, items.length);
    const activeIndex = items.findIndex(item => item.name === activeStepOrStage);
    if (activeIndex === -1 || !refs.current[activeIndex] || !scrollContainerRef.current) return;
    const activeElement = refs.current[activeIndex];
    if (activeElement && typeof activeElement.scrollIntoView === 'function') {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) entry.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        observer.disconnect();
      }, { root: scrollContainerRef.current, threshold: 1.0 });
      observer.observe(activeElement);
      return () => observer.disconnect();
    }
  }, [landing.activeMainStep, design.activeDesignStageKey, currentChapter]);

  // --- Event Handler Functions ---
  const navItemsToDisplay = currentChapter === 'main' ? MAIN_NAV_ITEMS : DESIGN_NAV_ITEMS;

  // --- NEW: Function and Effect for Nav Fade ---
  const updateNavFade = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    if (!hasOverflow) {
        setNavFadeClass('');
        return;
    }

    const atStart = el.scrollLeft < 10;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

    if (atStart && !atEnd) setNavFadeClass('fade-right');
    else if (!atStart && atEnd) setNavFadeClass('fade-left');
    else if (!atStart && !atEnd) setNavFadeClass('fade-both');
    else setNavFadeClass('');

  }, []);

  useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
  
      updateNavFade(); // Initial check
  
      scrollContainer.addEventListener('scroll', updateNavFade);
      const resizeObserver = new ResizeObserver(updateNavFade);
      resizeObserver.observe(scrollContainer);
  
      return () => {
          scrollContainer.removeEventListener('scroll', updateNavFade);
          resizeObserver.disconnect();
      };
  }, [updateNavFade, navItemsToDisplay]); // Re-check when chapter changes

  const navigateToChapter = (chapterName) => {
    // We no longer set the chapter state here.
    // We let the IntersectionObserver handle it when the scroll completes.
    // if (currentChapter !== chapterName) setCurrentChapter(chapterName);
    
    setTimeout(() => {
      const targetRef = chapterName === 'main' ? mainChapterRef.current : designChapterRef.current;
      if (targetRef) targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleNextLine = () => {
    landing.setIsPlaying(false);
    design.setIsPlayingDesign(false);
    navigatedManually.current = true;
  
    if (currentChapter === 'main') {
      if (landing.activeMainStep === MAIN_STAGES.INSULTS) {
        if (landing.currentSubLineIndex < CONTENT.INSULTS.LINES.length - 1) {
          const nextIndex = landing.currentSubLineIndex + 1;
          landing.setCurrentSubLineIndex(nextIndex);
          landing.setDisplayedChars(CONTENT.INSULTS.LINES[nextIndex].text);
          landing.setMainAnimationPhase('pausing');
        } else {
          landing.setActiveMainStep(MAIN_STAGES.INTRO);
          landing.setMainAnimationPhase('intro-greeting');
          landing.setDisplayedChars(CONTENT.INTRO.GREETING);
          landing.setIntroStepIndex(0);
        }
      } else if (landing.activeMainStep === MAIN_STAGES.INTRO) {
        if (landing.mainAnimationPhase === 'intro-greeting') {
          landing.setMainAnimationPhase('pausing');
          const firstStep = CONTENT.INTRO.steps[0];
          landing.setDisplayedNameChars(firstStep.title);
          landing.setDisplayedTitleChars(firstStep.mainText);
        } else if (landing.introStepIndex < CONTENT.INTRO.steps.length - 1) {
          const nextIndex = landing.introStepIndex + 1;
          const nextStep = CONTENT.INTRO.steps[nextIndex];
          landing.setIntroStepIndex(nextIndex);
          landing.setDisplayedNameChars(nextStep.title);
          landing.setDisplayedTitleChars(nextStep.mainText);
        } else {
          landing.setActiveMainStep(MAIN_STAGES.HOME);
          const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];
          landing.setDisplayedNameChars(lastIntroStep.title);
          landing.setDisplayedTitleChars(lastIntroStep.mainText);
          landing.setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION);
          landing.setMainAnimationPhase('home-buttons-appear');
        }
      } else if (landing.activeMainStep === MAIN_STAGES.HOME) {
        navigateToChapter('design');
      }
    } else { 
      const currentStageData = DESIGN_CONTENT[design.activeDesignStageKey];
      const isLastStepOfStage = design.currentDesignStepIndex >= currentStageData.steps.length - 1;
      const isLastStage = design.activeDesignStageKey === DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
  
      if (isLastStepOfStage && isLastStage) return;
      
      if (!isLastStepOfStage) {
        const nextIndex = design.currentDesignStepIndex + 1;
        const nextStep = currentStageData.steps[nextIndex];
        design.setCurrentDesignStepIndex(nextIndex);
        design.setDisplayedDesignTitleChars(nextStep.title);
        design.setDisplayedDesignMainTextChars(nextStep.mainText);
        design.setDesignStepAnimationPhase('pausing-after-maintext');
      } else {
        const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === design.activeDesignStageKey);
        const nextStageKey = DESIGN_NAV_ITEMS[currentNavIndex + 1].name;
        const nextStageData = DESIGN_CONTENT[nextStageKey];
        
        design.setActiveDesignStageKey(nextStageKey);
        design.setCurrentDesignStepIndex(0);
        design.setDisplayedDesignTitleChars(nextStageData.steps[0].title);
        design.setDisplayedDesignMainTextChars(nextStageData.steps[0].mainText);
        design.setDesignStepAnimationPhase('pausing-after-maintext');
      }
    }
  };
  
  const handlePrevLine = () => {
    landing.setIsPlaying(false);
    design.setIsPlayingDesign(false);
    navigatedManually.current = true;
  
    if (currentChapter === 'main') {
      if (landing.activeMainStep === MAIN_STAGES.HOME) {
        landing.setActiveMainStep(MAIN_STAGES.INTRO);
        const lastIntroStepIndex = CONTENT.INTRO.steps.length - 1;
        const lastIntroStep = CONTENT.INTRO.steps[lastIntroStepIndex];
        landing.setIntroStepIndex(lastIntroStepIndex);
        landing.setDisplayedNameChars(lastIntroStep.title);
        landing.setDisplayedTitleChars(lastIntroStep.mainText);
        landing.setMainAnimationPhase('pausing');
      } else if (landing.activeMainStep === MAIN_STAGES.INTRO) {
        if (landing.introStepIndex === 0 && landing.mainAnimationPhase !== 'intro-greeting') {
            landing.setMainAnimationPhase('intro-greeting');
            landing.setDisplayedChars(CONTENT.INTRO.GREETING);
            landing.setDisplayedNameChars('');
            landing.setDisplayedTitleChars('');
        } else if (landing.introStepIndex > 0) {
            const prevIndex = landing.introStepIndex - 1;
            const prevStep = CONTENT.INTRO.steps[prevIndex];
            landing.setIntroStepIndex(prevIndex);
            landing.setDisplayedNameChars(prevStep.title);
            landing.setDisplayedTitleChars(prevStep.mainText);
            landing.setMainAnimationPhase('pausing');
        } else {
            landing.setActiveMainStep(MAIN_STAGES.INSULTS);
            const lastInsultIndex = CONTENT.INSULTS.LINES.length - 1;
            landing.setCurrentSubLineIndex(lastInsultIndex);
            landing.setDisplayedChars(CONTENT.INSULTS.LINES[lastInsultIndex].text);
            landing.setMainAnimationPhase('pausing');
        }
      } else if (landing.activeMainStep === MAIN_STAGES.INSULTS) {
        if (landing.currentSubLineIndex > 0) {
          const prevIndex = landing.currentSubLineIndex - 1;
          landing.setCurrentSubLineIndex(prevIndex);
          landing.setDisplayedChars(CONTENT.INSULTS.LINES[prevIndex].text);
          landing.setMainAnimationPhase('pausing');
        }
      }
    } else { // Design Chapter
      if (design.currentDesignStepIndex > 0) {
        const prevIndex = design.currentDesignStepIndex - 1;
        const prevStep = DESIGN_CONTENT[design.activeDesignStageKey].steps[prevIndex];
        design.setCurrentDesignStepIndex(prevIndex);
        design.setDisplayedDesignTitleChars(prevStep.title);
        design.setDisplayedDesignMainTextChars(prevStep.mainText);
        design.setDesignStepAnimationPhase('pausing-after-maintext');
      } else {
        const currentNavIndex = DESIGN_NAV_ITEMS.findIndex(item => item.name === design.activeDesignStageKey);
        if (currentNavIndex > 0) {
          const prevStageKey = DESIGN_NAV_ITEMS[currentNavIndex - 1].name;
          const prevStageData = DESIGN_CONTENT[prevStageKey];
          const lastStepIndex = prevStageData.steps.length - 1;
          design.setActiveDesignStageKey(prevStageKey);
          design.setCurrentDesignStepIndex(lastStepIndex);
          design.setDisplayedDesignTitleChars(prevStageData.steps[lastStepIndex].title);
          design.setDisplayedDesignMainTextChars(prevStageData.steps[lastStepIndex].mainText);
          design.setDesignStepAnimationPhase('pausing-after-maintext');
        }
      }
    }
  };

  const handleMainStepperItemClick = useCallback((itemName) => {
    if (currentChapter !== 'main') return;
    navigatedManually.current = false;
    
    if (itemName === MAIN_STAGES.HOME && landing.activeMainStep === MAIN_STAGES.HOME) {
      const lastIntroStep = CONTENT.INTRO.steps[CONTENT.INTRO.steps.length - 1];
      landing.setDisplayedNameChars(lastIntroStep.title);
      landing.setDisplayedTitleChars(lastIntroStep.mainText);
      landing.setDisplayedHomeQuestion(CONTENT.INTRO.QUESTION);
      landing.setMainAnimationPhase('home-buttons-appear');
      landing.setIsPlaying(false);
      return;
    }
    
    if (itemName === landing.activeMainStep) {
      landing.setActiveMainStep('');
      setTimeout(() => {
        landing.setActiveMainStep(itemName);
        landing.setIsPlaying(true);
      }, 0);
    } else {
      landing.setActiveMainStep(itemName);
      landing.setIsPlaying(true);
    }
  }, [currentChapter, landing]);

  const handleDesignStepperItemClick = useCallback((stageKey) => {
    if (currentChapter !== 'design') return;
    navigatedManually.current = false;

    if (stageKey === design.activeDesignStageKey) {
      design.setActiveDesignStageKey('');
      setTimeout(() => {
        design.setActiveDesignStageKey(stageKey)
        design.setIsPlayingDesign(true);
      }, 0);
    } else {
      design.setActiveDesignStageKey(stageKey);
    }
  }, [currentChapter, design]);

  const togglePlayPause = () => {
    if (currentChapter === 'main') {
      if (!landing.isPlaying) {
        if (landing.activeMainStep === MAIN_STAGES.INSULTS) landing.setMainAnimationPhase('pausing-insult');
        else if (landing.activeMainStep === MAIN_STAGES.INTRO) landing.setMainAnimationPhase('pausing');
      }
      landing.setIsPlaying(p => !p);
    } else if (currentChapter === 'design') {
      if (!design.isPlayingDesign) {
        design.setDesignStepAnimationPhase('pausing-after-maintext');
      }
      design.setIsPlayingDesign(p => !p);
    }
  };

  const handleReplayChapter = () => {
    navigatedManually.current = false;
    if (currentChapter === 'main') {
      landing.setActiveMainStep(MAIN_STAGES.INSULTS);
      landing.setIsPlaying(true);
    } else if (currentChapter === 'design') {
      design.setActiveDesignStageKey(DESIGN_NAV_ITEMS[0].name);
      design.setIsPlayingDesign(true);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  // --- Render Logic & Derived State ---
  const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
  const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
  const isMainChapterFinalState = currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.HOME && !landing.isPlaying;
  const isDesignChapterFinalState =
    currentChapter === 'design' &&
    !design.isPlayingDesign &&
    design.activeDesignStageKey === lastDesignStageKey &&
    design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
  const showReplayButton = isMainChapterFinalState || isDesignChapterFinalState;
  
  const showPrevArrow = !(
    (currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.INSULTS && landing.currentSubLineIndex === 0) ||
    (currentChapter === 'design' && design.activeDesignStageKey === DESIGN_NAV_ITEMS[0].name && design.currentDesignStepIndex === 0)
  );

  const showNextArrow = !(
    (currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.HOME) ||
    (showReplayButton && currentChapter === 'design')
  );

  const showMainArrows = currentChapter === 'main';
  const showDesignArrows = currentChapter === 'design';
  
  // --- Cursor Visibility Logic ---
  const showCursorInsults = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-insult' && landing.displayedChars.length < CONTENT.INSULTS.LINES[landing.currentSubLineIndex]?.text.length; // <-- FIXED
  const showCursorIntroGreeting = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'intro-greeting' && landing.introGreetingPhase === 'typing-greeting' && landing.displayedChars.length < CONTENT.INTRO.GREETING.length;
  const showCursorIntroName = currentChapter === 'main' && landing.isPlaying && (landing.mainAnimationPhase === 'typing-title' || landing.mainAnimationPhase === 'backspacing-title');
  const showCursorIntroTitle = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-maintext';
  const showCursorHomeQuestion = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-home-question';
  
  const currentDesignStepData = DESIGN_CONTENT[design.activeDesignStageKey]?.steps[design.currentDesignStepIndex];
  const showCursorDesignTitle = currentChapter === 'design' && design.isPlayingDesign && (design.designStepAnimationPhase === 'typing-title' || design.designStepAnimationPhase === 'backspacing-title');
  const showCursorDesignMainText = currentChapter === 'design' && design.isPlayingDesign && design.designStepAnimationPhase === 'typing-maintext';

  // --- UI State ---
  const chapterSectionWrapperStyle = "min-h-screen w-full flex flex-col items-center justify-center p-4 relative";
  // *** FIXED LOGIC: Changed max-width to be responsive and prevent arrow overlap ***
  const chapterContentWrapperStyle = "flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative group";
  const arrowButtonClass = "absolute top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all opacity-40 group-hover:opacity-100";
  const currentPlayPauseButtonState = currentChapter === 'main' ? landing.isPlaying : design.isPlayingDesign;
  const playPauseButtonClasses = `h-11 w-11 sm:h-14 sm:w-14 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-110 active:scale-95 border dark:border-gray-600 focus:ring-2 focus:ring-opacity-75 flex-shrink-0 ${showReplayButton
      ? `bg-white text-black hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border-gray-700 focus:ring-gray-400`
      : currentPlayPauseButtonState
        ? `bg-black text-white hover:bg-gray-800 dark:border-gray-700 focus:ring-gray-300`
        : `bg-white text-black hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border-gray-700 focus:ring-gray-400`
    }`;
  const activeNavStepOrStage = currentChapter === 'main' ? landing.activeMainStep : design.activeDesignStageKey;
  const handleNavItemClick = currentChapter === 'main' ? handleMainStepperItemClick : handleDesignStepperItemClick;
  const itemNavRefs = currentChapter === 'main' ? mainItemRefs : designItemRefs;

  return (
    <>
      <style>{animationKeyframes}</style>
      <div className={`AppContainer bg-slate-900 dark:bg-slate-950 text-slate-100 transition-colors duration-300 min-h-screen overflow-x-hidden`}>
        <div className="absolute bottom-4 left-4 z-40">
          <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200 ${darkMode ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
        <div className="fixed right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          {[{ name: 'main', label: 'Main Intro' }, { name: 'design', label: 'Design Insights' }].map(dot => (
            <button key={dot.name} onClick={() => navigateToChapter(dot.name)} title={`Go to ${dot.label}`}
              className={`block w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none ${currentChapter === dot.name ? 'bg-sky-500 dark:bg-sky-400 scale-125 shadow-lg' : 'bg-gray-400 hover:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-500 scale-100'}`}
              aria-label={`Go to ${dot.label} page`} />
          ))}
        </div>

        <div ref={mainChapterRef} className={`${chapterSectionWrapperStyle} ${mainChapterAnimClass}`}>
          <div className={`${chapterContentWrapperStyle} px-16`}>
            {showMainArrows && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 md:left-9 lg:left-2`}><PrevArrowIcon /></button>}
            {showMainArrows && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 md:right-9 lg:right-2`}><NextArrowIcon /></button>}
            <LandingChapter
                darkMode={darkMode}
                activeMainStep={landing.activeMainStep}
                mainAnimationPhase={landing.mainAnimationPhase}
                isSliding={landing.isSliding}
                displayedChars={landing.displayedChars}
                showCursorInsults={showCursorInsults}
                showCursorIntroGreeting={showCursorIntroGreeting}
                displayedNameChars={landing.displayedNameChars}
                showCursorIntroName={showCursorIntroName}
                displayedTitleChars={landing.displayedTitleChars}
                showCursorIntroTitle={showCursorIntroTitle}
                displayedHomeQuestion={landing.displayedHomeQuestion}
                showCursorHomeQuestion={showCursorHomeQuestion}
                onNavigateToChapter={navigateToChapter}
            />
          </div>
        </div>

        <div ref={designChapterRef} className={`${chapterSectionWrapperStyle} ${designChapterAnimClass}`}>
          <div className={`${chapterContentWrapperStyle} px-16`}>
            {showDesignArrows && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 md:left-8 lg:left-0`}><PrevArrowIcon /></button>}
            {showDesignArrows && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 md:right-8 lg:right-0`}><NextArrowIcon /></button>}
            <DesignChapter
                darkMode={darkMode}
                currentDesignStepData={currentDesignStepData}
                displayedDesignTitleChars={design.displayedDesignTitleChars}
                showCursorDesignTitle={showCursorDesignTitle}
                displayedDesignMainTextChars={design.displayedDesignMainTextChars}
                showCursorDesignMainText={showCursorDesignMainText}
            />
          </div>
        </div>

        {/* --- Responsiveness changes are in this section --- */}
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
            <button
              onClick={showReplayButton ? handleReplayChapter : togglePlayPause}
              className={playPauseButtonClasses}
              aria-label={showReplayButton ? 'Replay' : (currentPlayPauseButtonState ? 'Pause animations' : 'Play animations')}
            >
              {showReplayButton ? <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : (currentPlayPauseButtonState ? <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />)}
            </button>
            <div ref={scrollContainerRef} className={`flex-1 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-full flex items-center space-x-1 shadow-lg transition-colors duration-300 border border-gray-300 dark:border-gray-700 overflow-x-auto no-scrollbar ${navFadeClass}`}>
              {navItemsToDisplay.map((item, index) => (
                  <InteractiveOblongNavItem
                    key={`${currentChapter}-${item.name}`}
                    ref={el => itemNavRefs.current[index] = el}
                    text={(currentChapter === 'design' && DESIGN_CONTENT[item.name]) ? DESIGN_CONTENT[item.name].navText : item.name}
                    onClick={() => handleNavItemClick(item.name)}
                    isActive={activeNavStepOrStage === item.name}
                    isDarkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;