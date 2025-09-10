// src/components/ViewSwitcher.js
import React from 'react';
import { SegmentedControl } from './uiElements';

const ViewSwitcher = ({ work, onWorkViewChange, isDarkMode }) => {
  // This function translates the new button text back to the old ID
  // that the rest of the application expects.
  const handleOptionClick = (option) => {
    if (option === 'Work Quiz') {
      onWorkViewChange('Quiz');
    } else if (option === 'Work Overview') {
      onWorkViewChange('Overview');
    }
  };

  // This determines which button should appear "active" based on the
  // application's current state ('Quiz' or 'Overview').
  const activeDisplayText = work.workView === 'Quiz' ? 'Work Quiz' : 'Work Overview';

  return (
    <SegmentedControl
      options={['Work Quiz', 'Work Overview']}
      activeOption={activeDisplayText}
      onOptionClick={handleOptionClick}
      isDarkMode={isDarkMode}
    />
  );
};

export default ViewSwitcher;