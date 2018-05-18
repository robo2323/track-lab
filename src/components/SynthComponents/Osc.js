import React, { Component } from 'react';

import Slider from '../Elements/Slider';
// import Switch from '../Elements/Switch';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import Display from '../Elements/Display';

class Osc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wavType: this.props.wavType,
      wavTypes: this.props.wavTypes,
      wavTypeI: 0,
      tuningCourse: this.props.tuningCourse,
      tuningFine: this.props.tuningFine,
      tuning: 0,
      gain:this.props.gain
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleLevelChange = this._handleLevelChange.bind(this);
    this._handleTuningChange = this._handleTuningChange.bind(this);
  }
  _handleClick() {
    const i = this.state.wavTypeI < this.state.wavTypes.length - 1 ? this.state.wavTypeI + 1 : 0;
    this.setState({ wavTypeI: i });
    this.setState({ wavType: this.state.wavTypes[i] });
    this.props.oscChange({ oscName: this.props.oscName, wavtype: this.state.wavTypes[i] });
  }
  _handleLevelChange(target) {
    this.props.gainChange({ oscName: this.props.oscName, level: target.value });
  }
  _handleTuningChange(target) {
    if (target.id === 'fine') {
      const tuning = +this.state.tuningCourse + +target.value;
      this.setState({ tuning });
      this.props.tuningChange({ oscName: this.props.oscName, tuning });
    } else {
      this.setState({ tuning: target.value });
      this.setState({ tuningCourse: target.value });
      this.props.tuningChange({ oscName: this.props.oscName, tuning: target.value });
    }
  }
  render() {
    return (

      <div className="osc-container">
        <div className="osc-level">
          <Slider _input={this._handleLevelChange} min={-15} max={10} value={0} />
          <p />
          <Label text="Osc Level" />
        </div>
        <div className="wavtype">
          <Label text="Wave Shape" />
          <Button _handleClick={this._handleClick} />
          <Display data={this.state.wavType} width={48} height={28} />
        </div>
        <div className="tuning">
          <Slider
            styles={{ left: '2px' }}
            min={-1200}
            max={1200}
            value={this.props.tuningCourse}
            step={100}
            _input={this._handleTuningChange}
          />
          <Slider
            styles={{ left: '-30px' }}
            min={-100}
            max={100}
            value={this.props.tuningFine}
            step={1}
            _input={this._handleTuningChange}
            id="fine"
          />
          <Display data={this.state.tuning} width={48} height={28} />
          <Label text="Tuning" />
        </div>
      </div>
    );
  }
}

export default Osc;
