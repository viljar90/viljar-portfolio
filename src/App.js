// src/App.js

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
// ADD THIS IMPORT: The user needs to install this package
import ConfettiExplosion from 'react-confetti-explosion';
import {
  MAIN_STAGES,
  MAIN_NAV_ITEMS,
  CONTENT,
  DESIGN_NAV_ITEMS,
  DESIGN_CONTENT,
} from './content';
import {
    PlayIcon,
    PauseIcon,
    ReplayIcon,
    PrevArrowIcon,
    NextArrowIcon,
    InteractiveOblongNavItem,
    SegmentedControl,
    BlinkingCursor,
    SkipIcon,
} from './components/uiElements';
import LandingChapter from './components/LandingChapter';
import DesignChapter from './components/DesignChapter';
import { useLandingChapter } from './hooks/useLandingChapter';
import { useDesignChapter } from './hooks/useDesignChapter';

// --- Quiz data updated with a 'title' property for the nav ---
const quizzes = [
      {
        id: 'aiPlatform',
        title: 'AI Platform',
        question: "Your company wants to leverage AI but is unsure where to start in a rapidly evolving market.\nWhat is the best approach to secure your data and maintain flexibility?",
        options: [
            { text: 'Mandate the use of a single AI provider across the company', isCorrect: false },
            { text: 'Build a custom in-house AI model from scratch', isCorrect: false },
            { text: 'Invest in an internal platform that integrates with multiple AI providers', isCorrect: true },
            { text: 'Wait for the market to mature before adopting AI tools', isCorrect: false },
        ],
        resultText: "An internal platform with a modular architecture that connects to various AI providers offers the most flexibility and avoids vendor lock-in. I also keeps your company data secure and under your control.",
        projectButtonText: "The AI Platform"
    },
    {
        id: 'designSystem',
        title: 'Design System',
        question: "Your product teams are struggling with inefficient development and a misaligned product portfolio.\nWhat's the most effective first step to solve this?",
        options: [
            { text: 'Hire an agile coach', isCorrect: false },
            { text: 'Create a design system', isCorrect: true },
            { text: 'Reorganize your IT department', isCorrect: false },
            { text: 'Hire a service designer', isCorrect: false },
        ],
        resultText: 'A design system is the simplest and most effective way to ensure consistency and speed.',
        projectButtonText: 'The Design System'
    },
    {
        id: 'dataCatalogue',
        title: 'Data Catalogue',
        question: "Your organization has valuable data, but it's siloed, hard to find, and undocumented.\nHow do you empower your employees to discover and trust your data?",
        options: [
            { text: 'Invest in more data science', isCorrect: false },
            { text: 'Launch a company-wide data literacy program', isCorrect: false },
            { text: 'Build a Data Catalogue', isCorrect: true },
            { text: 'Purchase a new BI tool', isCorrect: false },
        ],
        resultText: "Designing a user-centric data catalogue makes data discoverable and drives a data-driven culture.",
        projectButtonText: "The Data Catalogue"
    }
];

