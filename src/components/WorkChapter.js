// src/components/WorkChapter.js

import React from 'react';
import QuizResultCard from './QuizResultCard';
import QuizOptionCardButton from './QuizOptionCardButton'; // Import the renamed component

const WorkChapter = ({ darkMode, quiz, onAnswer, answerState, onReplayQuestion }) => {
    if (!quiz) return null;

    const { question, options } = quiz;
    const { selected, correct } = answerState || {};

    const questionParts = question.split('\n');
    const statement = questionParts[0];
    const mainQuestion = questionParts[1];

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
                            return <QuizResultCard key={option.text} quiz={quiz} onReplayQuestion={onReplayQuestion} />;
                        }

                        if (correct) {
                            return null;
                        }

                        return (
                            <QuizOptionCardButton
                                key={option.text}
                                option={option}
                                isSelected={isSelected}
                                onAnswer={() => onAnswer(quiz.id, option)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkChapter;