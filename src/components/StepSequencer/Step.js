import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.setState({ clicked: !this.state.clicked });
    this.props._handleClick && this.props._handleClick();
  }
  render() {
    return (
      <div
        onClick={this._onClick}
        className={`step ${this.state.clicked ? 'step__clicked' : 'step__not-clicked'}`}
      />
    );
  }
}

export default Step;
