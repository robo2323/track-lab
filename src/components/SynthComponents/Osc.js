import React, { Component } from 'react';

import Slider from '../Elements/Slider';
// import Switch from '../Elements/Switch';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import Display from '../Elements/Display';
import { Context } from '../App';

class Osc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wavTypes: this.props.wavTypes,
      // index/counter to cycle through wave type array
      wavTypeI: this.props.wavTypes.indexOf(this.props.wavType)
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleLevelChange = this._handleLevelChange.bind(this);
    this._handleTuningChange = this._handleTuningChange.bind(this);
  }
  _handleClick() {
    const i = this.state.wavTypeI < this.state.wavTypes.length - 1 ? this.state.wavTypeI + 1 : 0;
    this.setState({ wavTypeI: i });

    this.props.oscChange({ oscName: this.props.oscName, wavtype: this.state.wavTypes[i] });
    // get oscname for db call
    const oscName = `${this.props.oscName}Wav`;
    // update osc type in db
    this.props.db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .set(
        {
          [oscName]: this.state.wavTypes[i]
        },
        { merge: true }
      );
  }

  _handleLevelChange(target) {
    this.props.gainChange({ oscName: this.props.oscName, level: target.value });

    const oscName = `${this.props.oscName}Gain`;

    this.props.db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .set(
        {
          [oscName]: target.value
        },
        { merge: true }
      );
  }

  _handleTuningChange(target) {
    let oscName;
    if (target.id === 'fine') {
      const tuning = +this.props.tuningCourse + +target.value;

      this.props.tuningChange({ oscName: this.props.oscName, tuning });

      oscName = `${this.props.oscName}TuningFine`;
    } else {
      this.props.tuningChange({ oscName: this.props.oscName, tuning: target.value });
      oscName = `${this.props.oscName}TuningCourse`;
    }
    this.props.db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .set(
        {
          [oscName]: target.value
        },
        { merge: true }
      );
  }

  render() {
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div className="osc-container">
            <div className="osc-level">
              <Slider _input={this._handleLevelChange} min={-15} max={10} value={this.props.gain} />
              <p />
              <Label text="Osc Level" />
            </div>
            <div className="wavtype">
              <Label text="Wave Shape" />
              <Button _handleClick={this._handleClick} />
              <Display data={this.props.wavType} width={48} height={28} />
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
              <Display data={this.props.tuning} width={48} height={28} />
              <Label text="Tuning" />
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default Osc;
