// src/components/QuizResults.js

import React from 'react';
import PropTypes from 'prop-types';
import { QUIZZES } from '../content';
import { PrimaryButton, SecondaryButton, ReplayIcon } from './uiElements';

const StatBox = ({ title, value, subtext, children, className = '' }) => (
  <div className={`bg-bg-base dark:border dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between shadow-lg h-full ${className}`}>
    <p className="text-lg font-semibold text-text-muted text-left">{title}</p>
    <div className="flex-grow flex items-center justify-center">
      {value && <div className="text-4xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-secondary my-2 text-center">{value}</div>}
      {children}
    </div>
    {subtext && <p className="text-sm text-text-muted text-center mt-2">{subtext}</p>}
  </div>
);

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtext: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

const getResultMessage = (allAnswered, accuracy, answeredCount) => {
  if (!allAnswered) {
    if (answeredCount === 0) {
      return "Skipped all? That mentality won't get you anywhere!";
    }
    return "Keep going! Just a few more to go.";
  }

  if (accuracy === 100) {
    return "Perfect score! You gotta know me already!";
  }
  if (accuracy >= 70) {
    return "Wow! I'm impressed.";
  }
  if (accuracy >= 55) {
    return "Excellent job! You got good instincts.";
  }
  if (accuracy >= 40) {
    return "Nice one! Not too shabby.";
  }
  if (accuracy >= 30) {
    return "You did ok. The questions are tough!";
  }
  return "Good effort! You never gave up!";
};

const QuizResults = ({ quizAnswers, onReset, onSwitchView }) => {
  const totalQuestions = QUIZZES.length;
  const answeredQuestions = Object.values(quizAnswers).filter(answer => answer.correct).length;

  const totalAttempts = Object.values(quizAnswers).reduce((acc, curr) => acc + curr.attempts, 0);
  const correctAnswers = Object.values(quizAnswers).filter(answer => answer.correct).length;
  const wrongAttempts = totalAttempts - correctAnswers;
  const skippedQuestions = totalQuestions - Object.keys(quizAnswers).length;

  const accuracy = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;
  const allAnswered = answeredQuestions === totalQuestions;
  const resultMessage = getResultMessage(allAnswered, accuracy, answeredQuestions);

  return (
    <div className="text-center max-w-4xl w-full animate-fadeIn">
      {allAnswered ? (
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-secondary mb-12">
          Quiz Completed!
        </h1>
      ) : (
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-secondary mb-12">
          Quiz in Progress
        </h1>
      )}

      {/* Layout for small screens and up */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatBox title="Completed" value={`${correctAnswers}/${totalQuestions}`} />
        <StatBox title="Accuracy" value={`${accuracy}%`} />
        <StatBox title="">
          <div className="w-full text-xl md:text-2xl lg:text-3xl">
            <div className="flex justify-between">
              <span className="font-semibold text-text-muted">Hits</span>
              <span className="font-bold text-green-500">{correctAnswers}</span>
            </div>
            <div className="flex justify-between my-2">
              <span className="font-semibold text-text-muted">Missed</span>
              <span className="font-bold text-error">{wrongAttempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-text-muted">Skips</span>
              <span className="font-bold text-text-muted">{skippedQuestions}</span>
            </div>
          </div>
        </StatBox>
      </div>

      {/* Unified layout for extra-small screens */}
      <div className="block sm:hidden mb-12 px-4">
        <div className="bg-bg-base dark:border dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-text-muted">Completed</p>
            <p className="text-2xl font-bold text-primary dark:text-secondary">{`${correctAnswers}/${totalQuestions}`}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-text-muted">Accuracy</p>
            <p className="text-2xl font-bold text-primary dark:text-secondary">{`${accuracy}%`}</p>
          </div>
          <hr className="border-gray-200 dark:border-gray-700 my-4" />
          <div className="text-lg">
            <div className="flex justify-between">
              <span className="font-semibold text-text-muted">Hits</span>
              <span className="font-bold text-green-500">{correctAnswers}</span>
            </div>
            <div className="flex justify-between my-2">
              <span className="font-semibold text-text-muted">Missed</span>
              <span className="font-bold text-error">{wrongAttempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-text-muted">Skips</span>
              <span className="font-bold text-text-muted">{skippedQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xl text-text-base dark:text-text-muted mb-12 h-8">
        {resultMessage}
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <SecondaryButton
            onClick={onReset}
            icon={ReplayIcon}
        >
            {allAnswered ? 'Play Again' : 'Start Over'}
        </SecondaryButton>
        <PrimaryButton onClick={() => onSwitchView('Overview')}>
            Work Overview
        </PrimaryButton>
      </div>
    </div>
  );
};

QuizResults.propTypes = {
  quizAnswers: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
};

export default QuizResults;