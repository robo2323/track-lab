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
            onClick={() => {
              this.setState({ clicked: !this.state.clicked });
              actions.setInstNote(this.props.instName, this.props.stepNum, 'C4');
            }}
            className={`step ${this.state.clicked ? 'step__clicked' : 'step__not-clicked'}`}
          />
        )}
      </Context.Consumer>
    );
  }
}

export default Step;
