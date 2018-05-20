import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';
const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // note arrays for each track/instrument
      // key:vals get generated on the fly
    };
    this.instBtnClick = this.instBtnClick.bind(this);
    this.instClose = this.instClose.bind(this);
  }

  instBtnClick(instName) {
    this.setState({ [instName]: true });
  }

  instClose(instName) {
    this.setState({ [instName]: false });
  }
  play() {
    this.loop.start();
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
                this.setState({ [`${instName}Notes`]: notes });
              } else {
                const notes = new Array(16).fill("");
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes });
              }
            }
          }
        }}
      >
        <StepSequencer _handleInstBtnClick={this.instBtnClick} />

        <MonoSynth
          instName="bass"
          isOpen={this.state.bass}
          _handleClose={this.instClose}
          notes={this.state.bassNotes && this.state.bassNotes}
        />

        <MonoSynth
          instName="monoSynthOne"
          isOpen={this.state.monoSynthOne}
          _handleClose={this.instClose}
          notes={this.state.monoSynthOneNotes && this.state.monoSynthOneNotes}
        />

        <MonoSynth
          instName="monoSynthTwo"
          isOpen={this.state.monoSynthTwo}
          _handleClose={this.instClose}
          notes={this.state.monoSynthTwoNotes && this.state.monoSynthTwoNotes}
        />

        <MonoSynth
          instName="monoSynthThree"
          isOpen={this.state.monoSynthThree}
          _handleClose={this.instClose}
          notes={this.state.monoSynthThreeNotes && this.state.monoSynthThreeNotes}
        />

        <button onClick={this.play}>play</button>
      </Context.Provider>
    );
  }
}

export { App, Context };
