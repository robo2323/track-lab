import React from 'react';

const Display = ({ data = '', width = 100, height = 50, margin = '', fontSize = '' }) => {
  return (
    <div>
      <div
        style={{ width: width, height: height, margin: margin, fontSize: fontSize, lineHeight: `${height}px` }}
        className="display"
      >
        {data}
      </div>
    </div>
  );
};

export default Display;
