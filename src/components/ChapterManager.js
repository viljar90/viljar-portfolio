// src/components/ChapterManager.js
import React from 'react';
import Chapter from './Chapter';
import ChapterContent from './ChapterContent';
import { QUIZZES } from '../content';

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
  onWorkViewChange, // Add this prop
}) => {
  return (
    <>
      <Chapter ref={mainChapterRef} className={mainChapterAnimClass}>
        {currentChapter === 'main' && (
          <ChapterContent
            currentChapter="main"
            showPrevArrow={showPrevArrow}
            showNextArrow={showNextArrow}
            handlePrevLine={handlePrevLine}
            handleNextLine={handleNextLine}
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
            showPrevArrow={showPrevArrow}
            showNextArrow={showNextArrow}
            handlePrevLine={handlePrevLine}
            handleNextLine={handleNextLine}
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
            showPrevArrow={showPrevArrow}
            showNextArrow={showNextArrow}
            handlePrevLine={handlePrevLine}
            handleNextLine={handleNextLine}
            darkMode={darkMode}
            landing={landing}
            design={design}
            work={work}
            navigateToChapter={navigateToChapter}
            QUIZZES={QUIZZES}
            onWorkViewChange={onWorkViewChange} // Pass it here
          />
        )}
      </Chapter>
    </>
  );
};

export default ChapterManager;