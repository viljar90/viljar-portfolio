// src/components/Chapter.js
import React, { forwardRef } from 'react';

const Chapter = forwardRef(({ children, className }, ref) => (
  <div ref={ref} className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative ${className}`}>
    {children}
  </div>
));

export default Chapter;