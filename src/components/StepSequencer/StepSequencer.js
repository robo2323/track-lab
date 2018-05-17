import React, { Component } from 'react';
import StepsRow from './StepsRow';

class StepSequencer extends Component {
  render() {
    return (
      <div className="stepSequencer" style={{ display: 'flex', flexDirection: 'column' }}>
        <StepsRow instrumentName="Kick" />
        <StepsRow instrumentName="Snare"/>
        <StepsRow instrumentName="Clap"/>        
        <StepsRow instrumentName="HHat Closed"/>
        <StepsRow instrumentName="HHat Open"/>
        <StepsRow instrumentName="Ride"/>        
        <StepsRow instrumentName="Bass"/>
        <StepsRow instrumentName="Synth One"/>
        <StepsRow instrumentName="Syth Two"/>
        <StepsRow instrumentName="Syth Three"/>
     
      </div>
    );
  }
}

export default StepSequencer;
