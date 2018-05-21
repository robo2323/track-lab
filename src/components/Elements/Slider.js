import React from 'react';

const Slider = ({
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  _input,
  styles = {},
  width = '35px',
  id = '',
  sliderClass = 'slider-large'
}) => {
  const _onChange = (e) => {
    _input(e.target);
  };
  return (
    <div style={{ width: width }}>
      <input
        id={id}
        onChange={_onChange}
        className={sliderClass}
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
