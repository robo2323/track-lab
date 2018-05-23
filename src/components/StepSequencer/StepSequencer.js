import React, { Component } from 'react';
import StepsRow from './StepsRow';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
// import faStop from '@fortawesome/fontawesome-free-solid/faStop';
import Switch from '../Elements/Switch';
// import Display from '../Elements/Display';

class StepSequencer extends Component {
  render() {
    return (
      <div className="stepSequencer" style={{ display: 'flex', flexDirection: 'column' }}>
        <StepsRow
          instName="kick"
          instLabel="Kick"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.kickVolume}
        />
        <StepsRow
          instName="snare"
          instLabel="Snare"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.snareVolume}
        />
        <StepsRow
          instName="clap"
          instLabel="Clap"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.clapVolume}
        />
        <StepsRow
          instName="closedHiHat"
          instLabel="HHat Closed"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.hhCVolume}
        />
        <StepsRow
          instName="openHiHat"
          instLabel="HHat Open"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.openHiHatVolume}
        />
        <StepsRow
          instName="ride"
          instLabel="Rim"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.rideVolume}
        />
        <p />
        <StepsRow
          instName="bass"
          instLabel="Bass"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.bassVolume}
        />
        <StepsRow
          instName="monoSynthOne"
          instLabel="Synth One"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.monoSynthOneVolume}
        />
        <StepsRow
          instName="monoSynthTwo"
          instLabel="Synth Two"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.monoSynthTwoVolume}
        />
        <StepsRow
          instName="monoSynthThree"
          instLabel="Synth Three"
          _handleInstBtnClick={this.props._handleInstBtnClick}
          _handleVolumeSlider={this.props._handleVolumeSlider}
          volume={this.props.monoSynthThreeVolume}
        />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-start' }}>
          <Switch _handleClick={this.props.play} _handleOff={this.props.stop} />
        </div>
      </div>
    );
  }
}
export default StepSequencer;
{
  /* <button
            style={{ width: '50px', height: '35px', color: '#fefefe', fontSize: '25px', marginRight: '10px' }}
            className="button"
            onClick={this.props.play}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button
            style={{ width: '50px', height: '35px', color: '#fefefe', fontSize: '25px' }}
            className="button"
            onClick={this.props.stop}
          >
            <FontAwesomeIcon icon={faStop} />
          </button> */
}
