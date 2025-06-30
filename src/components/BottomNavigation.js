// src/components/BottomNavigation.js
import React from 'react';
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
    work // We need the 'work' object from the useWorkChapter hook
}) => {

    const renderCentralButton = () => {
        const lastDesignStageKey = work.WORK_NAV_ITEMS[work.WORK_NAV_ITEMS.length - 1]?.name;
        const lastDesignStageData = DESIGN_CONTENT[lastDesignStageKey];

        const isMainChapterFinalState = currentChapter === 'main' && activeNavItem === 'Home' && !isPlaying;
        const isDesignChapterFinalState =
            currentChapter === 'design' &&
            !isPlaying &&
            activeNavItem === lastDesignStageKey &&
            work.currentDesignStepIndex >= (lastDesignStageData?.steps.length - 1);

        const showReplayButtonForChapters = isMainChapterFinalState || isDesignChapterFinalState;
        const allQuizzesAnswered = QUIZZES.every(quiz => work.quizAnswers[quiz.id]?.correct);
        const nonAnimatedButtonClasses = "h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none transform hover:scale-110 active:scale-95 bg-white text-black hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-800";

        if (currentChapter === 'work' && work.workView === 'Quiz') {
            let icon;
            let label = "Central control button";
            if (work.workStepIndex === 0) {
                icon = <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
                label = "Start quiz";
            } else if (allQuizzesAnswered) {
                icon = <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
                label = "Replay quiz";
            } else {
                icon = <SkipIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
                label = "Skip question";
            }
            return <button onClick={onCentralButtonClick} className={nonAnimatedButtonClasses} aria-label={label}>{icon}</button>;
        }

        if (showReplayButtonForChapters) {
            return (
                <button onClick={onCentralButtonClick} className={nonAnimatedButtonClasses} aria-label="Replay chapter">
                    <ReplayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            );
        }

        return (
            <AnimatedBorderButton
                isPlaying={isPlaying}
                onClick={onCentralButtonClick}
                className="h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            />
        );
    };

    return (
        <div className="fixed bottom-0 left-0 w-full px-4 mb-6 z-20 flex justify-center">
            <div className={containerClass}>
                {renderCentralButton()}
                {navItems.length > 0 && (
                    <div className={`relative ${navItemsFlexClass}`}>
                        <div
                            ref={scrollContainerRef}
                            className="bg-gray-50 dark:bg-slate-800 py-1.5 px-2 rounded-full flex items-center space-x-1 shadow-lg transition-colors duration-300 border border-gray-300 dark:border-gray-700 overflow-x-auto no-scrollbar"
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
                        <div className={`absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'} dark:from-slate-950 pointer-events-none`}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomNavigation;