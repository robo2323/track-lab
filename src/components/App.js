import React, { Component } from 'react';
import MonoSynth from './Synths/MonoSynth';
import StepSequencer from './StepSequencer/StepSequencer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monoSynth: false
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
      <div>
        <StepSequencer _handleInstBtnClick={this.instBtnClick} />
        <MonoSynth instName="monoSynth" isOpen={this.state.monoSynth} _handleClose={this.instClose} />
      </div>
    );
  }
}

export default App;
