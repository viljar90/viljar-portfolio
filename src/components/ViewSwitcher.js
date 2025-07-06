// src/components/ViewSwitcher.js
import React from 'react';
import { SegmentedControl } from './uiElements';

const ViewSwitcher = ({ work, onWorkViewChange, isDarkMode }) => {
  return (
    // The wrapping div with positioning has been removed.
    <SegmentedControl
      options={['Quiz', 'Overview']}
      activeOption={work.workView}
      onOptionClick={onWorkViewChange}
      isDarkMode={isDarkMode}
    />
  );
};

export default ViewSwitcher;