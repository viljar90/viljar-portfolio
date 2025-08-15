// src/components/WhyDesignIntro.js

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { WHY_DESIGN_CONTENT } from '../content';
import { PrimaryButton, BlinkingCursor } from './uiElements';

const WhyDesignIntro = ({ onStart, isPlaying, onAnimationComplete }) => {
    const { steps } = WHY_DESIGN_CONTENT.intro;
    const TYPEWRITER_SPEED = 35;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedMainText, setDisplayedMainText] = useState('');
    const [phase, setPhase] = useState('typing-title');
    const isPlayingRef = useRef(isPlaying);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying || phase === 'done') return;

        const currentStep = steps[currentStepIndex];
        let timer;

        if (phase === 'typing-title') {
            if (displayedTitle.length < currentStep.title.length) {
                timer = setTimeout(() => {
                    setDisplayedTitle(currentStep.title.substring(0, displayedTitle.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('typing-main');
            }
        } else if (phase === 'typing-main') {
            if (displayedMainText.length < currentStep.mainText.length) {
                timer = setTimeout(() => {
                    setDisplayedMainText(currentStep.mainText.substring(0, displayedMainText.length + 1));
                }, TYPEWRITER_SPEED);
            } else {
                setPhase('pausing');
            }
        } else if (phase === 'pausing') {
            if (currentStepIndex < steps.length - 1) {
                timer = setTimeout(() => {
                    if (!isPlayingRef.current) return;
                    const nextStep = steps[currentStepIndex + 1];
                    setCurrentStepIndex(currentStepIndex + 1);
                    setDisplayedMainText('');
                    
                    if (nextStep.title === currentStep.title) {
                        setPhase('typing-main');
                    } else {
                        setDisplayedTitle('');
                        setPhase('typing-title');
                    }
                }, 1500); // Pause between steps
            } else {
                setPhase('done');
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }
        }

        return () => clearTimeout(timer);
    }, [phase, displayedTitle, displayedMainText, currentStepIndex, steps, isPlaying, onAnimationComplete]);

    return (
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary dark:text-secondary mb-4 min-h-[1.2em]">
                {displayedTitle}
                {isPlaying && phase === 'typing-title' && <BlinkingCursor sizeClass="h-12 md:h-14 lg:h-16" />}
            </h1>
            <p className="text-2xl md:text-3xl text-text-base dark:text-text-muted min-h-[3em]" style={{ whiteSpace: 'pre-line' }}>
              {displayedMainText}
              {isPlaying && phase === 'typing-main' && <BlinkingCursor sizeClass="h-8 md:h-9" />}
            </p>
            <div className="mt-12">
                <PrimaryButton
                    onClick={onStart}
                >
                    Play
                </PrimaryButton>
            </div>
        </div>
    );
};

WhyDesignIntro.propTypes = {
  onStart: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onAnimationComplete: PropTypes.func.isRequired,
};

export default WhyDesignIntro;