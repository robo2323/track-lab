import React, { Component } from 'react';
import keydown, { ALL_KEYS } from 'react-keydown';

import mono from '../../controllers/synths/mono';

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
      displayOneData: ''
    };
    this.testChange = this.testChange.bind(this);
  }

  @keydown(ALL_KEYS)
  submit(e) {
    const notes = { q: 'C2', w: 'D2', e: 'E2', r: 'F2', t: 'G2', y: 'A2', u: 'B2', i: 'C3' };
    mono.triggerAttackRelease(`${notes[e.key]}`, '4n');
  }

  testPlay() {
    mono.triggerAttackRelease('C2', '2n');
  }

  testChange(e) {
    mono.filterEnvelope.baseFrequency = e.target.value;
    this.setState({ displayOneData: e.target.value });
  }
  render() {
    return (
      <div className="mono-synth">
        <div className="osc flex-row">
          <Osc />
        </div>
        <h3 className="text">MonoSynth</h3>
        <div className="filt flex-row">
          <Slider id="monBaseFrequency" _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Button _handleClick={this.testPlay} />
        </div>
        <div className="lfo flex-row">
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Switch />
        </div>
        <div className="displayContainer">
          <Display data={this.state.displayOneData} />
        </div>
        <div className="env flex-row">
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
          <Slider _onChange={this.testChange} />
        </div>
      </div>
    );
  }
}

export default MonoSynth;
