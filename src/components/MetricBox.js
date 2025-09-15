// src/components/MetricBox.js
import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const MetricBox = ({ title, value, subtext, children, className = '' }) => {
  // --- THIS IS THE CORRECTED LOGIC ---
  const stringValue = String(value);
  let prefix = '';
  if (stringValue.startsWith('+')) {
    prefix = '+';
  } else if (stringValue.startsWith('-')) {
    prefix = '-';
  }
  
  const valueWithoutPrefix = prefix ? stringValue.substring(1) : stringValue;
  const number = parseFloat(valueWithoutPrefix.replace(/[^0-9.]/g, ''));
  const suffix = valueWithoutPrefix.replace(/[0-9,.]/g, '').trim();

  return (
    <div className={`bg-bg-base dark:border dark:border-gray-700 rounded-xl p-6 flex flex-col justify-between shadow-lg h-full ${className}`}>
      <p className="text-lg font-semibold text-text-muted text-left">{title}</p>
      <div className="flex-grow flex items-center justify-center">
        {value && (
          <div className="text-4xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-secondary my-2 text-center">
            <CountUp
              start={0}
              end={number}
              duration={2.5}
              separator=","
              prefix={prefix}
              suffix={suffix}
              enableScrollSpy
              scrollSpyDelay={200}
            />
          </div>
        )}
        {children}
      </div>
      {subtext && <p className="text-sm text-text-muted text-center mt-2">{subtext}</p>}
    </div>
  );
};

MetricBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtext: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MetricBox;