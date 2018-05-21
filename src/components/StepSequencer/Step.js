import React, { Component } from 'react';
import { Context } from '../App';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  render() {
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div
            id={this.props.stepNum}
            className={`
            step stepNum${this.props.stepNum} 
            ${this.state.clicked ? 'step__clicked' : 'step__not-clicked'}
            ${state.currentStep === this.props.stepNum && state.playing ? 'currentStep' : ''}
            `}
            onClick={() => {
              actions.setInstNote(this.props.instName, this.props.stepNum, this.state.clicked ? null : 'C3');
              this.setState({ clicked: !this.state.clicked });
            }}
          />
        )}
      </Context.Consumer>
    );
  }
}

export default Step;
