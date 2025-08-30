import React, { useState, useEffect } from 'react';
import { BlinkingCursor, PlayIcon, PrimaryButton, SecondaryButton } from './uiElements';
import PropTypes from 'prop-types';

const QuizIntro = ({ onStart, onIntroViewed, onSwitchView }) => {
    const title = "My Work";
    const mainText = "Get to know my work in this game \n or check out the overview";
    const TYPEWRITER_SPEED = 35;

    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedMainText, setDisplayedMainText] = useState('');
    const [phase, setPhase] = useState('typing-title');

    // This effect calls onIntroViewed once the animation is complete.
    useEffect(() => {
        if (phase === 'done') {
            onIntroViewed();
        }
    }, [phase, onIntroViewed]);

    // This is the core typewriter animation logic. It runs on mount.
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
    }, [phase, displayedTitle, displayedMainText]);

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
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <SecondaryButton onClick={() => onSwitchView('Overview')}>
                    Work Overview
                </SecondaryButton>
                <div className="h-8 w-px bg-gray-400 dark:bg-gray-600 hidden sm:block"></div>
                <PrimaryButton
                    onClick={onStart}
                    icon={PlayIcon}
                >
                    Play
                </PrimaryButton>
            </div>
        </div>
    );
};

QuizIntro.propTypes = {
  onStart: PropTypes.func.isRequired,
  onIntroViewed: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
};

export default QuizIntro;