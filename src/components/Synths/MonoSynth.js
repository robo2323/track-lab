import React, { Component } from 'react';
import keydown, { ALL_KEYS } from 'react-keydown';
import Modal from 'react-modal';
import Osc from '../SynthComponents/Osc';
import db from '../../firebase';

import MonoSynthController from '../../controllers/synths/mono';

class MonoSynth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOneData: '',
      wavs: { saw: 'sawtooth', sin: 'sine', sqr: 'square', tri: 'triangle', pwm: 'pwm', Fsw: 'fatsawtooth' },
      oscOneWav: 'saw',
      oscOneGain: 0,
      oscOneTuningCourse: 0,
      oscOneTuningFine: 0,
      oscOneTuning: 0,
      oscTwoWav: 'pwm',
      oscTwoGain: 0,
      oscTwoTuningCourse: 0,
      oscTwoTuningFine: 0,
      oscTwoTuning: 0
    };
    this._handleOscChange = this._handleOscChange.bind(this);
    this._handleSliderLevelChange = this._handleSliderLevelChange.bind(this);
    this._handleSliderTuningChange = this._handleSliderTuningChange.bind(this);
    this.close = this.close.bind(this);

    this.monoSynth = new MonoSynthController();
    this.monoSynth.initialise();
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
    this.monoSynth.triggerAttackRelease(`${notes[e.key]}`);
  }
  componentDidUpdate() {
    if (this.props.notes) {
      this.monoSynth.setNotes(this.props.notes);

      db
        .collection('tracks')
        .doc('test-track')
        .collection('patterns')
        .doc('1')
        .set(
          {
            [this.props.instName]: this.props.notes
          },
          { merge: true }
        );
    }
  }
  componentDidMount() {
    db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .onSnapshot((doc) => {
        const settings = doc.data();
        if (!settings) {
          db
            .collection('tracks')
            .doc('test-track')
            .collection('synthSettings')
            .doc(this.props.instName)
            .set({
              oscOneGain: 0,
              oscOneWav: 'saw',
              oscOneTuningCourse: 0,
              oscOneTuningFine: 0,
              oscOneTuning: 0,
              oscTwoGain: 0,
              oscTwoWav: 'pwm',
              oscTwoTuningCourse: 0,
              oscTwoTuningFine: 0
            });
        } else {
          this.setState({
            oscOneGain: settings.oscOneGain,
            oscOneWav: settings.oscOneWav,
            oscOneTuningCourse: settings.oscOneTuningCourse,
            oscOneTuningFine: settings.oscOneTuningFine,
            oscOneTuning: +settings.oscOneTuningCourse + +settings.oscOneTuningFine,
            oscTwoGain: settings.oscTwoGain,
            oscTwoWav: settings.oscTwoWav,
            oscTwoTuningCourse: settings.oscTwoTuningCourse,
            oscTwoTuningFine: settings.oscTwoTuningFine,
            oscTwoTuning: +settings.oscTwoTuningCourse + +settings.oscTwoTuningFine
          });
        }
      });
  }
  close() {
    this.props._handleClose(this.props.instName);
  }
  _handleOscChange({ oscName, wavtype }) {
    this.monoSynth.changeOsc(oscName, this.state.wavs[wavtype]);
  }
  _handleSliderLevelChange({ oscName, level }) {
    this.monoSynth.changeOscGain(oscName, level);
    level < -14 ? this.monoSynth.changeOscGain(oscName, -100) : this.monoSynth.changeOscGain(oscName, level);
  }
  _handleSliderTuningChange({ oscName, tuning }) {
    this.monoSynth.changeOscTuning(oscName, tuning);
  }

  render() {
    return (
      <Modal
        className="mono-synth"
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props._handleClose}
        contentLabel="Mono Synth"
        ariaHideApp={false}
      >
        <div className="osc flex-row">
          <Osc
            tuningCourse={this.state.oscOneTuningCourse}
            tuningFine={this.state.oscOneTuningFine}
            tuning={this.state.oscOneTuning}
            gain={this.state.oscOneGain}
            oscName={'oscOne'}
            wavType={this.state.oscOneWav}
            wavTypes={['saw', 'tri', 'sin', 'sqr']}
            oscChange={this._handleOscChange}
            gainChange={this._handleSliderLevelChange}
            tuningChange={this._handleSliderTuningChange}
            instName={this.props.instName}
            db={db}
          />
        </div>
        <div className="osc flex-row">
          <Osc
            tuningCourse={this.state.oscTwoTuningCourse}
            tuningFine={this.state.oscTwoTuningFine}
            tuning={this.state.oscTwoTuning}
            gain={this.state.oscTwoGain}
            oscName={'oscTwo'}
            wavType={this.state.oscTwoWav}
            wavTypes={['pwm', 'Fsw']}
            oscChange={this._handleOscChange}
            gainChange={this._handleSliderLevelChange}
            tuningChange={this._handleSliderTuningChange}
            instName={this.props.instName}
            db={db}
          />
        </div>
        <h3 className="text">MonoSynth</h3>
        <button onClick={this.close}>X</button>
      </Modal>
    );
  }
}

export default MonoSynth;
