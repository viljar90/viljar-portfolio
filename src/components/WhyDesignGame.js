// src/components/WhyDesignGame.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { WHY_DESIGN_GAME_CONTENT } from '../content';
import { PrimaryButton, SecondaryButton } from './uiElements';

// Reusable Checkmark Icon
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

const WhyDesignGame = ({ onGameComplete }) => {
    // ** THE FIX **: The initial state is now 'playing'
    const [gameState, setGameState] = useState('playing'); 
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questionStates, setQuestionStates] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const MAIN_CASES_COUNT = 3;

    // The 'Play Again' button will use this function
    const startGame = () => {
        setCurrentCaseIndex(0);
        setCurrentPartIndex(0);
        setScore(0);
        setQuestionStates({});
        setSelectedAnswers([]);
        setGameState('playing');
    };

    const handleNext = () => {
        // ... (this function remains the same)
        setSelectedAnswers([]);
        const isLastPart = currentPartIndex >= WHY_DESIGN_GAME_CONTENT[currentCaseIndex].parts.length - 1;
        const isMainFlowComplete = currentCaseIndex < MAIN_CASES_COUNT && currentCaseIndex === MAIN_CASES_COUNT - 1 && isLastPart;
        const isBonusCase = currentCaseIndex >= MAIN_CASES_COUNT;

        if (!isLastPart) {
            setCurrentPartIndex(prev => prev + 1);
        } else if (isMainFlowComplete) {
            setGameState('bonus');
        } else if (isBonusCase && isLastPart){
            setGameState('bonus');
        }
        else if (currentCaseIndex < WHY_DESIGN_GAME_CONTENT.length - 1) {
            setCurrentCaseIndex(prev => prev + 1);
            setCurrentPartIndex(0);
        } else {
            setGameState('end');
        }
    };

    const handleOptionClick = (option) => {
        // ... (this function remains the same)
        const questionId = `${currentCaseIndex}-${currentPartIndex}`;
        const question = WHY_DESIGN_GAME_CONTENT[currentCaseIndex].parts[currentPartIndex];
        const currentState = questionStates[questionId] || {};

        if (currentState.completed || (currentState.revealedOptions && currentState.revealedOptions.includes(option.text))) {
            return;
        }

        if (question.type === 'singleChoice') {
            if (option.isCorrect) {
                if (!currentState.completed) {
                    setScore(s => s + 100);
                }
                setQuestionStates(prev => ({
                    ...prev,
                    [questionId]: { ...currentState, completed: true }
                }));
            } else {
                const newRevealed = [...(currentState.revealedOptions || []), option.text];
                setQuestionStates(prev => ({
                    ...prev,
                    [questionId]: { ...currentState, revealedOptions: newRevealed }
                }));
            }
        } else if (question.type === 'selectAll') {
            setSelectedAnswers(prev => 
                prev.includes(option.text) ? prev.filter(a => a !== option.text) : [...prev, option.text]
            );
        }
    };

    const handleSubmitSelectAll = () => {
        // ... (this function remains the same)
        const questionId = `${currentCaseIndex}-${currentPartIndex}`;
        if (questionStates[questionId]?.completed) return;

        const question = WHY_DESIGN_GAME_CONTENT[currentCaseIndex].parts[currentPartIndex];
        const correctOptions = question.options.filter(o => o.isCorrect).map(o => o.text);
        
        let awardedScore = 0;
        selectedAnswers.forEach(answer => {
            if (correctOptions.includes(answer)) {
                awardedScore += (100 / correctOptions.length);
            }
        });

        setScore(s => s + awardedScore);
        setQuestionStates(prev => ({ ...prev, [questionId]: { completed: true, selected: selectedAnswers } }));
    };

    const startBonusCase = (index) => {
        setCurrentCaseIndex(index);
        setCurrentPartIndex(0);
        setSelectedAnswers([]);
        setGameState('playing');
    }

    const currentCase = WHY_DESIGN_GAME_CONTENT[currentCaseIndex];
    const currentQuestion = currentCase?.parts[currentPartIndex];
    const questionId = `${currentCaseIndex}-${currentPartIndex}`;
    const state = questionStates[questionId];
    
    // ** THE FIX **: Removed the 'start' screen JSX block entirely

    if (gameState === 'playing' && currentQuestion) {
        // ... (The entire 'playing' screen JSX remains the same)
        const isSelectAll = currentQuestion.type === 'selectAll';
        const correctAnswersCount = currentQuestion.options.filter(o => o.isCorrect).length;
        const canSubmit = selectedAnswers.length === correctAnswersCount;

        return (
            <div className="bg-bg-base dark:bg-bg-overlay p-6 sm:p-8 rounded-xl shadow-lg animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-semibold text-text-muted">{currentCase.caseTitle} - Part {currentPartIndex + 1}</div>
                    <div className="text-sm font-semibold text-text-muted">Score: {Math.round(score)}</div>
                </div>
                <h2 className="text-xl sm:text-2xl mb-6 text-text-base leading-relaxed text-left">
                    <span className="font-normal">{currentQuestion.context}</span><br/><br/><span className="font-bold">{currentQuestion.question}</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentQuestion.options.map(option => {
                        const isCompleted = state?.completed;
                        const isRevealed = state?.revealedOptions?.includes(option.text);
                        const isSelected = isSelectAll ? selectedAnswers.includes(option.text) : false;

                        let cardClasses = 'relative option-card p-4 rounded-lg border-2 cursor-pointer bg-bg-base dark:bg-bg-muted ';
                        let isDisabled = false;
                        
                        if (isSelectAll) {
                            isDisabled = isCompleted;
                            if (isCompleted) {
                                if(option.isCorrect) cardClasses += 'correct border-green-500 bg-green-50 dark:bg-green-900/50 ';
                                else if (state.selected.includes(option.text)) cardClasses += 'incorrect border-red-500 bg-red-50 dark:bg-red-900/50 ';
                                else cardClasses += 'border-border-interactive opacity-70 ';
                            } else {
                                if (isSelected) cardClasses += 'selected border-primary dark:border-secondary ';
                                else cardClasses += 'border-border-interactive hover:border-primary dark:hover:border-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 ';
                            }
                        } else { 
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
                            <div key={option.text} className={cardClasses} onClick={() => handleOptionClick(option)}>
                                {isSelectAll && isSelected && <CheckmarkIcon />}
                                <p className="text-text-base font-medium">{option.text}</p>
                                {showRationale && (
                                    <p className="rationale visible text-sm text-text-muted">{option.rationale}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center flex justify-center gap-4">
                    {state?.completed ? (
                        <PrimaryButton onClick={handleNext}>
                           {currentPartIndex >= currentCase.parts.length - 1 ? 'Continue' : 'To Part Two'}
                        </PrimaryButton>
                    ) : (
                       <>
                        {isSelectAll ? (
                           <PrimaryButton onClick={handleSubmitSelectAll} disabled={!canSubmit} className={!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}>
                             {canSubmit ? 'Check selection' : `Selected ${selectedAnswers.length}/${correctAnswersCount}`}
                           </PrimaryButton>
                        ) : <SecondaryButton onClick={handleNext}>Skip</SecondaryButton>}
                       </>
                    )}
                </div>
            </div>
        );
    }

    if (gameState === 'bonus') {
        // ... (Bonus screen JSX remains the same)
        const availableBonusCases = WHY_DESIGN_GAME_CONTENT.slice(MAIN_CASES_COUNT).filter((_, index) => {
            const caseIndex = MAIN_CASES_COUNT + index;
            return !(questionStates[`${caseIndex}-0`]?.completed && questionStates[`${caseIndex}-1`]?.completed);
        });
        
        return (
            <div className="text-center p-8 bg-bg-base dark:bg-bg-overlay rounded-xl shadow-lg animate-scale-in">
                <h1 className="text-4xl font-bold text-text-base mb-4">Want Bonus Rounds?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WHY_DESIGN_GAME_CONTENT.slice(MAIN_CASES_COUNT).map((bonusCase, index) => {
                         const caseIndex = MAIN_CASES_COUNT + index;
                         const isCompleted = questionStates[`${caseIndex}-0`]?.completed && questionStates[`${caseIndex}-1`]?.completed;
                         return (
                            <button key={bonusCase.caseTitle} onClick={() => startBonusCase(caseIndex)}
                                className={`bonus-card py-4 px-6 rounded-full border-2 bg-bg-base dark:bg-bg-muted text-center transition-all ${isCompleted ? 'completed border-green-500' : 'border-border-interactive'}`}>
                                <h3 className="text-lg font-bold text-text-base">{bonusCase.caseTitle}</h3>
                                {isCompleted && <CheckmarkIcon />}
                            </button>
                         )
                    })}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <SecondaryButton onClick={() => startBonusCase(MAIN_CASES_COUNT + Math.floor(Math.random() * availableBonusCases.length))} disabled={availableBonusCases.length === 0}>
                        Select Random
                    </SecondaryButton>
                    <PrimaryButton onClick={() => setGameState('end')}>Finish Game</PrimaryButton>
                </div>
            </div>
        )
    }

    if (gameState === 'end') {
        // ... (End screen JSX remains the same, but it uses the corrected 'startGame' for "Play Again")
         return (
            <div className="text-center p-8 bg-bg-base dark:bg-bg-overlay rounded-xl shadow-lg animate-scale-in">
                <h1 className="text-4xl font-bold text-text-base mb-2">Quiz Complete!</h1>
                <p className="text-xl text-text-muted mb-6">Here's your final score:</p>
                <div className="text-6xl font-bold text-primary dark:text-secondary my-8">{Math.round(score)}</div>
                <p className="text-text-muted max-w-2xl mx-auto mb-8">
                    Understanding the common pitfalls is the first step to avoiding them. Good design is about mitigating risk and creating real value.
                </p>
                <div className="flex justify-center gap-4">
                    <SecondaryButton onClick={startGame}>Play Again</SecondaryButton>
                    <PrimaryButton onClick={onGameComplete}>Back to Intro</PrimaryButton>
                </div>
            </div>
        );
    }

  return null;
};

WhyDesignGame.propTypes = {
  onGameComplete: PropTypes.func.isRequired,
};

export default WhyDesignGame;