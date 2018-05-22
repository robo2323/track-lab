import React, { Component } from 'react';
import Slider from '../Elements/Slider';
import Switch from '../Elements/Switch';
import Label from '../Elements/Label';
import Display from '../Elements/Display';
class Tempo extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Display />
        <Label />
        <Switch />
      </div>
    );
  }
}

export default Tempo;
