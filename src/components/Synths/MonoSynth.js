import React, { Component } from 'react';
import keydown, { ALL_KEYS } from 'react-keydown';
import Modal from 'react-modal';
import Osc from '../SynthComponents/Osc';

import monoSynth from '../../controllers/synths/mono';

class MonoSynth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOneData: '',
      wavs: { saw: 'sawtooth', sin: 'sine', sqr: 'square', tri: 'triangle', pwm: 'pwm', Fsw: 'fatsawtooth' },
      moadIsOpen: false
    };
    this.testChange = this.testChange.bind(this);
    this._handleOscChange = this._handleOscChange.bind(this);
    this.close = this.close.bind(this);
  }

  @keydown(ALL_KEYS)
  submit(e) {
    const notes = {
      q: 'C2',
      w: 'D2',
      e: 'E2',
      r: 'F2',
      t: 'G2',
      y: 'A2',
      u: 'B2',
      i: 'C3',
      o: 'D3',
      p: 'E3',
      '[': 'F3',
      ']': 'G3'
    };
    monoSynth.triggerAttackRelease(`${notes[e.key]}`);
  }
  close() {
    this.props._handleClose(this.props.instName);
  }
  _handleOscChange({ oscName, wavtype }) {
    monoSynth.changeOsc(oscName, this.state.wavs[wavtype]);
  }
  _handleSliderLevelChange({ oscName, level }) {
    monoSynth.changeOscGain(oscName, level);
    level < -14 ? monoSynth.changeOscGain(oscName, -100) : monoSynth.changeOscGain(oscName, level);
  }
  _handleSliderTuningChange({ oscName, tuning }) {
    monoSynth.changeOscTuning(oscName, tuning);
  }

  testChange(e) {
    mono.filterEnvelope.baseFrequency = e.target.value;
    this.setState({ displayOneData: e.target.value });
  }
  render() {
    return (
      <Modal
        className="mono-synth"
        isOpen={this.props.isOpen}
        onRequestClose={this.props._handleClose}
        contentLabel="Mono Synth"
        ariaHideApp={false}
      >
        <div className="osc flex-row">
          <Osc
            oscName={'oscOne'}
            defaultWavType="saw"
            wavTypes={['saw', 'tri', 'sin', 'sqr']}
            oscChange={this._handleOscChange}
            gainChange={this._handleSliderLevelChange}
            tuningChange={this._handleSliderTuningChange}
          />
        </div>
        <div className="osc flex-row">
          <Osc
            oscName={'oscTwo'}
            defaultWavType="pwm"
            wavTypes={['pwm', 'Fsw']}
            oscChange={this._handleOscChange}
            gainChange={this._handleSliderLevelChange}
            tuningChange={this._handleSliderTuningChange}
          />
        </div>
        <h3 className="text">MonoSynth</h3>
        <button onClick={this.close}>X</button>
      </Modal>
    );
  }
}

export default MonoSynth;
