import React, { Component } from 'react';
import StepsRow from './StepsRow';

class StepSequencer extends Component {
  render() {
    return (
      <div className="stepSequencer" style={{ display: 'flex', flexDirection: 'column' }}>
        <StepsRow instName="kick" instLabel="Kick" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="snare" instLabel="Snare" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="clap" instLabel="Clap" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="hhC" instLabel="HHat Closed" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="hhO" instLabel="HHat Open" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="ride" instLabel="Ride" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <p />
        <StepsRow instName="bass" instLabel="Bass" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="monoSynthOne" instLabel="Synth One" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow instName="monoSynthTwo" instLabel="Synth Two" _handleInstBtnClick={this.props._handleInstBtnClick} />
        <StepsRow
          instName="monoSynthThree"
          instLabel="Synth Three"
          _handleInstBtnClick={this.props._handleInstBtnClick}
        />
      </div>
    );
  }
}
export default StepSequencer;
