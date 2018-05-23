import React, { Component } from 'react';
import keydown, { ALL_KEYS } from 'react-keydown';
import Modal from 'react-modal';
import Osc from '../SynthComponents/Osc';
import db from '../../firebase';
import Tone from 'tone';

import MonoSynthController from '../../controllers/synths/mono';
import Filter from '../SynthComponents/Filter';
import Display from '../Elements/Display';

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
      oscTwoTuning: 0,
      filtType: 'lp',
      filtCutoff: 5000,
      filtQ: 1,
      playing: false
    };
    this._handleOscChange = this._handleOscChange.bind(this);
    this._handleSliderLevelChange = this._handleSliderLevelChange.bind(this);
    this._handleSliderTuningChange = this._handleSliderTuningChange.bind(this);
    this.close = this.close.bind(this);
    this._handleFilterParamChange = this._handleFilterParamChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.monoSynth = new MonoSynthController();
    this.monoSynth.initialise();
    this.notes = new Array(16).fill(null);
    this.loop = new Tone.Sequence(
      (time, note) => {
        this.monoSynth.triggerAttackRelease(note);
      },
      this.notes,
      '16n'
    );

    // this.loop.start();
    // db
    //   .collection('tracks')
    //   .doc('test-track')
    //   .collection('patterns')
    //   .doc('1')
    //   .onSnapshot(doc=>{

    //   })
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
    if (this.props.playing && !this.state.playing) {
      this.loop.start();
    } else if (!this.props.playing && this.state.playing) {
      this.loop.stop();
    }
    if (this.props.volume && +this.props.volume > -15) {
      this.monoSynth.panVol.set('mute', false);
      this.monoSynth.panVol.set('volume', +this.props.volume);
    } else if (this.props.volume && +this.props.volume === -15) {
      this.monoSynth.panVol.set('mute', true);
    }
    if (this.props.notes) {
      for (let i = 0; i < this.props.notes.length; i++) {
        this.loop.remove(i);

        this.loop.add(i, this.props.notes[i]);
      }
    }

    if (this.props.currentNote) {
      const noteIndex = this.props.currentNote[0];
      const note = this.props.currentNote[1];

      if (!note) {
        this.loop.remove(noteIndex);
      } else {
        this.loop.remove(noteIndex);

        this.loop.add(noteIndex, note);
      }
    }


  }

  componentDidMount() {
    // this.props.createInstNotes(this.props.instName);
    // db
    //   .collection('tracks')
    //   .doc('test-track')
    //   .collection('patterns')
    //   .doc(this.props.instName)
    //   .set({
    //     0: null,
    //     1: null,
    //     2: null,
    //     3: null,
    //     4: null,
    //     5: null,
    //     6: null,
    //     7: null,
    //     8: null,
    //     9: null,
    //     10: null,
    //     11: null,
    //     12: null,
    //     13: null,
    //     14: null,
    //     15: null
    //   });

    db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .onSnapshot((doc) => {
        const settings = doc.data();

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
          oscTwoTuning: +settings.oscTwoTuningCourse + +settings.oscTwoTuningFine,
          filtType: settings.filtType,
          filtCutoff: settings.filtCutoff,
          filtQ: settings.filtQ
        });
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

  _handleFilterParamChange(param, value) {
    if (value === 'lp') {
      value = 'lowpass';
    } else if (value === 'hp') {
      value = 'highpass';
    }
    this.monoSynth.filter.set(param === 'cutoff' ? 'frequency' : param, value);
  }

  render() {
    return (
      <Modal
        className="mono-synth modal"
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props._handleClose}
        contentLabel="Mono Synth"
        ariaHideApp={false}
        overlayClassName="overlayBg"
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
        <div className="text">
          <Display data={this.props.instName} width="300px" margin="auto" fontSize="30px" />
        </div>

        <Filter
          className="filt flex-row"
          filtTypes={['lp', 'hp']}
          filtType={this.state.filtType}
          paramChange={this._handleFilterParamChange}
          db={db}
          instName={this.props.instName}
          q={this.state.filtQ}
          cutoff={this.state.filtCutoff}
        />
        <div className="x">
          <button
            style={{ width: '80px', height: '35px', color: '#fefefe', fontSize: '25px' }}
            className="button"
            onClick={this.close}
          >
            X
          </button>
        </div>
      </Modal>
    );
  }
}

export default MonoSynth;
