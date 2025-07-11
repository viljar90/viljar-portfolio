// src/components/QuizOptionCardButton.js

import React from 'react';
import PropTypes from 'prop-types';

const QuizOptionCardButton = ({ option, isSelected, onAnswer }) => {
  // Base classes with updated hover effects
  const baseButtonClasses = `
    block w-full text-left p-4 rounded-lg transition-all duration-200
    md:text-center md:flex md:items-center md:justify-center md:h-40
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
    transform hover:scale-103 hover:shadow-lg
  `;

  // Use the new Tailwind class for the border
  let buttonStateClasses = 'border border-interactive hover:border-primary hover:bg-primary/10 text-text-base';
  if (isSelected) {
    buttonStateClasses = option.isCorrect ? '' : 'bg-error/20 border border-error text-text-base animate-shake';
  }

  return (
    <button
      onClick={() => onAnswer(option)}
      className={`${baseButtonClasses} ${buttonStateClasses}`}
    >
      {option.text}
    </button>
  );
};

QuizOptionCardButton.propTypes = {
  option: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuizOptionCardButton;