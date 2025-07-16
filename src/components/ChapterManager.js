// src/components/ChapterManager.js
import React from 'react';
import Chapter from './Chapter';
import ChapterContent from './ChapterContent';
import { QUIZZES } from '../content';
import { PrevArrowIcon, NextArrowIcon } from './uiElements';

const ChapterManager = ({
  mainChapterRef,
  designChapterRef,
  workChapterRef,
  mainChapterAnimClass,
  designChapterAnimClass,
  workChapterAnimClass,
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
  onWorkViewChange,
}) => {
  const isQuizView = currentChapter === 'work' && work.workView === 'Quiz';

  const arrowButtonClass = "fixed z-20 p-2 rounded-full text-text-muted hover:text-text-base hover:bg-bg-muted/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all opacity-40 hover:opacity-100";
  
  // Conditionally set the vertical position for medium screens and up
  const verticalPositionClass = isQuizView ? 'md:top-[60%]' : 'md:top-1/2';

  return (
    <div>
      {showPrevArrow && (
        <button
          onClick={handlePrevLine}
          className={`${arrowButtonClass} bottom-20 left-4 md:left-12 lg:left-20 xl:left-48 md:-translate-y-1/2 ${verticalPositionClass}`}
        >
          <PrevArrowIcon />
        </button>
      )}
      {showNextArrow && (
        <button
          onClick={handleNextLine}
          className={`${arrowButtonClass} bottom-20 right-4 md:right-12 lg:right-20 xl:right-48 md:-translate-y-1/2 ${verticalPositionClass}`}
        >
          <NextArrowIcon />
        </button>
      )}
      <Chapter ref={mainChapterRef} className={mainChapterAnimClass}>
        {currentChapter === 'main' && (
          <ChapterContent
            currentChapter="main"
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            navigateToChapter={navigateToChapter}
            showCursorInsults={showCursorInsults}
            showCursorIntroGreeting={showCursorIntroGreeting}
            showCursorIntroName={showCursorIntroName}
            showCursorIntroTitle={showCursorIntroTitle}
            showCursorHomeQuestion={showCursorHomeQuestion}
            QUIZZES={QUIZZES}
          />
        )}
      </Chapter>
      <Chapter ref={designChapterRef} className={designChapterAnimClass}>
        {currentChapter === 'design' && (
          <ChapterContent
            currentChapter="design"
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            navigateToChapter={navigateToChapter}
            currentDesignStepData={currentDesignStepData}
            showCursorDesignTitle={showCursorDesignTitle}
            showCursorDesignMainText={showCursorDesignMainText}
            QUIZZES={QUIZZES}
          />
        )}
      </Chapter>
      <Chapter ref={workChapterRef} className={workChapterAnimClass}>
        {currentChapter === 'work' && (
          <ChapterContent
            currentChapter="work"
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            navigateToChapter={navigateToChapter}
            QUIZZES={QUIZZES}
            onWorkViewChange={onWorkViewChange}
          />
        )}
      </Chapter>
    </div>
  );
};

export default ChapterManager;