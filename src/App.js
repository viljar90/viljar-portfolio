// src/App.js

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  MAIN_STAGES,
  MAIN_NAV_ITEMS,
  DESIGN_NAV_ITEMS,
  DESIGN_CONTENT,
  QUIZZES,
  DESIGN_STAGE_KEYS,
} from './content';
import ChapterManager from './components/ChapterManager';
import { useLandingChapter } from './hooks/useLandingChapter';
import { useDesignChapter } from './hooks/useDesignChapter';
import { useWorkChapter } from './hooks/useWorkChapter';
import BottomNavigation from './components/BottomNavigation';
import ErrorBoundary from './components/ErrorBoundary';
import ViewSwitcher from './components/ViewSwitcher';
import { SunIcon, MoonIcon, PotatoIcon } from './components/uiElements';
import InteractivePillNav from './components/InteractivePillNav'; // Import the new component

// --- Animation Configuration ---
const ANIMATION_DURATION_CHAPTER = "0.5s";

// --- Main App Component ---
function App() {
  // --- Top-Level State ---
  const [darkMode, setDarkMode] = useState(true);
  const [currentChapter, setCurrentChapter] = useState('main');
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isThemeToggleClicked, setIsThemeToggleClicked] = useState(false);

  // Dummy state for InteractivePillNav for visual testing
  const dummyPillNavItems = ['Why Design', 'What Design'];
  const [selectedPillItem, setSelectedPillItem] = useState(dummyPillNavItems[0]);

  // --- Shared Refs ---
  const mainChapterRef = useRef(null);
  const designChapterRef = useRef(null);
  const workChapterRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mainItemRefs = useRef([]);
  const designItemRefs = useRef([]);
  const workItemRefs = useRef([]);
  const navigatedManually = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  // --- Logic Hooks ---
  const landing = useLandingChapter(currentChapter, navigatedManually);
  const design = useDesignChapter(currentChapter);
  const work = useWorkChapter();

  // --- Chapter Animation Classes ---
  const [mainChapterAnimClass, setMainChapterAnimClass] = useState(`animate-[slideUpIn_${ANIMATION_DURATION_CHAPTER}_ease-out_forwards]`);
  const [designChapterAnimClass, setDesignChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');
  const [workChapterAnimClass, setWorkChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');

  // --- useEffect Hooks ---
  // Effect to set initial dark mode based on the user's local time
  useEffect(() => {
    // Get the current hour from the user's own system clock
    const hour = new Date().getHours();

    // Set dark mode if it's between 6 PM (18) and 6 AM (6) local time
    const isNight = hour >= 18 || hour < 6;
    setDarkMode(isNight);
    document.documentElement.classList.toggle('dark', isNight);
  }, []); // Empty dependency array ensures this runs only once on mount



  // Effect 1: Manages chapter slide transitions
  useEffect(() => {
    const duration = ANIMATION_DURATION_CHAPTER;
    const mainAnim = currentChapter === 'main' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    const designAnim = currentChapter === 'design' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    const workAnim = currentChapter === 'work' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    setMainChapterAnimClass(mainAnim);
    setDesignChapterAnimClass(designAnim);
    setWorkChapterAnimClass(workAnim);
  }, [currentChapter]);

  // Effect 3: Intersection Observer for detecting visible chapter
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let newChapter = '';
          if (entry.target === mainChapterRef.current) newChapter = 'main';
          else if (entry.target === designChapterRef.current) newChapter = 'design';
          else if (entry.target === workChapterRef.current) newChapter = 'work';
          if (newChapter && currentChapter !== newChapter) {
            setCurrentChapter(newChapter);
          }
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const mainRefCurrent = mainChapterRef.current;
    const designRefCurrent = designChapterRef.current;
    const workRefCurrent = workChapterRef.current;
    if (mainRefCurrent) observer.observe(mainRefCurrent);
    if (designRefCurrent) observer.observe(designRefCurrent);
    if (workRefCurrent) observer.observe(workRefCurrent);
    return () => {
      if (mainRefCurrent) observer.unobserve(mainRefCurrent);
      if (designRefCurrent) observer.unobserve(designRefCurrent);
      if (workRefCurrent) observer.unobserve(workRefCurrent);
    };
  }, [currentChapter]);

  // Effect 4: Stepper Auto-scroll for ALL chapters
  useEffect(() => {
    let items;
    let activeIndex;
    let refs;
    if (currentChapter === 'main') {
        items = MAIN_NAV_ITEMS;
        activeIndex = items.findIndex(item => item.name === landing.activeMainStep);
        refs = mainItemRefs;
    } else if (currentChapter === 'design') {
        items = DESIGN_NAV_ITEMS;
        activeIndex = items.findIndex(item => item.name === design.activeDesignStageKey);
        refs = designItemRefs;
    } else if (currentChapter === 'work' && work.workView === 'Quiz') {
        items = work.WORK_NAV_ITEMS;
        activeIndex = work.workStepIndex;
        refs = workItemRefs;
    } else if (currentChapter === 'work' && work.workView === 'Overview') { // New logic for Overview
        items = work.PROJECT_NAV_ITEMS;
        activeIndex = work.currentProjectIndex;
        refs = workItemRefs;
    }
     else {
        return; 
    }
    if (!Array.isArray(refs.current)) refs.current = [];
    refs.current = refs.current.slice(0, items.length);
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
  }, [landing.activeMainStep, design.activeDesignStageKey, work.workStepIndex, currentChapter, work.workView, work.WORK_NAV_ITEMS, work.currentProjectIndex, work.PROJECT_NAV_ITEMS]);

  // Effect 5: Scroll-snapping logic
  useEffect(() => {
    const handleScroll = () => {
        if (isProgrammaticScrollRef.current) return;
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            const chapterRefs = [mainChapterRef, designChapterRef, workChapterRef];
            let closestRef = null;
            let minDistance = Infinity;
            chapterRefs.forEach(ref => {
                if (ref.current) {
                    const distance = Math.abs(ref.current.getBoundingClientRect().top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestRef = ref;
                    }
                }
            });
            if (closestRef) {
                isProgrammaticScrollRef.current = true;
                closestRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    isProgrammaticScrollRef.current = false;
                }, 1000);
            }
        }, 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
    };
  }, []);

  // --- Navigation Items for Stepper ---
  const navItemsToDisplay = useMemo(() => {
    if (currentChapter === 'main') return MAIN_NAV_ITEMS;
    if (currentChapter === 'design') return DESIGN_NAV_ITEMS;
    if (currentChapter === 'work' && work.workView === 'Quiz') return work.WORK_NAV_ITEMS;
    if (currentChapter === 'work' && work.workView === 'Overview') return work.PROJECT_NAV_ITEMS;
    return [];
  }, [currentChapter, work.workView, work.WORK_NAV_ITEMS, work.PROJECT_NAV_ITEMS]);

  const updateNavFade = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowLeftFade(hasOverflow && el.scrollLeft > 10);
    setShowRightFade(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      updateNavFade();
      scrollContainer.addEventListener('scroll', updateNavFade);
      const resizeObserver = new ResizeObserver(updateNavFade);
      resizeObserver.observe(scrollContainer);
      return () => {
          scrollContainer.removeEventListener('scroll', updateNavFade);
          resizeObserver.disconnect();
      };
  }, [updateNavFade, navItemsToDisplay]);

  // --- Event Handlers ---
  const navigateToChapter = (chapterName) => {
    isProgrammaticScrollRef.current = true;
    let targetRef;
    if (chapterName === 'main') targetRef = mainChapterRef;
    else if (chapterName === 'design') targetRef = designChapterRef;
    else if (chapterName === 'work') targetRef = workChapterRef;
    setTimeout(() => {
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    setTimeout(() => {
        isProgrammaticScrollRef.current = false;
    }, 1000);
  };

  const handleNextLine = () => {
    if (currentChapter === 'main') {
      const result = landing.handleNextLine();
      if (result === 'navigate-to-design') {
        navigateToChapter('design');
      }
    } else if (currentChapter === 'design') {
      // *** ADDED LOGIC: Check for document view ***
      if (design.designView === 'Document') {
        design.nextDesignStage();
      } else {
        design.nextStep();
      }
    } else if (currentChapter === 'work') {
        if (work.workView === 'Quiz') {
            work.handleNextQuestion();
        } else if (work.workView === 'Overview') {
            work.handleNextProject();
        }
    }
  };

  const handlePrevLine = () => {
    if (currentChapter === 'work') {
      if (work.workView === 'Quiz') {
        if (work.workStepIndex > 0) {
            work.handlePrevQuestion();
        } else {
            navigateToChapter('design')
        }
      } else if (work.workView === 'Overview') {
        work.handlePrevProject();
      } else {
        navigateToChapter('design');
      }
    } else if (currentChapter === 'main') {
      landing.handlePrevLine();
    } else if (currentChapter === 'design') {
       // *** ADDED LOGIC: Check for document view ***
      if (design.designView === 'Document') {
        const result = design.prevDesignStage();
        if (result === 'navigate-to-main') {
          navigateToChapter('main');
        }
      } else {
        const result = design.prevStep();
        if (result === 'navigate-to-main') {
          navigateToChapter('main');
        }
      }
    }
  };

  const handleWorkStepperItemClick = (index) => {
    work.handleWorkNavItemClick(index);
  };

  const handleNavItemClick = (itemId) => {
    if (currentChapter === 'main') {
        handleMainStepperItemClick(itemId);
    } else if (currentChapter === 'design') {
        handleDesignStepperItemClick(itemId);
    } else if (currentChapter === 'work' && work.workView === 'Quiz') {
      const index = work.WORK_NAV_ITEMS.findIndex(item => {
        if (item.name.startsWith('Question')) {
          const quizIndex = parseInt(item.name.split(' ')[1], 10) - 1;
          if (QUIZZES[quizIndex]?.title === itemId || item.name === itemId) {
            return true;
          }
        }
        return item.name === itemId;
      });
      if (index !== -1) {
        handleWorkStepperItemClick(index);
      }
    } else if (currentChapter === 'work' && work.workView === 'Overview') {
        work.handleProjectNavItemClick(itemId);
    }
  };
  
  const handleMainStepperItemClick = useCallback((itemName) => {
    if (currentChapter !== 'main') return;
    navigatedManually.current = false;
    landing.setIsPlaying(true);
    if (itemName === landing.activeMainStep) {
      landing.setActiveMainStep('');
      setTimeout(() => {
        landing.setActiveMainStep(itemName);
      }, 0);
    } else {
      landing.setActiveMainStep(itemName);
    }
  }, [currentChapter, landing]);

  const handleDesignStepperItemClick = useCallback((stageKey) => {
    if (currentChapter !== 'design') return;
    design.navigateToStage(stageKey);
  }, [currentChapter, design]);

  
  const toggleDarkMode = () => {
    setIsThemeToggleClicked(true);
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
    setTimeout(() => setIsThemeToggleClicked(false), 400); // Reset after animation
  };

  const handleWorkViewChange = (newView) => {
    work.setWorkView(newView);
  };
  
  // --- Render Logic & Derived State ---
  const isFirstDesignStage = design.activeDesignStageKey === DESIGN_NAV_ITEMS[0].name;
  const isLastDesignStage = design.activeDesignStageKey === DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;

  const showPrevArrow =
    (currentChapter === 'main' && (landing.activeMainStep !== MAIN_STAGES.INSULTS || landing.currentSubLineIndex !== 0)) ||
    (currentChapter === 'design' && design.designView === 'Slideshow' && (design.activeDesignStageKey !== DESIGN_STAGE_KEYS.ABOUT_DESIGN || design.currentDesignStepIndex !== 0)) ||
    (currentChapter === 'design' && design.designView === 'Document' && !isFirstDesignStage) ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex > 0) ||
    (currentChapter === 'work' && work.workView === 'Overview');

  const currentPlayPauseButtonState = currentChapter === 'main' ? landing.isPlaying : (currentChapter === 'design' ? design.isPlayingDesign : false);

  // src/App.js

  let activeNavStepOrStage = '';
  if (currentChapter === 'main') {
    activeNavStepOrStage = landing.activeMainStep;
  } else if (currentChapter === 'design') {
    activeNavStepOrStage = design.activeDesignStageKey;
  } else if (currentChapter === 'work' && work.workView === 'Quiz') {
    if (work.workStepIndex === 0) {
      activeNavStepOrStage = 'Start';
    } else if (work.workStepIndex > QUIZZES.length) {
      activeNavStepOrStage = 'Results';
    } else {
      const quiz = QUIZZES[work.workStepIndex - 1];
      activeNavStepOrStage = work.quizAnswers[quiz.id]?.correct ? quiz.title : `Question ${work.workStepIndex}`;
    }
  } else if (currentChapter === 'work' && work.workView === 'Overview') {
    activeNavStepOrStage = work.PROJECT_NAV_ITEMS[work.currentProjectIndex]?.id;
  } else if (currentChapter === 'work') {
    activeNavStepOrStage = 'Start';
  }

  const itemNavRefs = currentChapter === 'main' ? mainItemRefs : (currentChapter === 'design' ? designItemRefs : workItemRefs);

  const showCursorInsults = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-insult';
  const showCursorIntroGreeting = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'intro-greeting' && landing.introGreetingPhase === 'typing-greeting';
  const showCursorIntroName = currentChapter === 'main' && landing.isPlaying && (landing.mainAnimationPhase === 'typing-title' || landing.mainAnimationPhase === 'backspacing-title');
  const showCursorIntroTitle = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-maintext';
  const showCursorHomeQuestion = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-home-question';
  
  const currentDesignStepData = DESIGN_CONTENT[design.activeDesignStageKey]?.steps[design.currentDesignStepIndex];
  const showCursorDesignTitle = currentChapter === 'design' && design.isPlayingDesign && (design.stepAnimationPhase === 'typing-title' || design.stepAnimationPhase === 'backspacing-title');
  const showCursorDesignMainText = currentChapter === 'design' && design.isPlayingDesign && design.stepAnimationPhase === 'typing-maintext';

  const showNextArrow =
    (currentChapter === 'main' && landing.activeMainStep !== MAIN_STAGES.HOME) ||
    (currentChapter === 'design' && design.designView === 'Slideshow' && !design.isDesignChapterFinished) ||
    (currentChapter === 'design' && design.designView === 'Document' && !isLastDesignStage) ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex < work.WORK_NAV_ITEMS.length - 1) ||
    (currentChapter === 'work' && work.workView === 'Overview');
    
  // #################################################################
  // ### FINAL RENDER BLOCK ###
  // #################################################################
  return (
    <>
       <div className={`AppContainer bg-bg-base text-text-base transition-colors duration-300 min-h-screen overflow-x-hidden`}>
        {currentChapter === 'work' && work.workView === 'Quiz' && (
          <>
            <div className="hidden md:block fixed top-0 bottom-0 left-0 w-16 md:w-24 lg:w-40 xl:w-60 bg-gradient-to-r from-bg-base via-bg-base to-transparent pointer-events-none z-20" />
            <div className="hidden md:block fixed top-0 bottom-0 right-0 w-16 md:w-24 lg:w-40 xl:w-60 bg-gradient-to-l from-bg-base via-bg-base to-transparent pointer-events-none z-20" />
          </>
        )}

        <div className={`fixed top-4 left-4 z-50 transition-opacity duration-300 ${currentChapter !== 'main' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
              onClick={() => navigateToChapter('main')}
              aria-label="Go to Home"
              className="group rounded-full p-1 transition-all duration-200 transform hover:scale-110 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-base"
          >
              <PotatoIcon className="w-11 h-11 text-icon-interactive group-hover:text-icon-base transition-colors group-hover:animate-jump-bounce-hover" />
          </button>
        </div>

        <div className="fixed top-4 right-4 z-50 flex items-center space-x-4 h-12">
          {currentChapter === 'design' && ( // Conditionally render only on the 'design' chapter
            <InteractivePillNav
              menuItems={dummyPillNavItems}
              selected={selectedPillItem}
              setSelected={setSelectedPillItem}
            />
          )}
          {currentChapter === 'work' && (
            <ViewSwitcher
              work={work}
              onWorkViewChange={handleWorkViewChange}
              isDarkMode={darkMode}
            />
          )}
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md`}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className={isThemeToggleClicked ? 'animate-click-bounce' : ''}>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
        </div>

        <div className="fixed right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          {[{ name: 'main', label: 'Main Intro' }, { name: 'design', label: 'Design Insights' }, { name: 'work', label: 'My Work' }].map(dot => (
            <button
              key={dot.name}
              onClick={() => navigateToChapter(dot.name)}
              title={`Go to ${dot.label}`}
              className={`block w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
                currentChapter === dot.name
                  ? 'bg-primary dark:bg-secondary scale-125 shadow-lg dark:shadow-glow-ring-secondary border-2 border-primary dark:border-transparent'
                  : 'bg-transparent hover:bg-text-muted dark:hover:border-secondary dark:hover:shadow-glow-ring-secondary scale-100 border border-text-muted'
              } focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted`}
              aria-label={`Go to ${dot.label} page`}
            />
          ))}
        </div>
        
        <ErrorBoundary>
          <ChapterManager
            mainChapterRef={mainChapterRef}
            designChapterRef={designChapterRef}
            workChapterRef={workChapterRef}
            mainChapterAnimClass={mainChapterAnimClass}
            designChapterAnimClass={designChapterAnimClass}
            workChapterAnimClass={workChapterAnimClass}
            currentChapter={currentChapter}
            showPrevArrow={showPrevArrow}
            showNextArrow={showNextArrow}
            handlePrevLine={handlePrevLine}
            handleNextLine={handleNextLine}
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            navigateToChapter={navigateToChapter}
            currentDesignStepData={currentDesignStepData}
            showCursorInsults={showCursorInsults}
            showCursorIntroGreeting={showCursorIntroGreeting}
            showCursorIntroName={showCursorIntroName}
            showCursorIntroTitle={showCursorIntroTitle}
            showCursorHomeQuestion={showCursorHomeQuestion}
            showCursorDesignTitle={showCursorDesignTitle}
            showCursorDesignMainText={showCursorDesignMainText}
            QUIZZES={QUIZZES}
          />
        </ErrorBoundary>

         <BottomNavigation
          navItems={navItemsToDisplay}
          activeNavItem={activeNavStepOrStage}
          isPlaying={currentPlayPauseButtonState}
          isFadingOut={(currentChapter === 'main' && landing.isFadingOut) || (currentChapter === 'design' && design.isFadingOut)}
          isDarkMode={darkMode}
          showLeftFade={showLeftFade}
          showRightFade={showRightFade}
          onCentralButtonClick={
          currentChapter === 'work'
            ? work.handleWorkChapterCentralButtonClick
            : currentChapter === 'design'
            ? (design.isDesignChapterFinished ? design.replay : design.togglePlayPause)
            : landing.togglePlayPause // Default to landing page logic
          }
          onNavItemClick={handleNavItemClick}
          scrollContainerRef={scrollContainerRef}
          itemNavRefs={itemNavRefs}
          containerClass={`flex items-center space-x-4 sm:space-x-3 ${
            currentChapter === 'design'
              ? 'w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl'
              : (currentChapter === 'work' && work.workView === 'Overview')
              ? 'w-full'
              : currentChapter === 'work' && work.workView === 'Quiz'
              ? 'w-full md:max-w-3xl lg:auto xl:max-w-3.5xl'
              : 'w-auto'
          }`}
          navItemsFlexClass={'flex-1 min-w-0'}
          currentChapter={currentChapter}
          design={design} // Pass the whole design object
          work={work}
        />
      </div>
    </>
  );
}

export default App;