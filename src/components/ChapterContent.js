// src/components/ChapterContent.js

import React from 'react';
import PropTypes from 'prop-types';
import LandingChapter from './LandingChapter';
import DesignChapter from './DesignChapter';
import WorkChapter from './WorkChapter';
import MeChapter from './MeChapter'; // 1. IMPORT THE NEW COMPONENT
import QuizIntro from './QuizIntro';
import QuizResults from './QuizResults';
import ProjectOverview from './ProjectOverview';
import { QUIZZES, PROJECTS, DESIGN_VIEWS } from '../content';
import WhyDesignIntro from './WhyDesignIntro';
import WhyDesignGame from './WhyDesignGame';

const ChapterContent = ({
  currentChapter,
  darkMode,
  landing,
  design,
  work,
  me, // Add 'me' here
  navigateToChapter,
  currentDesignStepData,
  showCursorInsults,
  showCursorIntroGreeting,
  showCursorIntroName,
  showCursorIntroTitle,
  showCursorHomeQuestion,
  showCursorDesignTitle,
  showCursorDesignMainText,
  onWorkViewChange, // Added this prop to be complete
}) => {
  const isLastStep = work.workStepIndex === QUIZZES.length + 1;

  const renderDesignContent = () => {
    if (design.designView === DESIGN_VIEWS.WHY_DESIGN) {
      if (design.whyDesignStep === 'intro') {
        const showPlayButton = true;

        return (
          <WhyDesignIntro 
            key={design.whyDesignIntroResetKey}
            onStart={design.handleStartWhyDesignGame}
            isPlaying={design.isPlayingWhyDesignIntro} 
            onAnimationComplete={design.handleNextWhyDesignIntroLine}
            whyDesignIntroStepIndex={design.whyDesignIntroStepIndex}
            resetKey={design.whyDesignIntroResetKey}
            displayedTitle={design.displayedWhyDesignTitleChars}
            displayedMainText={design.displayedWhyDesignMainTextChars}
            showCursorTitle={design.isPlayingWhyDesignIntro && design.whyDesignAnimationPhase === 'typing-title'}
            showCursorMainText={design.isPlayingWhyDesignIntro && design.whyDesignAnimationPhase === 'typing-main'}
            showPlayButton={showPlayButton}
          />
        );
      } else { // 'game' step
        return (
          <WhyDesignGame
            gameStatus={design.gameStatus}
            gameScore={design.gameScore}
            gameCaseIndex={design.gameCaseIndex}
            gamePartIndex={design.gamePartIndex}
            gameQuestionStates={design.gameQuestionStates}
            gameSelectedAnswers={design.gameSelectedAnswers}
            handleGameOptionClick={design.handleGameOptionClick}
            handleGameSubmitSelectAll={design.handleGameSubmitSelectAll}
            handleGameNext={design.handleGameNext}
            resetGame={design.resetGame}
            startBonusCase={design.startBonusCase}
            setGameStatus={design.setGameStatus}
            onSwitchView={() => design.setDesignView(DESIGN_VIEWS.WHAT_DESIGN)}
          />
        );
      }
    }
    
    return (
      <DesignChapter
        darkMode={darkMode}
        design={design}
        currentDesignStepData={currentDesignStepData}
        showCursorDesignTitle={showCursorDesignTitle}
        showCursorDesignMainText={showCursorDesignMainText}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl md:max-w-3xl lg:max-w-5xl text-center relative px-4 sm:px-16">
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
          landing={landing}
        />
      )}
      {currentChapter === 'design' && renderDesignContent()}
      {currentChapter === 'work' &&
        (work.workView === 'Quiz' ? (
            <>
              {work.workStepIndex === 0 && (
                <QuizIntro
                  onStart={() => work.handleNextQuestion()}
                  isCompleted={work.introCompleted}
                  onIntroViewed={work.markIntroAsCompleted}
                />
              )}
              {work.workStepIndex > 0 && work.workStepIndex <= QUIZZES.length && (
                <WorkChapter
                  darkMode={darkMode}
                  quiz={QUIZZES[work.workStepIndex - 1]}
                  previousQuiz={work.previousWorkStepIndex !== null ? QUIZZES[work.previousWorkStepIndex - 1] : null}
                  onAnswer={work.handleQuizAnswer}
                  answerState={work.quizAnswers[QUIZZES[work.workStepIndex - 1]?.id]}
                  onReplayQuestion={work.handleReplayQuestion}
                  workAnimationDirection={work.workAnimationDirection}
                  onAnimationEnd={() => work.setPreviousWorkStepIndex(null)}
                />
              )}
              {isLastStep && (
                <QuizResults
                  quizAnswers={work.quizAnswers}
                  onReplay={work.handleReplayQuestion}
                  onReset={work.resetWorkChapter}
                  onSwitchView={work.setWorkView} 
                />
              )}
            </>
          ) : (
          <div className="w-full overflow-hidden h-96 flex items-center justify-center relative">
            <ProjectOverview
              projects={PROJECTS}
              currentProjectIndex={work.currentProjectIndex}
              previousProjectIndex={work.previousProjectIndex}
              animationDirection={work.animationDirection}
              setPreviousProjectIndex={work.setPreviousProjectIndex}
            />
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-gradient-to-r from-bg-base to-transparent pointer-events-none hidden md:block" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-gradient-to-l from-bg-base to-transparent pointer-events-none hidden md:block" />
          </div>
        ))}
        
      {/* 2. RENDER THE NEW COMPONENT */}
      {currentChapter === 'me' && (
        <MeChapter darkMode={darkMode} me={me} />
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
    me: PropTypes.object, // 3. ADD 'me' TO PROP TYPES
    navigateToChapter: PropTypes.func.isRequired,
    currentDesignStepData: PropTypes.object,
    showCursorInsults: PropTypes.bool.isRequired,
    showCursorIntroGreeting: PropTypes.bool.isRequired,
    showCursorIntroName: PropTypes.bool.isRequired,
    showCursorIntroTitle: PropTypes.bool.isRequired,
    showCursorHomeQuestion: PropTypes.bool.isRequired,
    showCursorDesignTitle: PropTypes.bool.isRequired,
    showCursorDesignMainText: PropTypes.bool.isRequired,
    onWorkViewChange: PropTypes.func,
};

export default ChapterContent;