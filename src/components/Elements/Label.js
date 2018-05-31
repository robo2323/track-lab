import React from 'react';

const Label = ({ text = '', styles = {} }) => {
  return (
    <span style={styles} className="label">
      {text}
    </span>
  );
};

export default Label;
