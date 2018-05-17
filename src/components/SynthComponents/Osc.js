import React, { Component } from 'react';

import Slider from '../Elements/Slider';
import Switch from '../Elements/Switch';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import Display from '../Elements/Display';

class Osc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wavType: 'saw',
      wavTypes: ['saw', 'sqr', 'tri', 'sin'],
      wavTypeI: 0
    };
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    const i = this.state.wavTypeI < 4 ? this.state.wavTypeI : 0;
    this.setState({ wavTypeI: i });
    this.setState({ wavType: this.state.wavTypes[i] });
  }
  render() {
    return (
      <div>
        <div className="control">
          <Label text="Osc Level" />
          <Slider />
        </div>
        <div className="control">
          <Label text="wave type" />
          <Button _handleClick={this._handleClick} />
        </div>
        <div className="control">
          <Display data={this.state.wavType} width={50} height={30} />
        </div>
      </div>
    );
  }
}

export default Osc;
