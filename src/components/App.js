import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';
const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      // other key:vals get generated on the fly
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

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: {
            setInstNote: (instName, stepNum, note) => {
              if (this.state[`${instName}Notes`]) {
                const notes = this.state[`${instName}Notes`];
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes });
              } else {
                const notes = new Array(16);
                notes[stepNum] = note;
                this.setState({ [`${instName}Notes`]: notes });
              }
            }
          }
        }}
      >
        <StepSequencer _handleInstBtnClick={this.instBtnClick} />

        <MonoSynth instName="bass" isOpen={this.state.bass} _handleClose={this.instClose} />
        <MonoSynth instName="monoSynthOne" isOpen={this.state.monoSynthOne} _handleClose={this.instClose} />
        <MonoSynth instName="monoSynthTwo" isOpen={this.state.monoSynthTwo} _handleClose={this.instClose} />
        <MonoSynth instName="monoSynthThree" isOpen={this.state.monoSynthThree} _handleClose={this.instClose} />
      </Context.Provider>
    );
  }
}

export { App, Context };
