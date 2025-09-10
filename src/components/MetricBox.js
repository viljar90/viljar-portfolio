// src/components/MetricBox.js
import React from 'react';
import PropTypes from 'prop-types';

const MetricBox = ({ title, value, subtext, children, className = '' }) => (
  <div className={`bg-bg-base dark:border dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between shadow-lg h-full ${className}`}>
    <p className="text-lg font-semibold text-text-muted text-left">{title}</p>
    <div className="flex-grow flex items-center justify-center">
      {value && <div className="text-4xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-secondary my-2 text-center">{value}</div>}
      {children}
    </div>
    {subtext && <p className="text-sm text-text-muted text-center mt-2">{subtext}</p>}
  </div>
);

MetricBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtext: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MetricBox;