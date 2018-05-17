import React, { Component } from 'react';
import Step from './Step';
import Button from '../Elements/Button';
import Display from '../Elements/Display';

class StepsRow extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0' }}>
        <Display data={this.props.instrumentName} width={80} height={55}  />
        <Button styles={{ borderRadius: '50%', height: '40px', width: '40px', margin: '0 20px' }} />
        <Step />
        <Step />
        <Step />
        <Step />
        <span>||</span>
        <Step />
        <Step />
        <Step />
        <Step />
        <span>||</span>
        <Step />
        <Step />
        <Step />
        <Step />
        <span>||</span>
        <Step />
        <Step />
        <Step />
        <Step />
      </div>
    );
  }
}

export default StepsRow;