// --- NEW: Component for the animated quiz intro ---
const QuizIntro = ({ onStart }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedMainText, setDisplayedMainText] = useState('');
    const [phase, setPhase] = useState('typing-title'); // typing-title, typing-main, done

    const title = "My Work";
    const mainText = "I love games.\nGet to know my work through the game \n or go to the overview ↗️";
    const TYPEWRITER_SPEED = 35;

    useEffect(() => {
        let timer;
        if (phase === 'typing-title') {
            if (displayedTitle.length < title.length) {
                timer = setTimeout(() => {
                    setDisplayedTitle(title.substring(0, displayedTitle.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('typing-main');
            }
        } else if (phase === 'typing-main') {
            if (displayedMainText.length < mainText.length) {
                timer = setTimeout(() => {
                    setDisplayedMainText(mainText.substring(0, displayedMainText.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('done');
            }
        }
        return () => clearTimeout(timer);
    }, [displayedTitle, displayedMainText, phase]);

    return (
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-sky-400 dark:text-sky-300 mb-4 min-h-[1.2em]">
                {displayedTitle}
                {phase === 'typing-title' && <BlinkingCursor sizeClass="h-12 md:h-14" />}
            </h1>
            <p className="text-2xl md:text-3xl text-slate-200 dark:text-slate-300 min-h-[1.5em]" style={{ whiteSpace: 'pre-line' }}>
              {displayedMainText}
              {phase === 'typing-main' && <BlinkingCursor sizeClass="h-8 md:h-9" />}
            </p>
            {phase === 'done' && (
                <div className="mt-12 animate-fadeIn">
                    <button
                        onClick={onStart}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 text-lg md:text-xl inline-flex items-center space-x-1"
                    >
                        <PlayIcon className="w-6 h-6" />
                        <span>Play</span>
                    </button>
                </div>
            )}
        </div>
    );
};


// --- MODIFIED: WorkChapter now has a confetti explosion on the result card ---
const WorkChapter = ({ darkMode, quiz, onAnswer, answerState, onReplayQuestion }) => {
    if (!quiz) return null;

    const { question, options, resultText, projectButtonText } = quiz;
    const { selected, correct } = answerState || {};

    // Split the question into the statement (blue part) and the main question
    const questionParts = question.split('\n');
    const statement = questionParts[0];
    const mainQuestion = questionParts[1];

    const ResultCard = () => (
        <div className="relative w-full max-w-xl p-6 md:p-8 bg-slate-800 rounded-xl shadow-2xl animate-fadeIn text-left">
            {/* Confetti will explode from the center of the screen */}
            <ConfettiExplosion />
            
            {/* REPLAY BUTTON */}
            <button
                onClick={() => onReplayQuestion(quiz.id)}
                className="absolute top-3 right-3 p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
                aria-label="Replay question"
            >
                <ReplayIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center">
                <span role="img" aria-label="party popper" className="text-3xl mr-3">🎉</span>
                <h3 className="text-3xl font-bold text-white">Correct!</h3>
            </div>
            <p className="mt-4 text-lg text-slate-300">
                {resultText}
            </p>
            
            {/* IMPROVED CTA SECTION */}
            <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400">Check out the one I've worked on</p>
                <button className="mt-2 text-lg font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-200">
                    {projectButtonText} ↗
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl">
                {!correct && (
                     <div className="text-left text-1xl md:text-2xl mb-8 animate-fadeIn">
                        <p className="text-sky-400 dark:text-sky-300 mb-2">{statement}</p>
                        <p className="text-slate-200 dark:text-slate-300">{mainQuestion}</p>
                    </div>
                )}

                <div className={`w-full transition-all duration-300 ${correct ? 'flex justify-center mt-8' : 'space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4'}`}>
                    {options.map((option) => {
                        const isSelected = selected === option.text;
                        const isTheCorrectlySelectedOption = correct && isSelected;

                        if (isTheCorrectlySelectedOption) {
                            return <ResultCard key={option.text} />;
                        }

                        if (correct) {
                            return null;
                        }

                        let buttonClass = 'border-2 border-slate-500 hover:border-sky-400 hover:bg-sky-400/10 text-slate-200';
                        if (isSelected) {
                            buttonClass = option.isCorrect ? '' : 'bg-red-500/20 border-red-500 text-white animate-[shake_0.5s_ease-in-out]';
                        }

                        return (
                            <button
                                key={option.text}
                                onClick={() => onAnswer(quiz.id, option)}
                                className={`block w-full text-left p-4 rounded-lg transition-all duration-200 md:text-center md:flex md:items-center md:justify-center md:h-40 ${buttonClass}`}
                            >
                                {option.text}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


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
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
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
  const [navFadeClass, setNavFadeClass] = useState('');
  const [workView, setWorkView] = useState('Quiz');
  const [workStepIndex, setWorkStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

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
  const design = useDesignChapter(currentChapter, navigatedManually);

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
  useEffect(() => {
    if (currentChapter === 'design' || currentChapter === 'work') {
      landing.setIsPlaying(false);
    }
    if (currentChapter === 'main' || currentChapter === 'work') {
      design.setIsPlayingDesign(false);
    }

    if (currentChapter === 'design') {
      const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
      const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
      const isDesignChapterFinal = design.activeDesignStageKey === lastDesignStageKey && design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
      if (!isDesignChapterFinal) {
        design.setIsPlayingDesign(true);
      }
    } else if (currentChapter === 'main') {
      if (landing.activeMainStep !== MAIN_STAGES.HOME) {
        landing.setIsPlaying(true);
      } else {
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

  const WORK_NAV_ITEMS = useMemo(() => [{ name: 'Start' }, ...quizzes.map((quiz, index) => ({ name: `Question ${index + 1}` }))], []);

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
    } else if (currentChapter === 'work' && workView === 'Quiz') {
        items = WORK_NAV_ITEMS;
        activeIndex = workStepIndex;
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
  }, [landing.activeMainStep, design.activeDesignStageKey, workStepIndex, currentChapter, workView, WORK_NAV_ITEMS]);

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
    if (currentChapter === 'work' && workView === 'Quiz') return WORK_NAV_ITEMS;
    return [];
  }, [currentChapter, workView, WORK_NAV_ITEMS]);

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
    } else if (currentChapter === 'design') { 
      const currentStageData = DESIGN_CONTENT[design.activeDesignStageKey];
      const isLastStepOfStage = design.currentDesignStepIndex >= currentStageData.steps.length - 1;
      const isLastStage = design.activeDesignStageKey === DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
  
      if (isLastStepOfStage && isLastStage) {
        navigateToChapter('work'); 
        return;
      }
      
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
    } else if (currentChapter === 'work') {
        if (workStepIndex < WORK_NAV_ITEMS.length - 1) {
            setWorkStepIndex(prev => prev + 1);
        }
    }
  };
  
  const handlePrevLine = () => {
    landing.setIsPlaying(false);
    design.setIsPlayingDesign(false);
    navigatedManually.current = true;
  
    if (currentChapter === 'work') {
      if (workStepIndex > 0) {
        setWorkStepIndex(prev => prev - 1);
      } else {
        navigateToChapter('design'); 
      }
    }
    else if (currentChapter === 'main') {
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
    } else { 
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
        } else {
           navigateToChapter('main'); 
        }
      }
    }
  };

  const handleWorkStepperItemClick = (index) => {
    setWorkStepIndex(index);
  };

  const handleNavItemClick = (itemName) => {
    if (currentChapter === 'main') {
        handleMainStepperItemClick(itemName);
    } else if (currentChapter === 'design') {
        handleDesignStepperItemClick(itemName);
    } else if (currentChapter === 'work' && workView === 'Quiz') {
      // Find the index by title or original name
      const index = WORK_NAV_ITEMS.findIndex(item => {
        if (item.name.startsWith('Question')) {
          const quizIndex = parseInt(item.name.split(' ')[1], 10) - 1;
          if (quizzes[quizIndex]?.title === itemName || item.name === itemName) {
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

  const handleQuizAnswer = (quizId, option) => {
    setQuizAnswers(prev => ({
        ...prev,
        [quizId]: { selected: option.text, correct: option.isCorrect }
    }));
  };

  const handleReplayQuestion = (quizId) => {
    setQuizAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[quizId];
        return newAnswers;
    });
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
    } else if (currentChapter === 'work') {
        setWorkStepIndex(0);
        setQuizAnswers({});
    }
  };
  
  const handleCentralButtonClick = () => {
    if (currentChapter === 'work' && workView === 'Quiz') {
      const allQuizzesAnswered = quizzes.every(quiz => quizAnswers[quiz.id]?.correct);
      if (workStepIndex === 0) { // On the intro
        handleNextLine();
      } else if (allQuizzesAnswered) { // If all are answered, the final button is replay
        handleReplayChapter();
      } else { // In the middle of questions
        handleNextLine();
      }
    } else {
      const isFinalState = (currentChapter === 'main' && isMainChapterFinalState) || (currentChapter === 'design' && isDesignChapterFinalState);
      if (isFinalState) {
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
  const lastDesignStageKey = DESIGN_NAV_ITEMS[DESIGN_NAV_ITEMS.length - 1].name;
  const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];
  const isMainChapterFinalState = currentChapter === 'main' && landing.activeMainStep === MAIN_STAGES.HOME && !landing.isPlaying;
  const isDesignChapterFinalState =
    currentChapter === 'design' &&
    !design.isPlayingDesign &&
    design.activeDesignStageKey === lastDesignStageKey &&
    design.currentDesignStepIndex >= lastDesignStageData.steps.length - 1;
  const showReplayButtonForChapters = isMainChapterFinalState || isDesignChapterFinalState;
  
  const showPrevArrow = 
    (currentChapter === 'main' && (landing.activeMainStep !== MAIN_STAGES.INSULTS || landing.currentSubLineIndex !== 0)) ||
    (currentChapter === 'design') || 
    (currentChapter === 'work' && workView === 'Quiz' && workStepIndex > 0);

  const showNextArrow = 
    (currentChapter === 'main' && landing.activeMainStep !== MAIN_STAGES.HOME) ||
    (currentChapter === 'design' && !isDesignChapterFinalState) ||
    (currentChapter === 'work' && workView === 'Quiz' && workStepIndex < WORK_NAV_ITEMS.length - 1);
  
  const currentPlayPauseButtonState = currentChapter === 'main' ? landing.isPlaying : (currentChapter === 'design' ? design.isPlayingDesign : false);
  const playPauseButtonClasses = `h-11 w-11 sm:h-14 sm:w-14 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-110 active:scale-95 border dark:border-gray-600 focus:ring-2 focus:ring-opacity-75 flex-shrink-0 bg-white text-black hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border-gray-700 focus:ring-gray-400`;
  
  let activeNavStepOrStage = '';
  if (currentChapter === 'main') activeNavStepOrStage = landing.activeMainStep;
  else if (currentChapter === 'design') activeNavStepOrStage = design.activeDesignStageKey;
  else if (currentChapter === 'work' && workView === 'Quiz' && workStepIndex > 0) {
      const quiz = quizzes[workStepIndex - 1];
      activeNavStepOrStage = quizAnswers[quiz.id]?.correct ? quiz.title : `Question ${workStepIndex}`;
  } else if (currentChapter === 'work') {
      activeNavStepOrStage = 'Start';
  }

  const itemNavRefs = currentChapter === 'main' ? mainItemRefs : (currentChapter === 'design' ? designItemRefs : workItemRefs);

  const bottomNavContainerClass = `flex items-center space-x-2 sm:space-x-3 ${
    currentChapter === 'design' ? 'w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl' : 'w-auto'
  }`;
  const navItemsFlexClass = currentChapter === 'design' ? 'flex-1' : 'flex-initial';
  
  let CentralButton;
  const allQuizzesAnswered = quizzes.every(quiz => quizAnswers[quiz.id]?.correct);

  if (currentChapter === 'work' && workView === 'Quiz') {
    if (workStepIndex === 0) { // Quiz intro
        CentralButton = <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
    } else if (allQuizzesAnswered) { // All questions are answered correctly
        CentralButton = <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
    } else { // In the middle of the quiz
        CentralButton = <SkipIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  } else if (showReplayButtonForChapters) {
      CentralButton = <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
  } else {
      CentralButton = currentPlayPauseButtonState ? <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
  }

  const chapterSectionWrapperStyle = "min-h-screen w-full flex flex-col items-center justify-center p-4 relative";
  const chapterContentWrapperStyle = "flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative group";
  const arrowButtonClass = "absolute top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all opacity-40 group-hover:opacity-100";
  
  const showCursorInsults = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-insult' && landing.displayedChars.length < CONTENT.INSULTS.LINES[landing.currentSubLineIndex]?.text.length;
  const showCursorIntroGreeting = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'intro-greeting' && landing.introGreetingPhase === 'typing-greeting' && landing.displayedChars.length < CONTENT.INTRO.GREETING.length;
  const showCursorIntroName = currentChapter === 'main' && landing.isPlaying && (landing.mainAnimationPhase === 'typing-title' || landing.mainAnimationPhase === 'backspacing-title');
  const showCursorIntroTitle = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-maintext';
  const showCursorHomeQuestion = currentChapter === 'main' && landing.isPlaying && landing.mainAnimationPhase === 'typing-home-question';
  
  const currentDesignStepData = DESIGN_CONTENT[design.activeDesignStageKey]?.steps[design.currentDesignStepIndex];
  const showCursorDesignTitle = currentChapter === 'design' && design.isPlayingDesign && (design.designStepAnimationPhase === 'typing-title' || design.designStepAnimationPhase === 'backspacing-title');
  const showCursorDesignMainText = currentChapter === 'design' && design.isPlayingDesign && design.designStepAnimationPhase === 'typing-maintext';


  return (
    <>
      <style>{animationKeyframes}</style>
      <div className={`AppContainer bg-slate-900 dark:bg-slate-950 text-slate-100 transition-colors duration-300 min-h-screen overflow-x-hidden`}>
        <div className="absolute bottom-4 left-4 z-40">
          <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200 ${darkMode ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>{darkMode ? 'Light Mode' : 'Darker Mode'}</button>
        </div>
        <div className="fixed right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          {[{ name: 'main', label: 'Main Intro' }, { name: 'design', label: 'Design Insights' }, { name: 'work', label: 'My Work' }].map(dot => (
            <button key={dot.name} onClick={() => navigateToChapter(dot.name)} title={`Go to ${dot.label}`}
              className={`block w-3.5 h-3.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none ${currentChapter === dot.name ? 'bg-sky-500 dark:bg-sky-400 scale-125 shadow-lg' : 'bg-gray-400 hover:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-500 scale-100'}`}
              aria-label={`Go to ${dot.label} page`} />
          ))}
        </div>

        <div ref={mainChapterRef} className={`${chapterSectionWrapperStyle} ${mainChapterAnimClass}`}>
          <div className={`${chapterContentWrapperStyle} px-16`}>
            {currentChapter === 'main' && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
            {currentChapter === 'main' && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
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
            {currentChapter === 'design' && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
            {currentChapter === 'design' && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
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

        <div ref={workChapterRef} className={`${chapterSectionWrapperStyle} ${workChapterAnimClass}`}>
            {currentChapter === 'work' && (
                <div className="absolute top-8 right-8 z-10">
                    <SegmentedControl
                        options={['Quiz', 'Overview']}
                        activeOption={workView}
                        onOptionClick={setWorkView}
                        isDarkMode={darkMode}
                    />
                </div>
            )}
            <div className={`${chapterContentWrapperStyle} px-16`}>
                {currentChapter === 'work' && workView === 'Quiz' && showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
                {currentChapter === 'work' && workView === 'Quiz' && showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}
                
                {workView === 'Quiz' ? (
                    workStepIndex === 0 ? (
                        <QuizIntro onStart={() => setWorkStepIndex(1)} />
                    ) : (
                        <WorkChapter 
                            darkMode={darkMode} 
                            quiz={quizzes[workStepIndex - 1]}
                            onAnswer={handleQuizAnswer}
                            answerState={quizAnswers[quizzes[workStepIndex - 1]?.id]}
                            onReplayQuestion={handleReplayQuestion}
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
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
             <div className={bottomNavContainerClass}>
                <button
                    onClick={handleCentralButtonClick}
                    className={playPauseButtonClasses}
                    aria-label="Central control button"
                >
                    {CentralButton}
                </button>
               
                {navItemsToDisplay.length > 0 && (
                    <div ref={scrollContainerRef} className={`bg-gray-50 dark:bg-slate-800 p-1.5 rounded-full flex items-center space-x-1 shadow-lg transition-colors duration-300 border border-gray-300 dark:border-gray-700 overflow-x-auto no-scrollbar ${navItemsFlexClass} ${navFadeClass}`}>
                    {navItemsToDisplay.map((item, index) => {
                        let navItemText = (currentChapter === 'design' && DESIGN_CONTENT[item.name]) 
                                            ? DESIGN_CONTENT[item.name].navText 
                                            : item.name;

                        let navIdentifier = item.name;

                        // Check for completed quiz questions and add a tick
                        if (currentChapter === 'work' && workView === 'Quiz' && item.name.startsWith('Question')) {
                            const quizIndex = index - 1; // Account for 'Start' item
                            if (quizIndex >= 0 && quizIndex < quizzes.length) {
                                const quiz = quizzes[quizIndex];
                                if (quizAnswers[quiz.id]?.correct) {
                                    navItemText = `${quiz.title} ✓`;
                                    navIdentifier = quiz.title;
                                }
                            }
                        }

                        return (
                            <InteractiveOblongNavItem
                                key={`${currentChapter}-${item.name}`}
                                ref={el => itemNavRefs.current[index] = el}
                                text={navItemText}
                                onClick={() => handleNavItemClick(navIdentifier)}
                                isActive={activeNavStepOrStage === navIdentifier || activeNavStepOrStage === item.name}
                                isDarkMode={darkMode} />
                        );
                    })}
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;