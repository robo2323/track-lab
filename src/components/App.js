import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';
import Tone from 'tone';
import db from '../firebase';
import Kick from './Synths/Kick';
import OpenHiHat from './Synths/OpenHiHat';
import ClosedHiHat from './Synths/ClosedHiHat';
import Snare from './Synths/Snare';
import Ride from './Synths/Ride';
import Clap from './Synths/Clap';

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
    this.componentDidMount = this.componentDidMount.bind(this);
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

  componentDidMount() {
    db
      .collection('tracks')
      .doc('test-track')
      .collection('patterns')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const notes = [];
          for (const note in doc.data()) {
            if (doc.data().hasOwnProperty(note)) {
              notes.push(doc.data()[note]);
              this.setState({ currentNote: doc.data()[note] });
            }
          }
          this.setState({ [`${doc.id}Notes`]: notes });
        });
      });
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
              if (this.state[`${instName}Notes`]) {
                const notes = this.state[`${instName}Notes`];
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes, [`${instName}CurrentNote`]: [stepNum, note] });
              }
            }
          }
        }}
      >
        <StepSequencer
          _handleVolumeSlider={this.volumeSlider}
          _handleInstBtnClick={this.instBtnClick}
          bassVolume={this.state.bassVolume}
          kickVolume={this.state.kickVolume}
          monoSynthOneVolume={this.state.monoSynthOneVolume}
          monoSynthTwoVolume={this.state.monoSynthTwoVolume}
          monoSynthThreeVolume={this.state.monoSynthThreeVolume}
          openHiHatVolume={this.state.openHiHatVolume}
          closedHiHatVolume={this.state.closedHiHatVolume}
          snareVolume={this.state.snareVolume}
          rideVolume={this.state.rideVolume}
          clapVolume={this.state.clapVolume}
          play={this.play}
          stop={this.stop}
        />

        <Kick
          instName="kick"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.kickCurrentNote && this.state.kickCurrentNote}
          volume={this.state.kickVolume}
          notes={this.state.kickNotes}
        />
        <OpenHiHat
          instName="openHiHat"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.openHiHatCurrentNote && this.state.openHiHatCurrentNote}
          volume={this.state.openHiHatVolume}
          notes={this.state.openHiHatNotes}
        />
        <ClosedHiHat
          instName="closedHiHat"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.closedHiHatCurrentNote && this.state.closedHiHatCurrentNote}
          volume={this.state.closedHiHatVolume}
          notes={this.state.closedHiHatNotes}
        />
        <Snare
          instName="snare"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.snareCurrentNote && this.state.snareCurrentNote}
          volume={this.state.snareVolume}
          notes={this.state.snareNotes}
        />
        <Ride
          instName="ride"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.rideCurrentNote && this.state.rideCurrentNote}
          volume={this.state.rideVolume}
          notes={this.state.rideNotes}
        />
        <Clap
          instName="clap"
          createInstNotes={this.createInstNotes}
          playing={this.state.playing}
          currentNote={this.state.clapCurrentNote && this.state.clapCurrentNote}
          volume={this.state.clapVolume}
          notes={this.state.clapNotes}
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
      </Context.Provider>
    );
  }
}

export { App, Context };
