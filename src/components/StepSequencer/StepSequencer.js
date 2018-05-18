import React, { Component } from 'react';
import StepsRow from './StepsRow';

class StepSequencer extends Component {
  render() {
    return (
      <div className="stepSequencer" style={{ display: 'flex', flexDirection: 'column' }}>
        <StepsRow instrumentName="Kick" />
        <StepsRow instrumentName="Snare" />
        <StepsRow instrumentName="Clap" />
        <StepsRow instrumentName="HHat Closed" />
        <StepsRow instrumentName="HHat Open" />
        <StepsRow instrumentName="Ride" />
        <p />
        <StepsRow instrumentName="Bass" />
        <StepsRow
          instName="monoSynth"
          instrumentName="Synth One"
          _handleInstBtnClick={this.props._handleInstBtnClick}
        />
        <StepsRow instrumentName="Synth Two" />
        <StepsRow instrumentName="Synth Three" />
      </div>
    );
  }
}

export default StepSequencer;
