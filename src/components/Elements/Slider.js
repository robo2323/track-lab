import React from 'react';

const Slider = ({ min = 0, max = 1000, value = 500, step = 1, _onChange }) => {
  return (
    <div style={{width:'35px'}}>
      <input onChange={_onChange} className="slider" type="range" min={min} max={max} defaultValue={value} step={step} />
    </div>
  );
};

export default Slider;
