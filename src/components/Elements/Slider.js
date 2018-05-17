import React from 'react';

const Slider = ({ min = -15, max = 10, value = 0, step = 1, _input, styles = {}, id = '' }) => {
  const _onChange = (e) => {
    _input(e.target);
  };
  return (
    <div style={{ width: '35px' }}>
      <input
        id={id}
        onChange={_onChange}
        className="slider"
        type="range"
        min={min}
        max={max}
        defaultValue={value}
        step={step}
        style={styles}
      />
    </div>
  );
};

export default Slider;
