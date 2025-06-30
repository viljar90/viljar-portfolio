// src/components/Chapter.js file

import React, { forwardRef } from 'react';

const Chapter = forwardRef(({ className, children }, ref) => (
  <div ref={ref} className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative ${className}`}>
    {children}
  </div>
));

export default Chapter;