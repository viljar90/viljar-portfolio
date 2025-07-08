// src/components/ChapterContent.js

import React from 'react';
import PropTypes from 'prop-types';
import LandingChapter from './LandingChapter';
import DesignChapter from './DesignChapter';
import WorkChapter from './WorkChapter';
import QuizIntro from './QuizIntro';
import { QUIZZES } from '../content';

const ChapterContent = ({
  currentChapter,
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
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative px-4 sm:px-16">
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
                <QuizIntro
                    onStart={() => work.setWorkStepIndex(1)}
                    isCompleted={work.introCompleted}
                    onIntroViewed={work.markIntroAsCompleted}
                />
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-base">
                    Project Overview
                </h1>
                <p className="text-xl mt-4 text-text-muted">Project gallery coming soon!</p>
            </div>
        )
      )}
    </div>
  );
};

ChapterContent.propTypes = {
    currentChapter: PropTypes.string.isRequired,
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
    QUIZZES: PropTypes.array.isRequired
  };

export default ChapterContent;