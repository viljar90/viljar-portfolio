import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  MAIN_STAGES,
  MAIN_NAV_ITEMS,
  CONTENT,
  DESIGN_NAV_ITEMS,
  DESIGN_CONTENT,
  QUIZZES
} from './content';
import {
    PlayIcon,
    ReplayIcon,
    PrevArrowIcon,
    NextArrowIcon,
    InteractiveOblongNavItem,
    SegmentedControl,
    SkipIcon,
    AnimatedBorderButton,
} from './components/uiElements';
import LandingChapter from './components/LandingChapter';
import DesignChapter from './components/DesignChapter';
import QuizIntro from './components/QuizIntro';
import WorkChapter from './components/WorkChapter';
import { useLandingChapter } from './hooks/useLandingChapter';
import { useDesignChapter } from './hooks/useDesignChapter';
import { useWorkChapter } from './hooks/useWorkChapter';

// --- Animation Configuration ---
const ANIMATION_DURATION_CHAPTER = "0.5s";

// --- Main App Component ---
function App() {
  // --- Top-Level State ---
  const [darkMode, setDarkMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('main');
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

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

  // Effect 2: Manages pause/resume on chapter scroll
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (currentChapter === 'design' || currentChapter === 'work') {
      landing.setIsPlaying(false);
    }
    // Design chapter is now fully managed by its hook - no interference needed
    if (currentChapter === 'main') {
      if (landing.activeMainStep !== MAIN_STAGES.HOME) {
        landing.setIsPlaying(true);
      } else {
        landing.setIsPlaying(false);
        landing.setMainAnimationPhase('home-buttons-appear');
      }
    }
  }, [currentChapter]);
  /* eslint-enable react-hooks/exhaustive-deps */

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
    } else {
        return; // No stepper for work overview
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
  }, [landing.activeMainStep, design.activeDesignStageKey, work.workStepIndex, currentChapter, work.workView, work.WORK_NAV_ITEMS]);

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
    return [];
  }, [currentChapter, work.workView, work.WORK_NAV_ITEMS]);

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
    landing.setIsPlaying(false);
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
    } else if (currentChapter === 'design') {
      const result = design.nextStep();
      if (result === 'navigate-to-work') {
        navigateToChapter('work');
      }
    } else if (currentChapter === 'work') {
        if (work.workStepIndex < work.WORK_NAV_ITEMS.length - 1) {
            work.setWorkStepIndex(prev => prev + 1);
        }
    }
  };

  const handlePrevLine = () => {
    landing.setIsPlaying(false);
    navigatedManually.current = true;
    
    if (currentChapter === 'work') {
      if (work.workStepIndex > 0) {
        work.setWorkStepIndex(prev => prev - 1);
      } else {
        navigateToChapter('design');
      }
    } else if (currentChapter === 'main') {
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
    } else if (currentChapter === 'design') {
      const result = design.prevStep();
      if (result === 'navigate-to-main') {
        navigateToChapter('main');
      }
    }
  };

  const handleWorkStepperItemClick = (index) => {
    work.setWorkStepIndex(index);
  };

  const handleNavItemClick = (itemName) => {
    if (currentChapter === 'main') {
        handleMainStepperItemClick(itemName);
    } else if (currentChapter === 'design') {
        handleDesignStepperItemClick(itemName);
    } else if (currentChapter === 'work' && work.workView === 'Quiz') {
      // Find the index by title or original name
      const index = work.WORK_NAV_ITEMS.findIndex(item => {
        if (item.name.startsWith('Question')) {
          const quizIndex = parseInt(item.name.split(' ')[1], 10) - 1;
          if (QUIZZES[quizIndex]?.title === itemName || item.name === itemName) {
            return true;
          }
        }
        return item.name === itemName;
      });
      if (index !== -1) {
        handleWorkStepperItemClick(index);
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
    design.navigateToStage(stageKey);
  }, [currentChapter, design]);

  const togglePlayPause = () => {
    if (currentChapter === 'main') {
      if (!landing.isPlaying) {
        if (landing.activeMainStep === MAIN_STAGES.INSULTS) {
          const currentLineData = CONTENT.INSULTS.LINES[landing.currentSubLineIndex];
          if (currentLineData && landing.displayedChars.length < currentLineData.text.length) {
            landing.setMainAnimationPhase('typing-insult');
          } else {
            landing.setMainAnimationPhase('pausing-insult');
          }
        } else if (landing.activeMainStep === MAIN_STAGES.INTRO) {
          const currentStepData = CONTENT.INTRO.steps[landing.introStepIndex];
          if (currentStepData && landing.displayedNameChars.length < currentStepData.title.length) {
            landing.setMainAnimationPhase('typing-title');
          } else if (currentStepData && landing.displayedTitleChars.length < currentStepData.mainText.length) {
            landing.setMainAnimationPhase('typing-maintext');
          } else {
            landing.setMainAnimationPhase('pausing');
          }
        }
      }
      landing.setIsPlaying(p => !p);
    } else if (currentChapter === 'design') {
      design.togglePlayPause();
    }
  };

  const handleReplayChapter = () => {
    navigatedManually.current = false;
    if (currentChapter === 'main') {
      landing.setActiveMainStep(MAIN_STAGES.INSULTS);
      landing.setIsPlaying(true);
    } else if (currentChapter === 'design') {
      design.replay();
    } else if (currentChapter === 'work') {
        work.resetWorkChapter();
    }
  };

  const handleCentralButtonClick = () => {
    const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
    const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
    const isMainChapterFinalState = currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.HOME && !landing.isPlaying;
    const isDesignChapterFinalState =
      currentChapter === 'design' &&
      !design.isPlayingDesign &&
      design.activeDesignStageKey === lastDesignStageKey &&
      design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
    const showReplayButtonForChapters = isMainChapterFinalState || isDesignChapterFinalState;
    if (currentChapter === 'work' && work.workView === 'Quiz') {
      const allQuizzesAnswered = QUIZZES.every(quiz => work.quizAnswers[quiz.id]?.correct);
      if (work.workStepIndex === 0) { // On the intro
        handleNextLine();
      } else if (allQuizzesAnswered) { // If all are answered, the final button is replay
        handleReplayChapter();
      } else { // In the middle of questions
        handleNextLine();
      }
    } else {
      if (showReplayButtonForChapters) {
        handleReplayChapter();
      } else {
        togglePlayPause();
      }
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
  const showPrevArrow =
    (currentChapter === 'main' && (landing.activeMainStep !== MAIN_STAGES.INSULTS || landing.currentSubLineIndex !== 0)) ||
    (currentChapter === 'design') ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex > 0);

  const currentPlayPauseButtonState = currentChapter === 'main' ? landing.isPlaying : (currentChapter === 'design' ? design.isPlayingDesign : false);

  let activeNavStepOrStage = '';
  if (currentChapter === 'main') activeNavStepOrStage = landing.activeMainStep;
  else if (currentChapter === 'design') activeNavStepOrStage = design.activeDesignStageKey;
  else if (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex > 0) {
      const quiz = QUIZZES[work.workStepIndex - 1];
      activeNavStepOrStage = work.quizAnswers[quiz.id]?.correct ? quiz.title : `Question ${work.workStepIndex}`;
  } else if (currentChapter === 'work') {
      activeNavStepOrStage = 'Start';
  }

  const itemNavRefs = currentChapter === 'main' ? mainItemRefs : (currentChapter === 'design' ? designItemRefs : workItemRefs);
  const bottomNavContainerClass = `flex items-center space-x-2 sm:space-x-3 ${
    currentChapter === 'design' ? 'w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl' : 'w-auto'
  }`;
  const navItemsFlexClass = currentChapter === 'design' ? 'flex-1 min-w-0' : 'flex-initial';
  const chapterSectionWrapperStyle = "min-h-screen w-full flex flex-col items-center justify-center p-4 relative";
  const chapterContentWrapperStyle = "flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative group";
  const arrowButtonClass = "absolute top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all opacity-40 group-hover:opacity-100";

  const showCursorInsults = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-insult' && landing.displayedChars.length < CONTENT.INSULTS.LINES[landing.currentSubLineIndex]?.text.length;
  const showCursorIntroGreeting = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'intro-greeting' && landing.introGreetingPhase === 'typing-greeting' && landing.displayedChars.length < CONTENT.INTRO.GREETING.length;
  const showCursorIntroName = currentChapter === 'main' && landing.isPlaying && (landing.mainAnimationPhase === 'typing-title' || landing.mainAnimationPhase === 'backspacing-title');
  const showCursorIntroTitle = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-maintext';
  const showCursorHomeQuestion = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-home-question';

  const currentDesignStepData = DESIGN_CONTENT[design.activeDesignStageKey]?.steps[design.currentDesignStepIndex];
  const showCursorDesignTitle = currentChapter === 'design' && design.isPlayingDesign && (design.designStepAnimationPhase === 'typing-title' || design.designStepAnimationPhase === 'backspacing-title');
  const showCursorDesignMainText = currentChapter === 'design' && design.isPlayingDesign && design.designStepAnimationPhase === 'typing-maintext';

  const renderCentralButton = () => {
    const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
    const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
    const isMainChapterFinalState = currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.HOME && !landing.isPlaying;
    const isDesignChapterFinalState =
      currentChapter === 'design' &&
      !design.isPlayingDesign &&
      design.activeDesignStageKey === lastDesignStageKey &&
      design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
    const showReplayButtonForChapters = isMainChapterFinalState || isDesignChapterFinalState;
    const allQuizzesAnswered = QUIZZES.every(quiz => work.quizAnswers[quiz.id]?.correct);
    const nonAnimatedButtonClasses = "h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-110 active:scale-95 bg-white text-black hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-800";
    
    if (currentChapter === 'work' && work.workView === 'Quiz') {
      let icon;
      let label = "Central control button";
      if (work.workStepIndex === 0) {
        icon = <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        label = "Start quiz";
      } else if (allQuizzesAnswered) {
        icon = <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        label = "Replay quiz";
      } else {
        icon = <SkipIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        label = "Skip question";
      }
      return <button onClick={handleCentralButtonClick} className={nonAnimatedButtonClasses} aria-label={label}>{icon}</button>;
    }
    
    if (showReplayButtonForChapters) {
      return (
        <button onClick={handleCentralButtonClick} className={nonAnimatedButtonClasses} aria-label="Replay chapter">
          <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      );
    }
    
    return (
      <AnimatedBorderButton
        isPlaying={currentPlayPauseButtonState}
        onClick={handleCentralButtonClick}
        className="h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0"
        aria-label={currentPlayPauseButtonState ? 'Pause' : 'Play'}
      />
    );
  };

  const lastDesignStageKeyFinal = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
  const lastDesignStageDataFinal = DESIGN_CONTENT[lastDesignStageKeyFinal];
  const isDesignChapterFinalStateFinal =
    currentChapter === 'design' &&
    !design.isPlayingDesign &&
    design.activeDesignStageKey === lastDesignStageKeyFinal &&
    design.currentDesignStepIndex >= lastDesignStageDataFinal.steps.length - 1;

  const showNextArrow =
    (currentChapter === 'main' && landing.activeMainStep !== MAIN_STAGES.HOME) ||
    (currentChapter === 'design' && !isDesignChapterFinalStateFinal) ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex < work.WORK_NAV_ITEMS.length - 1);

  // #################################################################
  // ### FINAL RENDER BLOCK ###
  // #################################################################
  return (
    <>
      <div className={`AppContainer bg-slate-900 dark:bg-slate-950 text-slate-100 transition-colors duration-300 min-h-screen overflow-x-hidden`}>
        <div className="absolute bottom-4 left-4 z-40">
          <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200 ${darkMode ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' : 'bg-slate-700 text-white hover:bg-slate-600'} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 dark:focus-visible:ring-offset-slate-950`}>{darkMode ? 'Light Mode' : 'Darker Mode'}</button>
        </div>
        <div className="fixed right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          {[{ name: 'main', label: 'Main Intro' }, { name: 'design', label: 'Design Insights' }, { name: 'work', label: 'My Work' }].map(dot => (
            <button key={dot.name} onClick={() => navigateToChapter(dot.name)} title={`Go to ${dot.label}`}
              className={`block w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none ${currentChapter === dot.name ? 'bg-sky-500 dark:bg-sky-400 scale-125 shadow-lg' : 'bg-gray-400 hover:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-500 scale-100'} focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950`}
              aria-label={`Go to ${dot.label} page`} />
          ))}
        </div>
        <div ref={mainChapterRef} className={`${chapterSectionWrapperStyle} ${mainChapterAnimClass}`}>
          {currentChapter === 'main' && (
            <div className={`${chapterContentWrapperStyle} px-16`}>
              {showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
              {showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
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
          )}
        </div>
        <div ref={designChapterRef} className={`${chapterSectionWrapperStyle} ${designChapterAnimClass}`}>
          {currentChapter === 'design' && (
            <div className={`${chapterContentWrapperStyle} px-16`}>
              {showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
              {showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
              <DesignChapter
                  darkMode={darkMode}
                  currentDesignStepData={currentDesignStepData}
                  displayedDesignTitleChars={design.displayedDesignTitleChars}
                  showCursorDesignTitle={showCursorDesignTitle}
                  displayedDesignMainTextChars={design.displayedDesignMainTextChars}
                  showCursorDesignMainText={showCursorDesignMainText}
              />
            </div>
          )}
        </div>
        <div ref={workChapterRef} className={`${chapterSectionWrapperStyle} ${workChapterAnimClass}`}>
            {currentChapter === 'work' && (
              <>
                <div className="absolute top-8 right-8 z-10">
                    <SegmentedControl
                        options={['Quiz', 'Overview']}
                        activeOption={work.workView}
                        onOptionClick={work.setWorkView}
                        isDarkMode={darkMode}
                    />
                </div>
                <div className={`${chapterContentWrapperStyle} px-16`}>
                  {work.workView === 'Quiz' && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
                  {work.workView === 'Quiz' && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
                  {work.workView === 'Quiz' ? (
                      work.workStepIndex === 0 ? (
                          <QuizIntro onStart={() => work.setWorkStepIndex(1)} />
                      ) : (
                          <WorkChapter
                              darkMode={darkMode}
                              quiz={QUIZZES[work.workStepIndex - 1]}
                              onAnswer={work.handleQuizAnswer}
                              answerState={work.quizAnswers[QUIZZES[work.workStepIndex - 1]?.id]}
                              onReplayQuestion={work.handleReplayQuestion}
                          />
                      )
                  ) : (
                       <div className="text-center">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-100 dark:text-slate-200">
                              Project Overview
                          </h1>
                          <p className="text-xl mt-4 text-slate-400">Project gallery coming soon!</p>
                      </div>
                  )}
                </div>
              </>
            )}
        </div>
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
             <div className={bottomNavContainerClass}>
                {renderCentralButton()}
                {navItemsToDisplay.length > 0 && (
                  <div className={`relative ${navItemsFlexClass}`}>
                    <div
                        ref={scrollContainerRef}
                        className="bg-gray-50 dark:bg-slate-800 py-1.5 px-2 rounded-full flex items-center space-x-1 shadow-lg transition-colors duration-300 border border-gray-300 dark:border-gray-700 overflow-x-auto no-scrollbar"
                    >
                        {navItemsToDisplay.map((item, index) => {
                            let navItemText = (currentChapter === 'design' && DESIGN_CONTENT[item.name])
                                                ? DESIGN_CONTENT[item.name].navText
                                                : item.name;
                            let navIdentifier = item.name;
                            // Check for completed quiz questions and add a tick
                            if (currentChapter === 'work' && work.workView === 'Quiz' && item.name.startsWith('Question')) {
                                const quizIndex = index - 1; // Account for 'Start' item
                                if (quizIndex >= 0 && quizIndex < QUIZZES.length) {
                                    const quiz = QUIZZES[quizIndex];
                                    if (work.quizAnswers[quiz.id]?.correct) {
                                        navItemText = `${quiz.title} ✓`;
                                        navIdentifier = quiz.title;
                                    }
                                }
                            }
                            const isFading = (currentChapter === 'main' && landing.isFadingOut) || (currentChapter === 'design' && design.isFadingOut);
                            return (
                                <InteractiveOblongNavItem
                                    key={`${currentChapter}-${item.name}`}
                                    ref={el => itemNavRefs.current[index] = el}
                                    text={navItemText}
                                    onClick={() => handleNavItemClick(navIdentifier)}
                                    isActive={activeNavStepOrStage === navIdentifier || activeNavStepOrStage === item.name}
                                    isPlaying={activeNavStepOrStage === navIdentifier && currentPlayPauseButtonState && !isFading}
                                    isFadingOut={activeNavStepOrStage === navIdentifier && isFading}
                                    isDarkMode={darkMode}
                                    />
                            );
                        })}
                    </div>
                    {/* Fade effect overlays */}
                    <div className={`absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} dark:from-slate-950 pointer-events-none`}></div>
                    <div className={`absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} dark:from-slate-950 pointer-events-none`}></div>
                  </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;