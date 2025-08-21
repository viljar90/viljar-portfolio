// src/hooks/useDesignChapter.js

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { WHAT_DESIGN_NAV_ITEMS, DESIGN_CONTENT, DESIGN_VIEWS, WHY_DESIGN_GAME_CONTENT, WHY_DESIGN_NAV_ITEMS, WHY_DESIGN_CONTENT } from '../content';

const TYPEWRITER_SPEED = 25;
const BACKSPACE_SPEED = 20;
const LONG_PAUSE_DURATION = 2700;

export const useDesignChapter = (currentChapter) => {
  // --- "What Design" States ---
  const [designView, setDesignView] = useState(DESIGN_VIEWS.WHY_DESIGN);
  const [activeDesignStageKey, setActiveDesignStageKey] = useState(WHAT_DESIGN_NAV_ITEMS[0].name);
  const [currentDesignStepIndex, setCurrentDesignStepIndex] = useState(0);
  const [displayedDesignTitleChars, setDisplayedDesignTitleChars] = useState('');
  const [displayedDesignMainTextChars, setDisplayedDesignMainTextChars] = useState('');
  const [designStepAnimationPhase, setDesignStepAnimationPhase] = useState('typing-title');
  const [isPlayingDesign, setIsPlayingDesign] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navigationMode, setNavigationMode] = useState('automatic');
  const [error, setError] = useState(null);
  const [isDesignChapterFinished, setIsDesignChapterFinished] = useState(false);
  const wasPlayingRef = useRef(false);
  const [documentView, setDocumentView] = useState('Slideshow');
  const [previousDesignStageKey, setPreviousDesignStageKey] = useState(null);
  const [designAnimationDirection, setDesignAnimationDirection] = useState('next');
  const prevChapterRef = useRef(currentChapter);
  const prevDesignViewRef = useRef(designView);
  const hasVisitedWhatDesign = useRef(false);


  // --- "Why Design" States ---
  const [whyDesignStep, setWhyDesignStep] = useState('intro');
  const [whyDesignIntroCompleted, setWhyDesignIntroCompleted] = useState(false);
  const [whyDesignIntroStepIndex, setWhyDesignIntroStepIndex] = useState(0);
  const [whyDesignIntroResetKey, setWhyDesignIntroResetKey] = useState(0);
  const [isPlayingWhyDesignIntro, setIsPlayingWhyDesignIntro] = useState(false);
  const hasAutoPlayedWhyDesignIntro = useRef(false);
  const [whyDesignAnimationPhase, setWhyDesignAnimationPhase] = useState('typing-title');
  const [displayedWhyDesignTitleChars, setDisplayedWhyDesignTitleChars] = useState('');
  const [displayedWhyDesignMainTextChars, setDisplayedWhyDesignMainTextChars] = useState('');
  const wasWhyDesignIntroIncompleteOnExit = useRef(false);


  // --- Game States ---
  const [gameScore, setGameScore] = useState(0);
  const [gameCaseIndex, setGameCaseIndex] = useState(0);
  const [gamePartIndex, setGamePartIndex] = useState(0);
  const [gameQuestionStates, setGameQuestionStates] = useState({});
  const [gameSelectedAnswers, setGameSelectedAnswers] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');

  // --- Logic ---
  const navigateToGameCase = useCallback((slug) => {
    const caseIndex = WHY_DESIGN_GAME_CONTENT.findIndex(c => c.slug === slug);
    if (caseIndex !== -1) {
      setWhyDesignStep('game');
      setGameCaseIndex(caseIndex);
      setGamePartIndex(0);
      setWhyDesignIntroCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (currentChapter === 'design') {
      if (designView === DESIGN_VIEWS.WHAT_DESIGN) {
        const navItem = WHAT_DESIGN_NAV_ITEMS.find(item => item.name === activeDesignStageKey);
        if (navItem && navItem.title) {
          const sectionSlug = navItem.title.toLowerCase().replace(/\s+/g, '-');
          window.history.replaceState(null, '', `#design/what/${sectionSlug}`);
        }
      } else { // Handle "Why Design" URL updates
        let whySlug = 'start';
        if (whyDesignStep === 'game') {
          const currentCase = WHY_DESIGN_GAME_CONTENT[gameCaseIndex];
          if (gameStatus === 'end') {
            whySlug = 'score';
          } else if (currentCase) {
            whySlug = `case/${currentCase.slug}`;
          }
        }
        window.history.replaceState(null, '', `#design/why/${whySlug}`);
      }
    }
  }, [designView, activeDesignStageKey, currentChapter, whyDesignStep, gameCaseIndex, gameStatus]);


  const togglePlayPauseWhyDesignIntro = useCallback(() => {
    setIsPlayingWhyDesignIntro(prev => !prev);
  }, []);

  const whyDesignIntroAnimationCompleted = useCallback(() => {
    setIsPlayingWhyDesignIntro(false);
    setWhyDesignIntroCompleted(true);
  }, []);

  const resetGame = useCallback(() => {
    setGameScore(0);
    setGameCaseIndex(0);
    setGamePartIndex(0);
    setGameQuestionStates({});
    setGameSelectedAnswers([]);
    setGameStatus('playing');
  }, []);
  
  const handleStartWhyDesignGame = useCallback(() => {
    setIsPlayingWhyDesignIntro(false);
    setWhyDesignStep('game');
  }, []);

  const replayWhyDesignIntro = useCallback(() => {
    setWhyDesignIntroCompleted(false);
    setWhyDesignIntroStepIndex(0);
    setWhyDesignIntroResetKey(prevKey => prevKey + 1);
    setWhyDesignStep('intro');
    setIsPlayingWhyDesignIntro(true);
    hasAutoPlayedWhyDesignIntro.current = true;
    setDisplayedWhyDesignTitleChars('');
    setDisplayedWhyDesignMainTextChars('');
    setWhyDesignAnimationPhase('typing-title');
    resetGame();
  }, [resetGame]);

  const returnToIntro = useCallback(() => {
      setWhyDesignIntroCompleted(false);
      setWhyDesignIntroStepIndex(0);
      setWhyDesignIntroResetKey(prevKey => prevKey + 1);
      setWhyDesignStep('intro');
      setIsPlayingWhyDesignIntro(true);
      hasAutoPlayedWhyDesignIntro.current = true;
      setDisplayedWhyDesignTitleChars('');
      setDisplayedWhyDesignMainTextChars('');
      setWhyDesignAnimationPhase('typing-title');
  }, []);
  
  const goBackToIntro = useCallback(() => {
    setIsPlayingWhyDesignIntro(false);
    setWhyDesignStep('intro');
    const lastIntroIndex = WHY_DESIGN_CONTENT.intro.steps.length - 1;
    setWhyDesignIntroStepIndex(lastIntroIndex);
    const lastStepData = WHY_DESIGN_CONTENT.intro.steps[lastIntroIndex];
    setDisplayedWhyDesignTitleChars(lastStepData.title);
    setDisplayedWhyDesignMainTextChars(lastStepData.mainText);
  }, []);


  const navigateToWhyDesignStep = useCallback((itemName) => {
    setWhyDesignStep('game');
    setWhyDesignIntroCompleted(true);

    if (itemName.startsWith('Case')) {
      const caseNum = parseInt(itemName.split(' ')[1], 10);
      setGameCaseIndex(caseNum - 1);
      setGamePartIndex(0);
      setGameStatus('playing');
    } else if (itemName === 'Bonus') {
      setGameStatus('bonus');
    } else if (itemName === 'Your Score') {
      setGameStatus('end');
    }
  }, []);

  const handleNextWhyDesignIntroLine = useCallback(() => {
      setIsPlayingWhyDesignIntro(false);
      if (whyDesignIntroStepIndex < WHY_DESIGN_CONTENT.intro.steps.length - 1) {
          const nextIndex = whyDesignIntroStepIndex + 1;
          const nextStepData = WHY_DESIGN_CONTENT.intro.steps[nextIndex];
          setDisplayedWhyDesignTitleChars(nextStepData.title);
          setDisplayedWhyDesignMainTextChars(nextStepData.mainText);
          setWhyDesignIntroStepIndex(nextIndex);
      } else {
          handleStartWhyDesignGame();
      }
  }, [whyDesignIntroStepIndex, handleStartWhyDesignGame]);

  const handlePrevWhyDesignIntroLine = useCallback(() => {
      setIsPlayingWhyDesignIntro(false);
      if (whyDesignIntroStepIndex > 0) {
          const prevIndex = whyDesignIntroStepIndex - 1;
          const prevStepData = WHY_DESIGN_CONTENT.intro.steps[prevIndex];
          setDisplayedWhyDesignTitleChars(prevStepData.title);
          setDisplayedWhyDesignMainTextChars(prevStepData.mainText);
          setWhyDesignIntroStepIndex(prevIndex);
      }
  }, [whyDesignIntroStepIndex]);

  const handleGameOptionClick = useCallback((option) => {
    const questionId = `${gameCaseIndex}-${gamePartIndex}`;
    const question = WHY_DESIGN_GAME_CONTENT[gameCaseIndex].parts[gamePartIndex];
    const currentState = gameQuestionStates[questionId] || {};

    if (currentState.completed || (currentState.revealedOptions?.includes(option.text))) return;

    if (question.type === 'singleChoice') {
      if (option.isCorrect) {
        if (!currentState.completed) setGameScore(s => s + 100);
        setGameQuestionStates(prev => ({ ...prev, [questionId]: { ...currentState, completed: true } }));
      } else {
        const newRevealed = [...(currentState.revealedOptions || []), option.text];
        setGameQuestionStates(prev => ({ ...prev, [questionId]: { ...currentState, revealedOptions: newRevealed } }));
      }
    } else {
      setGameSelectedAnswers(prev => prev.includes(option.text) ? prev.filter(t => t !== option.text) : [...prev, option.text]);
    }
  }, [gameCaseIndex, gamePartIndex, gameQuestionStates]);

  const handleGameSubmitSelectAll = useCallback(() => {
    const questionId = `${gameCaseIndex}-${gamePartIndex}`;
    if (gameQuestionStates[questionId]?.completed) return;
    
    const question = WHY_DESIGN_GAME_CONTENT[gameCaseIndex].parts[gamePartIndex];
    const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.text);
    let awardedScore = 0;
    gameSelectedAnswers.forEach(answer => {
      if (correctOptions.includes(answer)) awardedScore += (100 / correctOptions.length);
    });
    
    setGameScore(s => s + awardedScore);
    setGameQuestionStates(prev => ({ ...prev, [questionId]: { completed: true, selected: gameSelectedAnswers } }));
    setGameSelectedAnswers([]);
  }, [gameCaseIndex, gamePartIndex, gameQuestionStates, gameSelectedAnswers]);

  const handleGameNext = useCallback(() => {
    setGameSelectedAnswers([]);
    const MAIN_CASES_COUNT = 3;
    const isLastPart = gamePartIndex >= WHY_DESIGN_GAME_CONTENT[gameCaseIndex].parts.length - 1;
    const isMainFlowComplete = gameCaseIndex < MAIN_CASES_COUNT && gameCaseIndex === MAIN_CASES_COUNT - 1 && isLastPart;
    const isBonusCase = gameCaseIndex >= MAIN_CASES_COUNT;

    if (!isLastPart) setGamePartIndex(p => p + 1);
    else if (isMainFlowComplete) setGameStatus('bonus');
    else if (isBonusCase && isLastPart) setGameStatus('bonus');
    else if (gameCaseIndex < WHY_DESIGN_GAME_CONTENT.length - 1) {
      setGameCaseIndex(c => c + 1);
      setGamePartIndex(0);
    } else setGameStatus('end');
  }, [gameCaseIndex, gamePartIndex]);
  
    const handleGamePrev = useCallback(() => {
    if (gamePartIndex > 0) {
      setGamePartIndex(p => p - 1);
    } else if (gameCaseIndex > 0) {
      const prevCaseParts = WHY_DESIGN_GAME_CONTENT[gameCaseIndex - 1].parts;
      setGameCaseIndex(c => c - 1);
      setGamePartIndex(prevCaseParts.length - 1);
    }
  }, [gameCaseIndex, gamePartIndex]);

  const startBonusCase = useCallback((index) => {
    setGameCaseIndex(index);
    setGamePartIndex(0);
    setGameSelectedAnswers([]);
    setGameStatus('playing');
  }, []);

  const startRandomBonusCase = useCallback(() => {
    const MAIN_CASES_COUNT = 3;
    const availableBonusCases = WHY_DESIGN_GAME_CONTENT
      .map((_, index) => index)
      .slice(MAIN_CASES_COUNT)
      .filter(caseIndex => !(gameQuestionStates[`${caseIndex}-0`]?.completed && gameQuestionStates[`${caseIndex}-1`]?.completed));

    if (availableBonusCases.length > 0) {
      startBonusCase(availableBonusCases[Math.floor(Math.random() * availableBonusCases.length)]);
    }
  }, [gameQuestionStates, startBonusCase]);

  const whyDesignNavItems = useMemo(() => {
      const caseItems = ["Case 1", "Case 2", "Case 3"].map((name, index) => {
          const isCompleted =
              gameQuestionStates[`${index}-0`]?.completed &&
              gameQuestionStates[`${index}-1`]?.completed;
          return { name: isCompleted ? `${name} ✓` : name };
      });

      return [
          ...WHY_DESIGN_NAV_ITEMS,
          ...caseItems,
          { name: "Bonus" },
          { name: "Your Score" },
      ];
  }, [gameQuestionStates]);

  let whyDesignActiveIndex = 0;
  if (whyDesignStep === 'intro') {
    whyDesignActiveIndex = 0;
  } else if (whyDesignStep === 'game') {
    if (gameStatus === 'playing') {
        if (gameCaseIndex >= 3) { // Check if it's a bonus case
            whyDesignActiveIndex = 4; // "Bonus"
        } else {
            whyDesignActiveIndex = gameCaseIndex + 1; // "Case 1, 2, or 3"
        }
    } else if (gameStatus === 'bonus') {
      whyDesignActiveIndex = 4;
    } else if (gameStatus === 'end') {
      whyDesignActiveIndex = 5;
    }
  }
  
  const resetForStage = useCallback((stageKey, startPlaying = true) => {
    const stageData = DESIGN_CONTENT[stageKey];
    if (!stageData || !stageData.steps || stageData.steps.length === 0) {
      setError(`Content for stage "${stageKey}" is missing or empty.`);
      setIsPlayingDesign(false);
      return;
    }

    setError(null);
    if (stageData.steps[0]) {
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
  
  const navigateToStage = useCallback((stageKey, shouldPlay = true) => {
    setNavigationMode(shouldPlay ? 'automatic' : 'manual');
    resetForStage(stageKey, shouldPlay);
  }, [resetForStage]);

  const nextStep = useCallback(() => {
    setNavigationMode('manual');
    setIsPlayingDesign(false);

    const currentStageData = DESIGN_CONTENT[activeDesignStageKey];
    const isLastStepOfStage = currentDesignStepIndex >= currentStageData.steps.length - 1;
    const isLastStage = activeDesignStageKey === WHAT_DESIGN_NAV_ITEMS[WHAT_DESIGN_NAV_ITEMS.length - 1].name;

    if (isLastStepOfStage && isLastStage) {
      setIsDesignChapterFinished(true);
      return;
    }

    if (!isLastStepOfStage) {
      const nextIndex = currentDesignStepIndex + 1;
      setStepContent(activeDesignStageKey, nextIndex, false);
    } else {
      const currentNavIndex = WHAT_DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      const nextStageKey = WHAT_DESIGN_NAV_ITEMS[currentNavIndex + 1].name;
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
      const currentNavIndex = WHAT_DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
      if (currentNavIndex > 0) {
        const prevStageKey = WHAT_DESIGN_NAV_ITEMS[currentNavIndex - 1].name;
        const prevStageData = DESIGN_CONTENT[prevStageKey];
        const lastStepIndex = prevStageData.steps.length - 1;
        setStepContent(prevStageKey, lastStepIndex, false);
      } else {
        return 'navigate-to-main';
      }
    }

    return 'success';
  }, [activeDesignStageKey, currentDesignStepIndex, setStepContent]);
  
  const nextDesignStage = useCallback(() => {
    const currentIndex = WHAT_DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex < WHAT_DESIGN_NAV_ITEMS.length - 1) {
      setDesignAnimationDirection('next');
      setPreviousDesignStageKey(activeDesignStageKey);
      const nextStageKey = WHAT_DESIGN_NAV_ITEMS[currentIndex + 1].name;
      setActiveDesignStageKey(nextStageKey);
    }
  }, [activeDesignStageKey]);

  const prevDesignStage = useCallback(() => {
    const currentIndex = WHAT_DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex > 0) {
      setDesignAnimationDirection('prev');
      setPreviousDesignStageKey(activeDesignStageKey);
      const prevStageKey = WHAT_DESIGN_NAV_ITEMS[currentIndex - 1].name;
      setActiveDesignStageKey(prevStageKey);
    }
  }, [activeDesignStageKey]);
  
  const togglePlayPause = useCallback(() => {
    setIsPlayingDesign(prev => {
      if (!prev) setNavigationMode('automatic');
      return !prev;
    });
  }, []);

  const replay = useCallback(() => {
    setNavigationMode('automatic');
    setIsDesignChapterFinished(false);
    resetForStage(WHAT_DESIGN_NAV_ITEMS[0].name, true);
  }, [resetForStage]);
  
  const toggleDocumentView = useCallback(() => {
    setDocumentView(prevView => (prevView === 'Slideshow' ? 'Document' : 'Slideshow'));
    setIsPlayingDesign(false);
  }, []);
  
  useEffect(() => {
    const justSwitchedToWhatDesign = prevDesignViewRef.current === DESIGN_VIEWS.WHY_DESIGN && designView === DESIGN_VIEWS.WHAT_DESIGN;
    const justSwitchedToWhyDesign = prevDesignViewRef.current === DESIGN_VIEWS.WHAT_DESIGN && designView === DESIGN_VIEWS.WHY_DESIGN;

    if (justSwitchedToWhatDesign) {
      if (!hasVisitedWhatDesign.current) {
        resetForStage(WHAT_DESIGN_NAV_ITEMS[0].name, true);
        hasVisitedWhatDesign.current = true;
      } else {
        resetForStage(activeDesignStageKey, true);
      }
    } else if (justSwitchedToWhyDesign) {
      if (wasWhyDesignIntroIncompleteOnExit.current) {
        replayWhyDesignIntro();
      }
    }

    if (designView === DESIGN_VIEWS.WHY_DESIGN) {
      wasWhyDesignIntroIncompleteOnExit.current = !whyDesignIntroCompleted;
    }
    
    prevDesignViewRef.current = designView;
  }, [designView, resetForStage, activeDesignStageKey, replayWhyDesignIntro, whyDesignIntroCompleted]);

  useEffect(() => {
    const isOnWhyDesignView = currentChapter === 'design' && designView === DESIGN_VIEWS.WHY_DESIGN;
    
    if (isOnWhyDesignView) {
      if (wasWhyDesignIntroIncompleteOnExit.current) {
        replayWhyDesignIntro();
        wasWhyDesignIntroIncompleteOnExit.current = false; 
      } else if (!hasAutoPlayedWhyDesignIntro.current) {
        setIsPlayingWhyDesignIntro(true);
        hasAutoPlayedWhyDesignIntro.current = true;
      }
    } else {
      setIsPlayingWhyDesignIntro(false);
      hasAutoPlayedWhyDesignIntro.current = false;
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, designView]);

  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingWhyDesignIntro || whyDesignStep !== 'intro') return;

    let timer;
    const currentStepData = WHY_DESIGN_CONTENT.intro.steps[whyDesignIntroStepIndex];

    if (!currentStepData) {
        whyDesignIntroAnimationCompleted();
        return;
    }

    switch (whyDesignAnimationPhase) {
        case 'typing-title':
            if (displayedWhyDesignTitleChars.length < currentStepData.title.length) {
                timer = setTimeout(() => {
                    setDisplayedWhyDesignTitleChars(currentStepData.title.substring(0, displayedWhyDesignTitleChars.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setWhyDesignAnimationPhase('typing-main');
            }
            break;
        case 'typing-main':
            if (displayedWhyDesignMainTextChars.length < currentStepData.mainText.length) {
                timer = setTimeout(() => {
                    setDisplayedWhyDesignMainTextChars(currentStepData.mainText.substring(0, displayedWhyDesignMainTextChars.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setWhyDesignAnimationPhase('pausing');
            }
            break;
        case 'pausing':
            timer = setTimeout(() => {
                if (whyDesignIntroStepIndex < WHY_DESIGN_CONTENT.intro.steps.length - 1) {
                    const nextStepData = WHY_DESIGN_CONTENT.intro.steps[whyDesignIntroStepIndex + 1];
                    setWhyDesignIntroStepIndex(prev => prev + 1);

                    if (nextStepData.title === currentStepData.title) {
                        setDisplayedWhyDesignMainTextChars('');
                        setWhyDesignAnimationPhase('typing-main');
                    } else {
                        setDisplayedWhyDesignTitleChars('');
                        setDisplayedWhyDesignMainTextChars('');
                        setWhyDesignAnimationPhase('typing-title');
                    }
                } else {
                    whyDesignIntroAnimationCompleted();
                }
            }, 1600);
            break;
        default:
            break;
    }

    return () => clearTimeout(timer);
  }, [
      currentChapter, 
      designView, 
      whyDesignStep, 
      isPlayingWhyDesignIntro, 
      whyDesignIntroStepIndex, 
      whyDesignAnimationPhase, 
      displayedWhyDesignTitleChars, 
      displayedWhyDesignMainTextChars, 
      whyDesignIntroAnimationCompleted
  ]);
  
  useEffect(() => {
    const justEnteredDesign = prevChapterRef.current !== 'design' && currentChapter === 'design';

    if (currentChapter !== 'design') {
      wasPlayingRef.current = isPlayingDesign;
      setIsPlayingDesign(false);
      if (designView === DESIGN_VIEWS.WHY_DESIGN) {
        wasWhyDesignIntroIncompleteOnExit.current = !whyDesignIntroCompleted;
      }
    } else {
      if (designView === DESIGN_VIEWS.WHAT_DESIGN) {
        if (justEnteredDesign && documentView === 'Slideshow' && !isDesignChapterFinished) {
          resetForStage(activeDesignStageKey, true);
        } else if (wasPlayingRef.current && !isDesignChapterFinished && documentView === 'Slideshow') {
          setIsPlayingDesign(true);
        }
      }
    }

    prevChapterRef.current = currentChapter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter, designView, documentView, activeDesignStageKey, isDesignChapterFinished, resetForStage, whyDesignIntroCompleted]);

  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign || navigationMode !== 'automatic' || designStepAnimationPhase !== 'all-steps-complete' || documentView !== 'Slideshow') {
      return;
    }

    const currentIndex = WHAT_DESIGN_NAV_ITEMS.findIndex(item => item.name === activeDesignStageKey);
    if (currentIndex >= WHAT_DESIGN_NAV_ITEMS.length - 1) {
      setIsPlayingDesign(false);
      setIsDesignChapterFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFadingOut(false);
        const nextIndex = currentIndex + 1;
        const nextStageKey = WHAT_DESIGN_NAV_ITEMS[nextIndex].name;
        resetForStage(nextStageKey, true);
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentChapter, isPlayingDesign, designStepAnimationPhase, activeDesignStageKey, resetForStage, navigationMode, documentView]);

  useEffect(() => {
    if (currentChapter !== 'design' || !isPlayingDesign || documentView !== 'Slideshow' || designView !== DESIGN_VIEWS.WHAT_DESIGN) return;

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
  }, [currentChapter, isPlayingDesign, activeDesignStageKey, currentDesignStepIndex, designStepAnimationPhase, displayedDesignTitleChars, displayedDesignMainTextChars, documentView, designView]);
  
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
    setDesignView,
    documentView,
    previousDesignStageKey,
    designAnimationDirection,
    navigateToStage,
    nextStep,
    prevStep,
    togglePlayPause,
    replay,
    toggleDocumentView,
    nextDesignStage,
    prevDesignStage,
    whyDesignStep,
    whyDesignIntroCompleted,
    whyDesignIntroStepIndex,
    whyDesignIntroResetKey,
    replayWhyDesignIntro,
    returnToIntro,
    goBackToIntro,
    isPlayingWhyDesignIntro,
    togglePlayPauseWhyDesignIntro,
    handleStartWhyDesignGame,
    handleNextWhyDesignIntroLine,
    handlePrevWhyDesignIntroLine,
    gameStatus,
    gameScore,
    gameCaseIndex,
    gamePartIndex,
    gameQuestionStates,
    gameSelectedAnswers,
    handleGameOptionClick,
    handleGameSubmitSelectAll,
    handleGameNext,
    handleGamePrev,
    resetGame,
    startBonusCase,
    startRandomBonusCase, 
    setGameStatus,
    whyDesignNavItems,
    whyDesignActiveIndex,
    navigateToWhyDesignStep,
    displayedWhyDesignTitleChars,
    displayedWhyDesignMainTextChars,
    whyDesignAnimationPhase,
    navigateToGameCase
  };
};