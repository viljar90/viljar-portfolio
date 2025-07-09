// src/hooks/useWorkChapter.js

import { useState, useMemo } from 'react';
import { QUIZZES, PROJECTS } from '../content';

export const useWorkChapter = () => {
  const [workView, setWorkView] = useState('Quiz');
  const [workStepIndex, setWorkStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [introCompleted, setIntroCompleted] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const WORK_NAV_ITEMS = useMemo(() => [{ name: 'Start' }, ...QUIZZES.map((quiz, index) => ({ name: `Question ${index + 1}` }))], []);

  // New function to be called by the QuizIntro component itself
  const markIntroAsCompleted = () => {
    if (!introCompleted) {
      setIntroCompleted(true);
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
  
  const handleNextProject = () => {
    setCurrentProjectIndex(prevIndex => (prevIndex + 1) % PROJECTS.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex(prevIndex => (prevIndex - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const resetWorkChapter = () => {
    setWorkStepIndex(0);
    setQuizAnswers({});
    setIntroCompleted(false);
    setCurrentProjectIndex(0);
  }

  return {
    // State values
    workView,
    workStepIndex,
    quizAnswers,
    introCompleted,
    currentProjectIndex,
    WORK_NAV_ITEMS,

    // State setters
    setWorkView,
    setWorkStepIndex,
    setQuizAnswers,

    // Handlers
    handleQuizAnswer,
    handleReplayQuestion,
    resetWorkChapter,
    markIntroAsCompleted,
    handleNextProject,
    handlePrevProject,
  };
};