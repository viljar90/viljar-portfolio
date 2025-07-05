// src/components/BottomNavigation.js
import React, { useState } from 'react';
import {
  PlayIcon,
  ReplayIcon,
  SkipIcon,
  InteractiveOblongNavItem,
  AnimatedBorderButton,
} from './uiElements';
import { DESIGN_CONTENT, QUIZZES } from '../content';

const BottomNavigation = ({
    navItems,
    activeNavItem,
    isPlaying,
    isFadingOut,
    isDarkMode,
    showLeftFade,
    showRightFade,
    onCentralButtonClick,
    onNavItemClick,
    scrollContainerRef,
    itemNavRefs,
    containerClass,
    navItemsFlexClass,
    currentChapter,
    design,
    work
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleStaticButtonClick = () => {
        setIsClicked(true);
        onCentralButtonClick();
        setTimeout(() => setIsClicked(false), 400); // Duration should match animation
    };

    const renderCentralButton = () => {
        const isMainChapterFinalState = currentChapter === 'main' && activeNavItem === 'Home' && !isPlaying;
        const isDesignChapterFinalState =
            currentChapter === 'design' &&
            !isPlaying &&
            design?.isDesignChapterFinished;

        const showReplayButtonForChapters = isMainChapterFinalState || isDesignChapterFinalState;
        const allQuizzesAnswered = QUIZZES.every(quiz => work.quizAnswers[quiz.id]?.correct);
        const isLastQuestion = work.workView === 'Quiz' && work.workStepIndex === QUIZZES.length;
        
        const nonAnimatedButtonClasses = "group h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem] flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-105 active:scale-95 bg-black dark:bg-black text-white dark:text-white ring-1 ring-gray-300 dark:ring-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-800";
        const iconAnimationClass = isClicked ? 'animate-click-bounce' : '';

        if (currentChapter === 'work' && work.workView === 'Quiz' && !showReplayButtonForChapters) {
            let icon;
            let label = "Central control button";
            if (work.workStepIndex === 0) {
                icon = <PlayIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105 ${iconAnimationClass}`} />;
                label = "Start quiz";
            } else if (allQuizzesAnswered || isLastQuestion) {
                icon = <ReplayIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105 ${iconAnimationClass}`} />;
                label = "Replay quiz";
            } else {
                icon = <SkipIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105 ${iconAnimationClass}`} />;
                label = "Skip question";
            }
            return <button onClick={handleStaticButtonClick} className={nonAnimatedButtonClasses} aria-label={label}>{icon}</button>;
        }

        if (showReplayButtonForChapters || (currentChapter === 'work' && (allQuizzesAnswered || isLastQuestion))) {
            return (
                <button onClick={handleStaticButtonClick} className={nonAnimatedButtonClasses} aria-label="Replay chapter">
                    <ReplayIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-105 ${iconAnimationClass}`} />
                </button>
            );
        }

        return (
            <AnimatedBorderButton
                isPlaying={isPlaying}
                onClick={onCentralButtonClick}
                className="h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem] flex-shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            />
        );
    };

    return (
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
            <div className={containerClass}>
                {renderCentralButton()}
                <div className={`relative ${navItemsFlexClass} transform transition-transform duration-200 hover:scale-[1.02]`}>
                    <div
                        ref={scrollContainerRef}
                        className="bg-slate-900 dark:bg-slate-950 py-1.5 px-2 rounded-full flex items-center space-x-1 shadow-lg transition-colors duration-300 border border-gray-300 dark:border-gray-700 overflow-x-auto no-scrollbar"
                    >
                        {navItems.map((item, index) => {
                            let navItemText = (currentChapter === 'design' && DESIGN_CONTENT[item.name])
                                ? DESIGN_CONTENT[item.name].navText
                                : item.name;
                            let navIdentifier = item.name;
                            if (currentChapter === 'work' && work.workView === 'Quiz' && item.name.startsWith('Question')) {
                                const quizIndex = index - 1;
                                if (quizIndex >= 0 && quizIndex < QUIZZES.length) {
                                    const quiz = QUIZZES[quizIndex];
                                    if (work.quizAnswers[quiz.id]?.correct) {
                                        navItemText = `${quiz.title} ✓`;
                                        navIdentifier = quiz.title;
                                    }
                                }
                            }

                            return (
                                <InteractiveOblongNavItem
                                    key={`${currentChapter}-${item.name}`}
                                    ref={el => itemNavRefs.current[index] = el}
                                    text={navItemText}
                                    onClick={() => onNavItemClick(navIdentifier)}
                                    isActive={activeNavItem === navIdentifier || activeNavItem === item.name}
                                    isPlaying={activeNavItem === navIdentifier && isPlaying && !isFadingOut}
                                    isFadingOut={activeNavItem === navIdentifier && isFadingOut}
                                    isDarkMode={isDarkMode}
                                />
                            );
                        })}
                    </div>
                    <div className={`absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} dark:from-slate-950 pointer-events-none`}></div>
                    <div className={`absolute top-0 bottom-0 right-[-0.1rem] w-20 bg-gradient-to-l from-slate-900 to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} dark:from-slate-950 pointer-events-none`}></div>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;