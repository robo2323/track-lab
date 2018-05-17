import React, { Component } from 'react';
import keydown, { ALL_KEYS } from 'react-keydown';

import monoSynth from '../../controllers/synths/mono';

import Button from '../Elements/Button';
import Slider from '../Elements/Slider';
import Display from '../Elements/Display';
import Switch from '../Elements/Switch';
import Label from '../Elements/Label';
import Osc from '../SynthComponents/Osc';

class MonoSynth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOneData: '',
      wavs: { saw: 'sawtooth', sin: 'sine', sqr: 'square', tri: 'triangle', pwm: 'pwm', Fsw: 'fatsawtooth' }
    };
    this.testChange = this.testChange.bind(this);
    this._handleOscChange = this._handleOscChange.bind(this);
  }

  @keydown(ALL_KEYS)
  submit(e) {
    const notes = { q: 'C2', w: 'D2', e: 'E2', r: 'F2', t: 'G2', y: 'A2', u: 'B2', i: 'C3' };
    monoSynth.triggerAttackRelease(`${notes[e.key]}`);
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
      <div className="mono-synth">
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
      </div>
    );
  }
}

export default MonoSynth;
