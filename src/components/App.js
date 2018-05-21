import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';
import Tone from 'tone';
import db from '../firebase';

const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // note arrays for each track/instrument
      // key:vals get generated on the fly
      currentNote: '',
      currentStep: 0,
      play: false,
      playing: false
    };
    this.instBtnClick = this.instBtnClick.bind(this);
    this.instClose = this.instClose.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.createInstNotes = this.createInstNotes.bind(this);
    const notes = new Array(16).fill('');
    this.loop = new Tone.Sequence(
      (time, note) => {
        Tone.Draw.schedule(() => {
          let c = this.state.currentStep;
          c < 16 ? c++ : (c = 0);
          this.setState({ currentStep: c });
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

  instClose(instName) {
    this.setState({ [instName]: false });
  }
  play() {
    Tone.Transport.start();
    this.loop.start();
    this.setState({ playing: true });
  }
  stop() {
    Tone.Transport.stop();
    this.loop.stop();
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
              if (this.state[`${instName}Notes`]) {
                const notes = this.state[`${instName}Notes`];
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes, [`${instName}CurrentNote`]: [stepNum, note] });
                
              }
            }
          }
        }}
      >
        <StepSequencer _handleInstBtnClick={this.instBtnClick} />

        <MonoSynth
          instName="bass"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.bass}
          _handleClose={this.instClose}
          notes={this.state.bassNotes}
          currentNote={this.state.bassCurrentNote && this.state.bassCurrentNote}
          play={this.state.play}
          incCurrentStep={this.incCurrentStep}
        />

        <MonoSynth
          instName="monoSynthOne"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthOne}
          _handleClose={this.instClose}
          notes={this.state.monoSynthOneNotes}
          currentNote={this.state.monoSynthOneCurrentNote && this.state.monoSynthOneCurrentNote}
          play={this.state.play}
          incCurrentStep={this.incCurrentStep}
        />

        <MonoSynth
          instName="monoSynthTwo"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthTwo}
          _handleClose={this.instClose}
          notes={this.state.monoSynthTwoNotes}
          currentNote={this.state.monoSynthTwoCurrentNote && this.state.monoSynthTwoCurrentNote}
          play={this.state.play}
          incCurrentStep={this.incCurrentStep}
        />

        <MonoSynth
          instName="monoSynthThree"
          createInstNotes={this.createInstNotes}
          isOpen={this.state.monoSynthThree}
          _handleClose={this.instClose}
          notes={this.state.monoSynthThreeNotes}
          currentNote={this.state.monoSynthTwoCurrentNote && this.state.monoSynthTwoCurrentNote}
          play={this.state.play}
          incCurrentStep={this.incCurrentStep}
        />

        <button onClick={this.play}>play</button>
        <button onClick={this.stop}>stop</button>
      </Context.Provider>
    );
  }
}

export { App, Context };
