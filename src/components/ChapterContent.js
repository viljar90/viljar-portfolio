// src/components/ChapterContent.js

import React from 'react';
import PropTypes from 'prop-types';
import { PrevArrowIcon, NextArrowIcon } from './uiElements';
import LandingChapter from './LandingChapter';
import DesignChapter from './DesignChapter';
import WorkChapter from './WorkChapter';
import QuizIntro from './QuizIntro';

const ChapterContent = ({
  currentChapter,
  showPrevArrow,
  showNextArrow,
  handlePrevLine,
  handleNextLine,
  darkMode,
  landing,
  design,
  work,
  navigateToChapter,
  currentDesignStepData,
  showCursorInsults,
  showCursorIntroGreeting,
  showCursorIntroName,
  showCursorIntroTitle,
  showCursorHomeQuestion,
  showCursorDesignTitle,
  showCursorDesignMainText,
  QUIZZES,
  onWorkViewChange,
}) => {
  const arrowButtonClass = "absolute top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-500 hover:text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all opacity-40 group-hover:opacity-100";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative group px-16">
      
      {/* The incorrect ViewSwitcher has been removed from here. */}

      {showPrevArrow && <button onClick={handlePrevLine} className={`${arrowButtonClass} left-8 sm:left-0 md:left-0 lg:left-0`}><PrevArrowIcon /></button>}
      {showNextArrow && <button onClick={handleNextLine} className={`${arrowButtonClass} right-8 sm:right-0 md:right-0 lg:right-0`}><NextArrowIcon /></button>}

      {currentChapter === 'main' && (
        <LandingChapter
          darkMode={darkMode}
          activeMainStep={landing.activeMainStep}
          mainAnimationPhase={landing.mainAnimationPhase}
          isSliding={landing.isSliding}
          displayedChars={landing.displayedChars}
          showCursorInsults={showCursorInsults}
          showCursorIntroGreeting={showCursorIntroGreeting}
          displayedNameChars={landing.displayedNameChars}
          showCursorIntroName={showCursorIntroName}
          displayedTitleChars={landing.displayedTitleChars}
          showCursorIntroTitle={showCursorIntroTitle}
          displayedHomeQuestion={landing.displayedHomeQuestion}
          showCursorHomeQuestion={showCursorHomeQuestion}
          onNavigateToChapter={navigateToChapter}
        />
      )}
      {currentChapter === 'design' && (
        <DesignChapter
          darkMode={darkMode}
          design={design}
          currentDesignStepData={currentDesignStepData}
          showCursorDesignTitle={showCursorDesignTitle}
          showCursorDesignMainText={showCursorDesignMainText}
        />
      )}
      {currentChapter === 'work' && (
        work.workView === 'Quiz' ? (
            work.workStepIndex === 0 ? (
                <QuizIntro onStart={() => work.setWorkStepIndex(1)} />
            ) : (
                <WorkChapter
                    darkMode={darkMode}
                    quiz={QUIZZES[work.workStepIndex - 1]}
                    onAnswer={work.handleQuizAnswer}
                    answerState={work.quizAnswers[QUIZZES[work.workStepIndex - 1]?.id]}
                    onReplayQuestion={work.handleReplayQuestion}
                />
            )
        ) : (
             <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-100 dark:text-slate-200">
                    Project Overview
                </h1>
                <p className="text-xl mt-4 text-slate-400">Project gallery coming soon!</p>
            </div>
        )
      )}
    </div>
  );
};

ChapterContent.propTypes = {
  currentChapter: PropTypes.string.isRequired,
  showPrevArrow: PropTypes.bool.isRequired,
  showNextArrow: PropTypes.bool.isRequired,
  handlePrevLine: PropTypes.func.isRequired,
  handleNextLine: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  landing: PropTypes.object.isRequired,
  design: PropTypes.object.isRequired,
  work: PropTypes.object.isRequired,
  navigateToChapter: PropTypes.func.isRequired,
  currentDesignStepData: PropTypes.object,
  showCursorInsults: PropTypes.bool.isRequired,
  showCursorIntroGreeting: PropTypes.bool.isRequired,
  showCursorIntroName: PropTypes.bool.isRequired,
  showCursorIntroTitle: PropTypes.bool.isRequired,
  showCursorHomeQuestion: PropTypes.bool.isRequired,
  showCursorDesignTitle: PropTypes.bool.isRequired,
  showCursorDesignMainText: PropTypes.bool.isRequired,
  QUIZZES: PropTypes.array.isRequired,
  onWorkViewChange: PropTypes.func,
};

ChapterContent.defaultProps = {
  onWorkViewChange: () => {},
};

export default ChapterContent;