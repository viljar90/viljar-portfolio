// src/components/WorkChapter.js

import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { ReplayIcon } from './uiElements';

const WorkChapter = ({ darkMode, quiz, onAnswer, answerState, onReplayQuestion }) => {
    if (!quiz) return null;

    const { question, options, resultText, summaryPoints, projectButtonText } = quiz;
    const { selected, correct } = answerState || {};

    const questionParts = question.split('\n');
    const statement = questionParts[0];
    const mainQuestion = questionParts[1];

    const ResultCard = () => (
        <div className="relative w-full max-w-xl p-6 md:p-8 bg-bg-muted dark:bg-slate-800 rounded-xl shadow-2xl animate-fadeIn text-left">
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
                {resultText}
            </p>

            <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-text-muted dark:text-slate-400">
                {summaryPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-text-muted dark:text-slate-400">Check out the one I've worked on</p>
                <button className="mt-2 text-lg font-semibold text-primary dark:text-sky-400 hover:text-secondary dark:hover:text-sky-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
                        <p className="text-primary dark:text-secondary mb-2">{statement}</p>
                        <p className="text-text-base">{mainQuestion}</p>
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

                        let buttonClass = 'border border-text-muted hover:border-primary hover:bg-primary/10 text-text-base';
                        if (isSelected) {
                            // This line is updated to include `border-2`
                            buttonClass = option.isCorrect ? '' : 'bg-error/20 border border-error text-text-base animate-shake';
                        }

                        return (
                            <button
                                key={option.text}
                                onClick={() => onAnswer(quiz.id, option)}
                                className={`block w-full text-left p-4 rounded-lg transition-all duration-200 md:text-center md:flex md:items-center md:justify-center md:h-40 ${buttonClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
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

export default WorkChapter;