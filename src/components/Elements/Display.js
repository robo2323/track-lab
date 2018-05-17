import React from 'react';

const Display = ({ data = '', width = 100, height = 50 }) => {
  return (
    <div>
      <div style={{ width: width, height: height }} className="display">
        {data}
      </div>
    </div>
  );
};

export default Display;
