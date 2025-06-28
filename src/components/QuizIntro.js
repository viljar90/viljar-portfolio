// src/components/QuizIntro.js

import React, { useState, useEffect } from 'react';
import { BlinkingCursor, PlayIcon } from './uiElements';

const QuizIntro = ({ onStart }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedMainText, setDisplayedMainText] = useState('');
    const [phase, setPhase] = useState('typing-title'); // typing-title, typing-main, done

    const title = "My Work";
    const mainText = "I love games.\nGet to know my work with this game \n or look at the overview ↗️";
    const TYPEWRITER_SPEED = 35;

    useEffect(() => {
        let timer;
        if (phase === 'typing-title') {
            if (displayedTitle.length < title.length) {
                timer = setTimeout(() => {
                    setDisplayedTitle(title.substring(0, displayedTitle.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('typing-main');
            }
        } else if (phase === 'typing-main') {
            if (displayedMainText.length < mainText.length) {
                timer = setTimeout(() => {
                    setDisplayedMainText(mainText.substring(0, displayedMainText.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('done');
            }
        }
        return () => clearTimeout(timer);
    }, [displayedTitle, displayedMainText, phase]);

    return (
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-sky-400 dark:text-sky-300 mb-4 min-h-[1.2em]">
                {displayedTitle}
                {phase === 'typing-title' && <BlinkingCursor sizeClass="h-12 md:h-14" />}
            </h1>
            <p className="text-2xl md:text-3xl text-slate-200 dark:text-slate-300 min-h-[1.5em]" style={{ whiteSpace: 'pre-line' }}>
              {displayedMainText}
              {phase === 'typing-main' && <BlinkingCursor sizeClass="h-8 md:h-9" />}
            </p>
            {phase === 'done' && (
                <div className="mt-12 animate-fadeIn">
                    <button
                        onClick={onStart}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 text-lg md:text-xl inline-flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    >
                        <PlayIcon className="w-6 h-6" />
                        <span>Play</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizIntro;