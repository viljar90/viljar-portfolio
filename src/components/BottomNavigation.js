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
        setTimeout(() => setIsClicked(false), 400);
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
        
        const nonAnimatedButtonClasses = "group h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem] flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-105 active:scale-95 bg-bg-base dark:bg-black text-text-base dark:text-white ring-1 ring-gray-500 dark:ring-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-slate-800";
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
    
    if (currentChapter === 'work' && work.workView === 'Overview') {
    return (
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
            <div className={`relative w-auto transform transition-transform duration-200 hover:scale-[1.02] bg-bg-muted dark:bg-slate-950 rounded-full shadow-lg border border-gray-500 dark:border-gray-700`}>
                <div
                    ref={scrollContainerRef}
                    className="py-1.5 px-2.25 flex items-center justify-center space-x-1 transition-colors duration-300 overflow-x-auto no-scrollbar"
                >
                    {work.PROJECT_NAV_ITEMS.map((item, index) => (
                        <InteractiveOblongNavItem
                            key={item.id}
                            ref={el => itemNavRefs.current[index] = el}
                            text={item.name}
                            onClick={() => onNavItemClick(item.id)}
                            isActive={activeNavItem === item.id}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


    return (
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
            <div className={containerClass}>
                {renderCentralButton()}
                <div className={`relative ${navItemsFlexClass} transform transition-transform duration-200 hover:scale-[1.02] bg-bg-muted dark:bg-slate-950 rounded-full shadow-lg border border-gray-500 dark:border-gray-700 overflow-hidden`}>
                    <div
                        ref={scrollContainerRef}
                        className="py-1.5 px-2 flex items-center space-x-1 transition-colors duration-300 overflow-x-auto no-scrollbar"
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
                    <div className={`absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg-muted)] to-transparent transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
                    <div className={`absolute top-0 bottom-0 right-[-0.1rem] w-24 bg-gradient-to-l from-[var(--color-bg-muted)] to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;