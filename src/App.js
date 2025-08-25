// src/App.js

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  MAIN_STAGES,
  MAIN_NAV_ITEMS,
  WHAT_DESIGN_NAV_ITEMS,
  DESIGN_CONTENT,
  QUIZZES,
  DESIGN_STAGE_KEYS,
  DESIGN_VIEWS,
  PROJECTS
} from './content';
import ChapterManager from './components/ChapterManager';
import { useLandingChapter } from './hooks/useLandingChapter';
import { useDesignChapter } from './hooks/useDesignChapter';
import { useWorkChapter } from './hooks/useWorkChapter';
import { useMeChapter } from './hooks/useMeChapter';
import BottomNavigation from './components/BottomNavigation';
import ErrorBoundary from './components/ErrorBoundary';
import ViewSwitcher from './components/ViewSwitcher';
import { SunIcon, MoonIcon, PotatoIcon } from './components/uiElements';
import InteractivePillNav from './components/InteractivePillNav';
import GenericProjectPage from './components/GenericProjectPage';

const ANIMATION_DURATION_CHAPTER = "0.5s";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  // This logic now runs once to decide which "mode" the app should be in.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('/');
    const [chapter, subChapter, section] = parts;

    if (chapter === 'work' && subChapter === 'project' && section) {
      const projectData = PROJECTS.find(p => p.id === section);
      if (projectData) {
        setActiveProject(projectData);
      }
    }
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    setDarkMode(isNight);
    document.documentElement.classList.toggle('dark', isNight);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  // If we found a project from the URL, render ONLY the project page.
  if (activeProject) {
    return (
      <div className={`AppContainer bg-bg-base text-text-base transition-colors duration-300 min-h-screen`}>
        <div className="fixed top-4 right-4 z-50">
           <button
            onClick={toggleDarkMode}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md`}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
        </div>
        <GenericProjectPage project={activeProject} darkMode={darkMode} />
      </div>
    );
  }

  // Otherwise, render the full scrolling portfolio app.
  return <PortfolioApp darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}

// I've moved your original App component into its own component called PortfolioApp
// to keep the logic clean and isolated.
const PortfolioApp = ({ darkMode, toggleDarkMode }) => {
  const [currentChapter, setCurrentChapter] = useState('main');
  const [snappedChapter, setSnappedChapter] = useState(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isThemeToggleClicked, setIsThemeToggleClicked] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const mainChapterRef = useRef(null);
  const designChapterRef = useRef(null);
  const workChapterRef = useRef(null);
  const meChapterRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mainItemRefs = useRef([]);
  const designItemRefs = useRef([]);
  const workItemRefs = useRef([]);
  const navigatedManually = useRef(false);
  const isProgrammaticScrollRef = useRef(false);

  const landing = useLandingChapter(currentChapter, navigatedManually, isAppReady);
  const design = useDesignChapter(currentChapter, isAppReady);
  const work = useWorkChapter(currentChapter, isAppReady);
  const me = useMeChapter(currentChapter);

  const [mainChapterAnimClass, setMainChapterAnimClass] = useState(`animate-[slideUpIn_${ANIMATION_DURATION_CHAPTER}_ease-out_forwards]`);
  const [designChapterAnimClass, setDesignChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');
  const [workChapterAnimClass, setWorkChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');
  const [meChapterAnimClass, setMeChapterAnimClass] = useState('opacity-0 translate-y-full pointer-events-none');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('/');
    const [chapter, subChapter, section, ...rest] = parts;

    if (chapter && ['main', 'design', 'work', 'me'].includes(chapter)) {
      setCurrentChapter(chapter);

      if (chapter === 'main') {
        const mainNavItem = MAIN_NAV_ITEMS.find(item => item.slug === subChapter);
        if (mainNavItem) {
          landing.setActiveMainStep(mainNavItem.name);
        }
      } else if (chapter === 'design') {
        if (subChapter === 'what') {
          design.setDesignView(DESIGN_VIEWS.WHAT_DESIGN);
          if (section) {
            const targetStageItem = WHAT_DESIGN_NAV_ITEMS.find(item => item.title && item.title.toLowerCase().replace(/\s+/g, '-') === section);
            if (targetStageItem) {
              design.navigateToStage(targetStageItem.name, false);
            }
          }
        } else if (subChapter === 'why') {
          design.setDesignView(DESIGN_VIEWS.WHY_DESIGN);
          
          if (section === 'score') {
            design.setGameStatus('end');
          } else if (section === 'bonus') {
            design.setGameStatus('bonus');
            if (rest[0] === 'case' && rest[1]) {
                design.navigateToGameCase(rest[1]);
            }
          } else if (section === 'case' && rest[0]) {
            design.navigateToGameCase(rest[0]);
          } else if (section === 'start') {
            design.returnToIntro();
          }
        }
      } else if (chapter === 'work') {
        if (subChapter === 'overview') {
          work.setWorkView('Overview');
          if (section) {
            const projectIndex = PROJECTS.findIndex(p => p.id === section);
            if (projectIndex !== -1) {
              work.setCurrentProjectIndex(projectIndex);
            }
          }
        } else {
          work.setWorkView('Quiz');
          if (section) {
            if (section === 'start') {
              work.setWorkStepIndex(0);
            } else if (section === 'results') {
              work.setWorkStepIndex(QUIZZES.length + 1);
            } else {
              const quizIndex = QUIZZES.findIndex(q => q.slug === section);
              if (quizIndex !== -1) {
                work.setWorkStepIndex(quizIndex + 1);
              }
            }
          }
        }
      }
    }
    setIsAppReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const duration = ANIMATION_DURATION_CHAPTER;
    const mainAnim = currentChapter === 'main' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    const designAnim = currentChapter === 'design' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    const workAnim = currentChapter === 'work' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    const meAnim = currentChapter === 'me' ? `animate-[slideUpIn_${duration}_ease-out_forwards]` : `animate-[slideDownOut_${duration}_ease-in_forwards] pointer-events-none`;
    setMainChapterAnimClass(mainAnim);
    setDesignChapterAnimClass(designAnim);
    setWorkChapterAnimClass(workAnim);
    setMeChapterAnimClass(meAnim);
  }, [currentChapter]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let newChapter = '';
          if (entry.target === mainChapterRef.current) newChapter = 'main';
          else if (entry.target === designChapterRef.current) newChapter = 'design';
          else if (entry.target === workChapterRef.current) newChapter = 'work';
          else if (entry.target === meChapterRef.current) newChapter = 'me';

          if (newChapter && currentChapter !== newChapter) {
            setCurrentChapter(newChapter);
            if (newChapter !== 'design' && newChapter !== 'work' && newChapter !== 'main') {
              window.history.replaceState(null, '', `#${newChapter}`);
            }
          }
          
          if (isProgrammaticScrollRef.current) {
            return;
          }

          if (newChapter && newChapter !== snappedChapter) {
            entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setSnappedChapter(newChapter);
          }
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const mainRefCurrent = mainChapterRef.current;
    const designRefCurrent = designChapterRef.current;
    const workRefCurrent = workChapterRef.current;
    const meRefCurrent = meChapterRef.current;
    if (mainRefCurrent) observer.observe(mainRefCurrent);
    if (designRefCurrent) observer.observe(designRefCurrent);
    if (workRefCurrent) observer.observe(workRefCurrent);
    if (meRefCurrent) observer.observe(meRefCurrent);
    return () => {
      if (mainRefCurrent) observer.unobserve(mainRefCurrent);
      if (designRefCurrent) observer.unobserve(designRefCurrent);
      if (workRefCurrent) observer.unobserve(workRefCurrent);
      if (meRefCurrent) observer.unobserve(meRefCurrent);
    };
  }, [currentChapter, snappedChapter, design]);

  useEffect(() => {
    let items;
    let activeIndex;
    let refs;
    if (currentChapter === 'main') {
        items = MAIN_NAV_ITEMS;
        activeIndex = items.findIndex(item => item.name === landing.activeMainStep);
        refs = mainItemRefs;
    } else if (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
        items = WHAT_DESIGN_NAV_ITEMS;
        activeIndex = items.findIndex(item => item.name === design.activeDesignStageKey);
        refs = designItemRefs;
    } else if (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHY_DESIGN) {
      items = design.whyDesignNavItems;
      activeIndex = design.whyDesignActiveIndex;
      refs = designItemRefs;
    } else if (currentChapter === 'work' && work.workView === 'Quiz') {
        items = work.WORK_NAV_ITEMS;
        activeIndex = work.workStepIndex;
        refs = workItemRefs;
    } else if (currentChapter === 'work' && work.workView === 'Overview') {
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
  }, [landing.activeMainStep, design.activeDesignStageKey, work.workStepIndex, currentChapter, work.workView, work.WORK_NAV_ITEMS, work.currentProjectIndex, work.PROJECT_NAV_ITEMS, design.designView, design.whyDesignNavItems, design.whyDesignActiveIndex]);

  const navItemsToDisplay = useMemo(() => {
    if (currentChapter === 'main') return MAIN_NAV_ITEMS;
    if (currentChapter === 'design') {
      return design.designView === DESIGN_VIEWS.WHAT_DESIGN
        ? WHAT_DESIGN_NAV_ITEMS
        : design.whyDesignNavItems;
    }
    if (currentChapter === 'work' && work.workView === 'Quiz') return work.WORK_NAV_ITEMS;
    if (currentChapter === 'work' && work.workView === 'Overview') return work.PROJECT_NAV_ITEMS;
    if (currentChapter === 'me') return [];
    return [];
  }, [currentChapter, work.workView, work.WORK_NAV_ITEMS, work.PROJECT_NAV_ITEMS, design.designView, design.whyDesignNavItems]);

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

  const navigateToChapter = (chapterName) => {
    isProgrammaticScrollRef.current = true;
    let targetRef;
    if (chapterName === 'main') targetRef = mainChapterRef;
    else if (chapterName === 'design') targetRef = designChapterRef;
    else if (chapterName === 'work') targetRef = workChapterRef;
    else if (chapterName === 'me') targetRef = meChapterRef;
    
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (chapterName !== 'design' && chapterName !== 'work' && chapterName !== 'main') {
          window.location.hash = chapterName;
      }
    }
    
    setTimeout(() => {
        isProgrammaticScrollRef.current = false;
    }, 1000); // Allow ample time for smooth scroll to finish
  };

  const handleNextLine = () => {
    if (currentChapter === 'main') {
      const result = landing.handleNextLine();
      if (result === 'navigate-to-design') {
        navigateToChapter('design');
      }
    } else if (currentChapter === 'design') {
      if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
        if (design.whyDesignStep === 'intro') {
          design.handleNextWhyDesignIntroLine();
        } else if (design.gameStatus === 'playing') {
          design.handleGameNext();
        }
      } else if (design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Document') {
        design.nextDesignStage();
      } else if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
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
    if (currentChapter === 'me') {
      navigateToChapter('work');
    } else if (currentChapter === 'work') {
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
      if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
          if (design.whyDesignStep === 'intro') {
              design.handlePrevWhyDesignIntroLine();
          } else if (design.gameStatus === 'playing') {
              if (design.gameCaseIndex === 0 && design.gamePartIndex === 0) {
                  design.goBackToIntro();
              } else {
                  design.handleGamePrev();
              }
          }
      } else if (design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Document') {
        const result = design.prevDesignStage();
        if (result === 'navigate-to-main') {
          navigateToChapter('main');
        }
      } else if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
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
        if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
            handleDesignStepperItemClick(itemId);
        } else if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
            if (itemId === 'Start') {
                design.returnToIntro();
            } else {
                design.navigateToWhyDesignStep(itemId);
            }
        }
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

  
  const handleWorkViewChange = (newView) => {
    work.setWorkView(newView);
  };
  
  const isFirstDesignStage = design.activeDesignStageKey === WHAT_DESIGN_NAV_ITEMS[0].name;
  const isLastDesignStage = design.activeDesignStageKey === WHAT_DESIGN_NAV_ITEMS[WHAT_DESIGN_NAV_ITEMS.length - 1].name;

  const showPrevArrow =
    (currentChapter === 'main' && (landing.activeMainStep !== MAIN_STAGES.INSULTS || landing.currentSubLineIndex !== 0)) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHY_DESIGN && design.whyDesignStep === 'intro' && design.whyDesignIntroStepIndex > 0) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHY_DESIGN && design.whyDesignStep === 'game') ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Slideshow' && (design.activeDesignStageKey !== DESIGN_STAGE_KEYS.ABOUT_DESIGN || design.currentDesignStepIndex !== 0)) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Document' && !isFirstDesignStage) ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex > 0);
    

  const currentPlayPauseButtonState = useMemo(() => {
    if (currentChapter === 'main') return landing.isPlaying;
    if (currentChapter === 'design') {
      if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
        return design.isPlayingDesign;
      }
      if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
        if (design.whyDesignIntroCompleted) return false; // Show Play icon
        return design.isPlayingWhyDesignIntro;
      }
    }
    return false;
  }, [currentChapter, landing.isPlaying, design.designView, design.isPlayingDesign, design.isPlayingWhyDesignIntro, design.whyDesignIntroCompleted]);

  let activeNavStepOrStage = '';
  if (currentChapter === 'main') {
    activeNavStepOrStage = landing.activeMainStep;
  } else if (currentChapter === 'design') {
    if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
      activeNavStepOrStage = design.activeDesignStageKey;
    } else {
      activeNavStepOrStage = design.whyDesignNavItems[design.whyDesignActiveIndex]?.name;
    }
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
  const showCursorDesignTitle = currentChapter === 'design' && design.isPlayingDesign && (design.designStepAnimationPhase === 'typing-title' || design.designStepAnimationPhase === 'backspacing-title');
  const showCursorDesignMainText = currentChapter === 'design' && design.isPlayingDesign && design.stepAnimationPhase === 'typing-maintext';

  const showNextArrow =
    (currentChapter === 'main' && landing.activeMainStep !== MAIN_STAGES.HOME) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHY_DESIGN && design.whyDesignStep === 'intro' && !design.isPlayingWhyDesignIntro) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHY_DESIGN && design.gameStatus === 'playing') ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Slideshow' && !design.isDesignChapterFinished) ||
    (currentChapter === 'design' && design.designView === DESIGN_VIEWS.WHAT_DESIGN && design.documentView === 'Document' && !isLastDesignStage) ||
    (currentChapter === 'work' && work.workView === 'Quiz' && work.workStepIndex < work.WORK_NAV_ITEMS.length - 1) ||
    (currentChapter === 'work' && work.workView === 'Overview');
    
  const handleCentralButtonClick = () => {
    if (currentChapter === 'me') {
        // No action for now on "Me" page
    } else if (currentChapter === 'work') {
      work.handleWorkChapterCentralButtonClick();
    } else if (currentChapter === 'design') {
      if (design.designView === DESIGN_VIEWS.WHAT_DESIGN) {
        if (design.isDesignChapterFinished) {
          design.replay();
        } else {
          design.togglePlayPause();
        }
      } else if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
        if (design.gameStatus === 'end')
          design.replayWhyDesignIntro();
        if (design.gameStatus === 'bonus') {
          design.startRandomBonusCase();
        } 
        else if (design.whyDesignStep === 'game' && design.gameStatus !== 'end') {
          design.handleGameNext();
        } else if (design.whyDesignIntroCompleted) {
          design.handleStartWhyDesignGame();
        } else {
          design.togglePlayPauseWhyDesignIntro();
        }
      }
    } else if (currentChapter === 'main') {
      if (landing.isLandingChapterFinished) {
        landing.replayLandingChapter();
      } else {
        landing.togglePlayPause();
      }
    }
  };

  const aToggleDarkMode = () => {
    setIsThemeToggleClicked(true);
    toggleDarkMode();
    setTimeout(() => setIsThemeToggleClicked(false), 400);
  };

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
          {currentChapter === 'design' && (
            <InteractivePillNav
              menuItems={Object.values(DESIGN_VIEWS)}
              selected={design.designView}
              setSelected={design.setDesignView}
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
            onClick={aToggleDarkMode}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-bg-muted border border-text-muted dark:border-gray-700 bg-transparent text-icon-interactive hover:text-icon-base transform hover:scale-105 active:scale-95 shadow-md`}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className={isThemeToggleClicked ? 'animate-click-bounce' : ''}>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
        </div>

        <div className="fixed right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          {[{ name: 'main', label: 'Main Intro' }, { name: 'design', label: 'Design Insights' }, { name: 'work', label: 'My Work' }, { name: 'me', label: 'About Me' }].map(dot => (
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
            meChapterRef={meChapterRef}
            mainChapterAnimClass={mainChapterAnimClass}
            designChapterAnimClass={designChapterAnimClass}
            workChapterAnimClass={workChapterAnimClass}
            meChapterAnimClass={meChapterAnimClass}
            currentChapter={currentChapter}
            showPrevArrow={showPrevArrow}
            showNextArrow={showNextArrow}
            handlePrevLine={handlePrevLine}
            handleNextLine={handleNextLine}
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            me={me}
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

        {currentChapter !== 'me' && !(currentChapter === 'work' && work.workView === 'Project') && (
          <BottomNavigation
            navItems={navItemsToDisplay}
            activeNavItem={activeNavStepOrStage}
            isPlaying={currentPlayPauseButtonState}
            isFadingOut={(currentChapter === 'main' && landing.isFadingOut) || (currentChapter === 'design' && design.isFadingOut)}
            isDarkMode={darkMode}
            showLeftFade={showLeftFade}
            showRightFade={showRightFade}
            onCentralButtonClick={handleCentralButtonClick}
            onNavItemClick={handleNavItemClick}
            scrollContainerRef={scrollContainerRef}
            itemNavRefs={itemNavRefs}
            containerClass={`flex items-center space-x-4 sm:space-x-3 ${
              currentChapter === 'design'
                ? design.designView === DESIGN_VIEWS.WHAT_DESIGN
                  ? 'w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl' // What Design
                  : 'w-full sm:max-w-xl md:max-w-3xl lg:w-auto' // Why Design
                : (currentChapter === 'work' && work.workView === 'Overview')
                ? 'w-full'
                : currentChapter === 'work' && work.workView === 'Quiz'
                ? 'w-full md:max-w-3xl lg:auto xl:max-w-3.5xl'
                : 'w-auto'
            }`}
            navItemsFlexClass={'flex-1 min-w-0'}
            currentChapter={currentChapter}
            design={design}
            work={work}
          />
        )}
      </div>
    </>
  );
}

export default App;