// src/hooks/useWorkChapter.js

import { useState, useMemo } from 'react';
import { QUIZZES } from '../content';

export const useWorkChapter = () => {
  const [workView, setWorkView] = useState('Quiz');
  const [workStepIndex, setWorkStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const WORK_NAV_ITEMS = useMemo(() => [{ name: 'Start' }, ...QUIZZES.map((quiz, index) => ({ name: `Question ${index + 1}` }))], []);

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

  const resetWorkChapter = () => {
    setWorkStepIndex(0);
    setQuizAnswers({});
  }

  return {
    // State values
    workView,
    workStepIndex,
    quizAnswers,
    WORK_NAV_ITEMS,

    // State setters
    setWorkView,
    setWorkStepIndex,
    setQuizAnswers,

    // Handlers
    handleQuizAnswer,
    handleReplayQuestion,
    resetWorkChapter,
  };
};