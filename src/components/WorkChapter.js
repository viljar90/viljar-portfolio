// src/components/WorkChapter.js

import React, {useEffect} from 'react';
import QuizResultCard from './QuizResultCard';
import QuizOptionCardButton from './QuizOptionCardButton';

// --- FIX: Accept quizAnswers as a prop ---
const QuizView = ({ quiz, onAnswer, answerState, onReplayQuestion, quizAnswers }) => (
    <>
        {!answerState?.correct && (
             <div className="w-full text-left text-1xl md:text-2xl mb-8 animate-fadeIn">
                <p className="text-primary dark:text-secondary mb-2">{quiz.question.split('\n')[0]}</p>
                <p className="text-text-base font-bold">{quiz.question.split('\n')[1]}</p>
            </div>
        )}
        <div className={`w-full transition-all duration-300 ${answerState?.correct ? 'flex justify-center mt-8' : 'space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4'}`}>
            {quiz.options.map((option) => {
                const isSelected = answerState?.selected === option.text;
                const isTheCorrectlySelectedOption = answerState?.correct && isSelected;

                if (isTheCorrectlySelectedOption) {
                    // --- FIX: Pass quizAnswers down to the result card ---
                    return <QuizResultCard key={option.text} quiz={quiz} onReplayQuestion={onReplayQuestion} quizAnswers={quizAnswers} />;
                }
                if (answerState?.correct) {
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
    </>
)


// --- FIX: Accept quizAnswers as a prop ---
const WorkChapter = ({ darkMode, quiz, onAnswer, answerState, onReplayQuestion, previousQuiz, workAnimationDirection, onAnimationEnd, quizAnswers }) => {

    useEffect(() => {
        if (previousQuiz) {
            const timer = setTimeout(() => {
                onAnimationEnd();
            }, 400); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [previousQuiz, onAnimationEnd]);


    if (!quiz) return null;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
             <div className="w-full max-w-4xl">

                {/* Current Quiz */}
                <div
                    key={quiz.id}
                    className={`w-full h-full absolute inset-0 flex flex-col items-center justify-center ${
                        previousQuiz
                            ? workAnimationDirection === 'next'
                                ? 'animate-slide-in-right'
                                : 'animate-slide-in-left'
                            : ''
                    }`}
                >
                    <QuizView
                        quiz={quiz}
                        onAnswer={onAnswer}
                        answerState={answerState}
                        onReplayQuestion={onReplayQuestion}
                        quizAnswers={quizAnswers} // --- FIX: Pass prop down ---
                    />
                </div>

                {/* Previous Quiz (for animation) */}
                {previousQuiz && (
                     <div
                        key={previousQuiz.id}
                        className={`w-full h-full absolute inset-0 flex flex-col items-center justify-center ${
                            workAnimationDirection === 'next'
                            ? 'animate-slide-out-left'
                            : 'animate-slide-out-right'
                        }`}
                    >
                        <QuizView
                            quiz={previousQuiz}
                            onAnswer={onAnswer}
                            answerState={answerState}
                            onReplayQuestion={onReplayQuestion}
                            quizAnswers={quizAnswers} // --- FIX: Pass prop down ---
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkChapter;