import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';
import Tone from 'tone';
import db from '../firebase';
import Kick from './Synths/Kick';

const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // note arrays for each track/instrument
      // key:vals get generated on the fly
      currentNote: '',
      currentStep: 0,

      playing: false
    };
    this.instBtnClick = this.instBtnClick.bind(this);
    this.instClose = this.instClose.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.createInstNotes = this.createInstNotes.bind(this);
    this.volumeSlider = this.volumeSlider.bind(this);
    const notes = new Array(16).fill('');

    this.loop = new Tone.Sequence(
      (time, note) => {
        const that = this;
        Tone.Draw.schedule(function() {
          let c = that.state.currentStep;
          c < 15 ? c++ : (c = 0);
          that.setState({ currentStep: c });
        }, time);
      },
      notes,
      '16n'
    );
  }
  createInstNotes(instName) {
    this.setState({ [`${instName}Notes`]: new Array(16).fill(null) });
  }
  instBtnClick(instName) {
    this.setState({ [instName]: true });
  }
  volumeSlider(target, instName) {
    this.setState({ [`${instName}Volume`]: target.value });
  }

  instClose(instName) {
    this.setState({ [instName]: false });
  }
  play() {
    this.loop.start('+0.18');
    Tone.Transport.start('+0.18');
    this.setState({ playing: true });
  }
  stop() {
    this.loop.stop();

    Tone.Transport.stop();
    this.setState({ playing: false });
  }

  render() {
    return (
      <Context.Provider

        value={{
          state: this.state,
          actions: {
            setState: (key, val) => {
              this.setState({ key: val });
            },
            setInstNote: (instName, stepNum, note) => {
              console.log(note);

              if (this.state[`${instName}Notes`]) {
                const notes = this.state[`${instName}Notes`];
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes, [`${instName}CurrentNote`]: [stepNum, note] });
              }
            }
          }
        }}
      >
        <StepSequencer _handleVolumeSlider={this.volumeSlider} _handleInstBtnClick={this.instBtnClick} />

        <Kick
          instName="kick"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.kickCurrentNote && this.state.kickCurrentNote}
        />
        <MonoSynth
          instName="bass"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.bass}
          _handleClose={this.instClose}
          notes={this.state.bassNotes}
          currentNote={this.state.bassCurrentNote && this.state.bassCurrentNote}
          volume={this.state.bassVolume}
          playing={this.state.playing}
        />
        <MonoSynth
          instName="monoSynthOne"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthOne}
          _handleClose={this.instClose}
          notes={this.state.monoSynthOneNotes}
          currentNote={this.state.monoSynthOneCurrentNote && this.state.monoSynthOneCurrentNote}
          playing={this.state.playing}
          volume={this.state.monoSynthOneVolume}
        />
        <MonoSynth
          instName="monoSynthTwo"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthTwo}
          _handleClose={this.instClose}
          notes={this.state.monoSynthTwoNotes}
          currentNote={this.state.monoSynthTwoCurrentNote && this.state.monoSynthTwoCurrentNote}
          playing={this.state.playing}
          volume={this.state.monoSynthTwoVolume}
        />
        <MonoSynth
          instName="monoSynthThree"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthThree}
          _handleClose={this.instClose}
          notes={this.state.monoSynthThreeNotes}
          currentNote={this.state.monoSynthThreeCurrentNote && this.state.monoSynthThreeCurrentNote}
          volume={this.state.monoSynthThreeVolume}
          playing={this.state.playing}
        />
        <button onClick={this.play}>play</button>
        <button onClick={this.stop}>stop</button>
      </Context.Provider>
    );
  }
}

export { App, Context };
