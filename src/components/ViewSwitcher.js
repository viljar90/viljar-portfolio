// src/components/ViewSwitcher.js
import React from 'react';
import { SegmentedControl } from './uiElements';

const ViewSwitcher = ({ work, onWorkViewChange, isDarkMode }) => {
  return (
    // Changed to 'fixed' positioning and a high z-index
    <div className="fixed top-8 right-8 z-50"> 
      <SegmentedControl
        options={['Quiz', 'Overview']}
        activeOption={work.workView}
        onOptionClick={onWorkViewChange}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default ViewSwitcher;