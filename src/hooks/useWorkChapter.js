// src/hooks/useWorkChapter.js

import { useState, useMemo, useCallback } from 'react';
import { QUIZZES, PROJECTS } from '../content';

export const useWorkChapter = (currentChapter, isAppReady) => {
  const [workView, setWorkView] = useState('Quiz');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeProjectSection, setActiveProjectSection] = useState('problem');
  const [workStepIndex, setWorkStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [introCompleted, setIntroCompleted] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [previousProjectIndex, setPreviousProjectIndex] = useState(null);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [previousWorkStepIndex, setPreviousWorkStepIndex] = useState(null);
  const [workAnimationDirection, setWorkAnimationDirection] = useState('next');

  const WORK_NAV_ITEMS = useMemo(() => [
    { name: 'Start' },
    ...QUIZZES.map((quiz, index) => ({ name: `Question ${index + 1}` })),
    { name: 'Results' }
  ], []);


  const PROJECT_NAV_ITEMS = useMemo(() => PROJECTS.map(project => ({ name: project.navText, id: project.id })), []);

  const markIntroAsCompleted = () => {
    if (!introCompleted) {
      setIntroCompleted(true);
    }
  };

  const handleQuizAnswer = (quizId, option) => {
    setQuizAnswers(prev => {
      const existingAnswer = prev[quizId] || { attempts: 0 };

      if (existingAnswer.correct) {
        return prev;
      }

      return {
        ...prev,
        [quizId]: {
          selected: option.text,
          correct: option.isCorrect,
          attempts: existingAnswer.attempts + 1,
        }
      };
    });
  };

  const handleReplayQuestion = (quizId) => {
    setQuizAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[quizId];
        return newAnswers;
    });
  };

  const handleNextQuestion = useCallback(() => {
    setWorkAnimationDirection('next');
    setPreviousWorkStepIndex(workStepIndex);
    setWorkStepIndex(prev => prev + 1);
  }, [workStepIndex]);

  const handlePrevQuestion = useCallback(() => {
    setWorkAnimationDirection('prev');
    setPreviousWorkStepIndex(workStepIndex);
    setWorkStepIndex(prev => prev - 1);
  }, [workStepIndex]);

    const handleWorkNavItemClick = (index) => {
    if (index !== workStepIndex) {
      if (index > workStepIndex) {
        setWorkAnimationDirection('next');
      } else {
        setWorkAnimationDirection('prev');
      }
      setPreviousWorkStepIndex(workStepIndex);
      setWorkStepIndex(index);
    }
  };


  const handleNextProject = () => {
    setAnimationDirection('next');
    setPreviousProjectIndex(currentProjectIndex);
    setCurrentProjectIndex(prevIndex => (prevIndex + 1) % PROJECTS.length);
  };

  const handlePrevProject = () => {
    setAnimationDirection('prev');
    setPreviousProjectIndex(currentProjectIndex);
    setCurrentProjectIndex(prevIndex => (prevIndex - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleProjectNavItemClick = (projectId) => {
    const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
    if (projectIndex !== -1 && projectIndex !== currentProjectIndex) {
      if (projectIndex > currentProjectIndex) {
        setAnimationDirection('next');
      } else {
        setAnimationDirection('prev');
      }
      setPreviousProjectIndex(currentProjectIndex);
      setCurrentProjectIndex(projectIndex);
    }
  };

  const resetWorkChapter = useCallback(() => {
    setWorkStepIndex(0);
    setQuizAnswers({});
    setIntroCompleted(false);
    setCurrentProjectIndex(0);
    setPreviousProjectIndex(null);
    setPreviousWorkStepIndex(null);
  }, []);

  const handleWorkChapterCentralButtonClick = useCallback(() => {
    if (workStepIndex > QUIZZES.length) {
        resetWorkChapter();
    } else {
        handleNextQuestion();
    }
  }, [workStepIndex, handleNextQuestion, resetWorkChapter]);


  return {
    workView,
    workStepIndex,
    quizAnswers,
    introCompleted,
    currentProjectIndex,
    previousProjectIndex,
    animationDirection,
    WORK_NAV_ITEMS,
    PROJECT_NAV_ITEMS,
    previousWorkStepIndex,
    workAnimationDirection,
    activeProjectId,
    activeProjectSection,
    setWorkView,
    setWorkStepIndex,
    setCurrentProjectIndex,
    setQuizAnswers, // <-- Keep this for restoring state
    setPreviousProjectIndex,
    setPreviousWorkStepIndex,
    setActiveProjectId,
    setActiveProjectSection,
    handleQuizAnswer,
    handleReplayQuestion,
    resetWorkChapter,
    markIntroAsCompleted,
    handleNextProject,
    handlePrevProject,
    handleProjectNavItemClick,
    handleNextQuestion,
    handlePrevQuestion,
    handleWorkNavItemClick,
    handleWorkChapterCentralButtonClick,
  };
};