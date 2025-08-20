// src/components/WhyDesignGame.js

import React from 'react';
import PropTypes from 'prop-types';
import { WHY_DESIGN_GAME_CONTENT } from '../content';
import { PrimaryButton, SecondaryButton } from './uiElements';

const CheckmarkIcon = () => (
    <svg 
        className="absolute top-4 right-4 h-5 w-5 text-primary dark:text-secondary" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const BonusCheckmarkIcon = () => (
    <svg 
        className="h-5 w-5 text-primary dark:text-secondary" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const WhyDesignGame = ({
  gameStatus,
  gameScore,
  gameCaseIndex,
  gamePartIndex,
  gameQuestionStates,
  gameSelectedAnswers,
  handleGameOptionClick,
  handleGameSubmitSelectAll,
  handleGameNext,
  resetGame,
  startBonusCase,
  setGameStatus,
  onSwitchView,
}) => {
  const MAIN_CASES_COUNT = 3;
  const currentCase = WHY_DESIGN_GAME_CONTENT[gameCaseIndex];
  const currentQuestion = currentCase?.parts[gamePartIndex];
  const questionId = `${gameCaseIndex}-${gamePartIndex}`;
  const state = gameQuestionStates[questionId];

  if (gameStatus === 'playing' && currentQuestion) {
    const isSelectAll = currentQuestion.type === 'selectAll';
    const correctAnswersCount = currentQuestion.options.filter(o => o.isCorrect).length;
    const canSubmit = gameSelectedAnswers.length === correctAnswersCount;

    return (
      <div className="bg-bg-base dark:border dark:border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-semibold text-text-muted">{currentCase.caseTitle} - Part {gamePartIndex + 1}</div>
          <div className="text-sm font-semibold text-text-muted">Score: {Math.round(gameScore)}</div>
        </div>
        <h2 className="text-xl sm:text-2xl mb-6 text-text-base leading-relaxed text-left">
          <span className="font-normal">{currentQuestion.context}</span><br /><br /><span className="font-bold">{currentQuestion.question}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map(option => {
            const isCompleted = state?.completed;
            const isRevealed = state?.revealedOptions?.includes(option.text);
            const isSelected = isSelectAll ? gameSelectedAnswers.includes(option.text) : false;
            const wasSelected = isCompleted && state.selected && state.selected.includes(option.text);

            let cardClasses = 'option-card rounded-lg border-2 cursor-pointer bg-bg-base dark:bg-bg-muted ';
            let isDisabled = false;

            if (isSelectAll) {
              isDisabled = isCompleted;
              if (isCompleted) {
                if(option.isCorrect) {
                    cardClasses += 'correct border-green-500 bg-green-50 dark:bg-green-900/50 ';
                } else if (state && state.selected && state.selected.includes(option.text)) {
                    cardClasses += 'incorrect border-red-500 bg-red-50 dark:bg-red-900/50 ';
                } else {
                    cardClasses += 'border-border-interactive opacity-70 ';
                }
              } else {
                if (isSelected) cardClasses += 'selected border-primary dark:border-secondary ';
                else cardClasses += 'border-border-interactive hover:border-primary dark:hover:border-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 ';
              }
            } else { // singleChoice
              isDisabled = isCompleted || isRevealed;
              if (isCompleted) {
                cardClasses += option.isCorrect ? 'correct border-green-500 bg-green-50 dark:bg-green-900/50 ' : 'incorrect border-red-500 bg-red-50 dark:bg-red-900/50 opacity-70 ';
              } else if (isRevealed) {
                cardClasses += 'incorrect border-red-500 bg-red-50 dark:bg-red-900/50 ';
              } else {
                cardClasses += 'border-border-interactive hover:border-primary dark:hover:border-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 ';
              }
            }

            if (isDisabled) cardClasses += 'disabled ';
            const showRationale = isCompleted || isRevealed;

            return (
              <button
                key={option.text}
                onClick={() => handleGameOptionClick(option)}
                className={`relative w-full text-left p-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-slate-800 flex items-start ${cardClasses}`}
                disabled={isDisabled}
              >
                <div className="w-full">
                    {isSelectAll && (isSelected || wasSelected) && <CheckmarkIcon />}
                    <p className="text-text-base font-medium pr-8">{option.text}</p>
                    
                    <div className={`overflow-hidden transition-[max-height,margin-top] duration-500 ease-in-out ${showRationale ? 'max-h-96 mt-3' : 'max-h-0 mt-0'}`}>
                        <p className="text-sm text-text-muted">{option.rationale}</p>
                    </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-8 text-center flex justify-center gap-4 min-h-[48px]">
          {state?.completed && (
            <PrimaryButton onClick={handleGameNext}>
              {gamePartIndex >= currentCase.parts.length - 1 ? 'Next Case' : 'Part 2'}
            </PrimaryButton>
          )}
          {!state?.completed && isSelectAll && (
              <PrimaryButton onClick={handleGameSubmitSelectAll} disabled={!canSubmit} className={!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}>
                {canSubmit ? 'Check selection' : `Selected ${gameSelectedAnswers.length}/${correctAnswersCount}`}
              </PrimaryButton>
          )}
        </div>
      </div>
    );
  }

  if (gameStatus === 'bonus') {
    return (
        <div className="text-center p-8 bg-bg-base dark:border dark:border-grey-700 rounded-xl shadow-lg animate-scale-in">
            <h1 className="text-4xl font-bold text-text-base mb-4">Want Bonus Rounds?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_DESIGN_GAME_CONTENT.slice(MAIN_CASES_COUNT).map((bonusCase, index) => {
                     const caseIndex = MAIN_CASES_COUNT + index;
                     const isCompleted = gameQuestionStates[`${caseIndex}-0`]?.completed && gameQuestionStates[`${caseIndex}-1`]?.completed;
                     return (
                        <button key={bonusCase.caseTitle} onClick={() => startBonusCase(caseIndex)}
                            className={`relative bonus-card py-4 px-4 rounded-full border-2 bg-bg-base dark:bg-bg-muted text-center transition-all flex items-center justify-center space-x-2 ${isCompleted ? 'completed border-green-500' : 'border-border-interactive'}`}>
                            <h3 className="text-lg font-bold text-text-base">{bonusCase.caseTitle}</h3>
                            {isCompleted && <BonusCheckmarkIcon />}
                        </button>
                     )
                })}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <PrimaryButton onClick={() => setGameStatus('end')}>Finish Game</PrimaryButton>
            </div>
        </div>
    )
  }

  if (gameStatus === 'end') {
    return (
      <div className="text-center p-8 bg-bg-base dark:border dark:border-grey-700 rounded-xl shadow-lg animate-scale-in">
        <h1 className="text-4xl font-bold text-text-base mb-2">Quiz Complete!</h1>
        <p className="text-xl text-text-muted mb-6">Here's your final score:</p>
        <div className="text-6xl font-bold text-primary dark:text-secondary my-8">{Math.round(gameScore)}</div>
        <p className="text-text-muted max-w-2xl mx-auto mb-8">
          Understanding the common pitfalls is the first step to avoiding them. Good design is about mitigating risk and creating real value.
        </p>
        <div className="flex justify-center gap-4">
          <SecondaryButton onClick={resetGame}>Play Again</SecondaryButton>
          <PrimaryButton onClick={onSwitchView}>What Design</PrimaryButton>
        </div>
      </div>
    );
  }

  return null;
};

WhyDesignGame.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  gameScore: PropTypes.number.isRequired,
  gameCaseIndex: PropTypes.number.isRequired,
  gamePartIndex: PropTypes.number.isRequired,
  gameQuestionStates: PropTypes.object.isRequired,
  gameSelectedAnswers: PropTypes.array.isRequired,
  handleGameOptionClick: PropTypes.func.isRequired,
  handleGameSubmitSelectAll: PropTypes.func.isRequired,
  handleGameNext: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  startBonusCase: PropTypes.func.isRequired,
  setGameStatus: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
};

export default WhyDesignGame;