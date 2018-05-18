import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.setState({ switched: !this.state.switched });
    this.props._handleClick && this.props._handleClick(this.props.data);
  }
  render() {
    const styles = this.props.styles || {};
    return (
      <div
        onClick={this._onClick}
        className={`button ${this.state.switched ? 'button__pressed' : 'button__not-pressed'}`}
        style={styles}
      />
    );
  }
}

export default Button;
