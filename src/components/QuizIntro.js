// src/components/QuizIntro.js

import React, { useState, useEffect } from 'react';
import { BlinkingCursor, PlayIcon, PrimaryButton } from './uiElements';
import PropTypes from 'prop-types';

const QuizIntro = ({ onStart, isCompleted, onIntroViewed }) => {
    const title = "My Work";
    const mainText = "Get to know my work in this game \n or check out the overview";
    const TYPEWRITER_SPEED = 35;

    const [displayedTitle, setDisplayedTitle] = useState(isCompleted ? title : '');
    const [displayedMainText, setDisplayedMainText] = useState(isCompleted ? mainText : '');
    const [phase, setPhase] = useState(isCompleted ? 'done' : 'typing-title');

    // This effect runs only once when the component is first displayed
    useEffect(() => {
        onIntroViewed();
    }, [onIntroViewed]);

    // This effect handles the animation
    useEffect(() => {
        if (isCompleted || phase === 'done') {
            setDisplayedTitle(title);
            setDisplayedMainText(mainText);
            setPhase('done');
            return;
        }

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
    }, [isCompleted, phase, displayedTitle, displayedMainText, title, mainText]);

    return (
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary dark:text-secondary mb-4 min-h-[1.2em]">
                {displayedTitle}
                {phase === 'typing-title' && <BlinkingCursor sizeClass="h-12 md:h-14" />}
            </h1>
            <p className="text-2xl md:text-3xl text-text-base dark:text-text-muted min-h-[1.5em]" style={{ whiteSpace: 'pre-line' }}>
              {displayedMainText}
              {phase === 'typing-main' && <BlinkingCursor sizeClass="h-8 md:h-9" />}
            </p>
            {phase === 'done' && (
                <div className="mt-12 animate-fadeIn">
                    <PrimaryButton
                        onClick={onStart}
                        icon={PlayIcon}
                    >
                        Play
                    </PrimaryButton>
                </div>
            )}
        </div>
    );
};

QuizIntro.propTypes = {
  onStart: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool,
  onIntroViewed: PropTypes.func.isRequired,
};

QuizIntro.defaultProps = {
    isCompleted: false,
};

export default QuizIntro;