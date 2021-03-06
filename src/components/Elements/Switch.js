import React, { Component } from 'react';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
    this._onClick = this._onClick.bind(this);
  }
  _onClick() {
    this.setState({ switched: !this.state.switched });

    this.state.switched ? this.props._handleOff() : this.props._handleClick();
  }

  render() {
    return (
      <div
        onClick={this._onClick}
        style={{ boxShadow: 'INSET 5px 5px 5px 2px rgba(34, 34, 34, 0.7)' }}
        className={`switch-container ${
          this.state.switched ? 'switch-container__switched' : 'switch-container__not-switched'
        }`}
      >
        <div className={`switch ${this.state.switched ? 'switch__switched' : ''}`} />
      </div>
    );
  }
}

export default Switch;
