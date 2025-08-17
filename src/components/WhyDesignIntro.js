// src/components/WhyDesignIntro.js

import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, BlinkingCursor, PlayIcon } from './uiElements';

const WhyDesignIntro = ({
  onStart,
  displayedTitle,
  displayedMainText,
  showCursorTitle,
  showCursorMainText,
  showPlayButton,
}) => {
    return (
        <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary dark:text-secondary mb-4 min-h-[1.2em]">
                {displayedTitle}
                {showCursorTitle && <BlinkingCursor sizeClass="h-12 md:h-14 lg:h-16" />}
            </h1>
            <p className="text-2xl md:text-3xl text-text-base dark:text-text-muted min-h-[3em]" style={{ whiteSpace: 'pre-line' }}>
              {displayedMainText}
              {showCursorMainText && <BlinkingCursor sizeClass="h-8 md:h-9" />}
            </p>
            {showPlayButton && (
                <div className="mt-12">
                    <PrimaryButton
                        onClick={onStart}
                        icon={PlayIcon}
                    >
                        Play
                    </PrimaryButton>
                </div>
            )}
        </div>
    );
};

WhyDesignIntro.propTypes = {
  onStart: PropTypes.func.isRequired,
  displayedTitle: PropTypes.string.isRequired,
  displayedMainText: PropTypes.string.isRequired,
  showCursorTitle: PropTypes.bool.isRequired,
  showCursorMainText: PropTypes.bool.isRequired,
  showPlayButton: PropTypes.bool.isRequired,
};

export default WhyDesignIntro;