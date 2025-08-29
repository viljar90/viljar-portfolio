// src/components/QuizResultCard.js

import React from 'react';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
import { ReplayIcon, NewTabIcon } from './uiElements';

// --- THIS IS THE FIX ---
// We now accept 'quizAnswers' as a prop to build the stateful link.
const QuizResultCard = ({ quiz, onReplayQuestion, quizAnswers }) => {
  // Function to serialize the quiz state into a URL-safe string
  const serializeState = (answers) => {
    try {
      // Ensure answers is an object before stringifying
      const validAnswers = (typeof answers === 'object' && answers !== null) ? answers : {};
      const jsonString = JSON.stringify(validAnswers);
      return encodeURIComponent(jsonString);
    } catch (e) {
      console.error("Failed to serialize quiz state:", e);
      return '';
    }
  };
  
  const savedState = serializeState(quizAnswers);

  return (
    <div className="relative w-full max-w-xl p-6 md:p-8 bg-bg-base dark:border dark:border-gray-700 rounded-xl shadow-2xl animate-fadeIn text-left">
      <ConfettiExplosion />

      <button
        onClick={() => onReplayQuestion(quiz.id)}
        className="absolute top-3 right-3 p-2 rounded-full text-text-muted hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-text-base dark:hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Replay question"
      >
        <ReplayIcon className="w-5 h-5" />
      </button>

      <div className="flex items-center">
        <span role="img" aria-label="party popper" className="text-3xl mr-3">🎉</span>
        <h3 className="text-3xl font-bold text-text-base dark:text-white">Correct!</h3>
      </div>
      <p className="mt-4 text-lg text-text-muted dark:text-slate-300">
        {quiz.resultText}
      </p>

      <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-text-muted dark:text-slate-400">
        {quiz.summaryPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
        <p className="text-sm text-text-muted dark:text-slate-400">Check out my work on this</p>
        
        {/* --- THIS IS THE FIX --- */}
        {/* The href now includes the full saved state of the quiz. */}
        <a 
          href={`#work/project/${quiz.id}/problem?from=work/quiz/${quiz.slug}&state=${savedState}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-lg font-semibold text-primary dark:text-sky-400 hover:text-secondary dark:hover:text-sky-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center space-x-2"
        >
          <span>{quiz.projectButtonText}</span>
          <NewTabIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

QuizResultCard.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    resultText: PropTypes.string.isRequired,
    summaryPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
    projectButtonText: PropTypes.string.isRequired,
    projectUrl: PropTypes.string,
  }).isRequired,
  onReplayQuestion: PropTypes.func.isRequired,
  quizAnswers: PropTypes.object, // Changed to not required, as it might not be passed initially
};

export default QuizResultCard;