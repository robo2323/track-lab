import React, { Component } from 'react';

import Slider from '../Elements/Slider';
import Switch from '../Elements/Switch';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import Display from '../Elements/Display';
import { Context } from '../App';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtTypes: this.props.filtTypes,
      // index/counter to cycle through wave type array
      filtTypeI: this.props.filtTypes.indexOf(this.props.filtType)
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleParamChange = this._handleParamChange.bind(this);
  }
  _handleClick() {
    const i = this.state.filtTypeI < this.state.filtTypes.length - 1 ? this.state.filtTypeI + 1 : 0;
    this.setState({ filtTypeI: i });

    this.props.paramChange('type', this.state.filtTypes[i]);

    this.props.db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .set(
        {
          filtType: this.state.filtTypes[i]
        },
        { merge: true }
      );
  }

  _handleParamChange(target) {
    const param = target.id;
    this.props.paramChange(param, target.value);

    this.props.db
      .collection('tracks')
      .doc('test-track')
      .collection('synthSettings')
      .doc(this.props.instName)
      .set(
        {
          [param]: target.value
        },
        { merge: true }
      );
  }

  render() {
    console.log(this.props.cutoff);
    
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div className="filt-container">
            <div className="filt-type">
              <Label text="Filter Type" />
              <Button _handleClick={this._handleClick} />
              <Display data={this.props.filtType} width={48} height={28} />
            </div>

            <div className="filter-cutoff-q">
              <Slider
                styles={{ left: '22px' }}
                min={0}
                max={1000}
                value={this.props.cutoff}
                step={1}
                _input={this._handleParamChange}
                id="filtCutoff"
              />

              <Slider              
                styles={{ left: '-22px' }}
                min={0}
                max={20}
                value={this.props.q}
                step={1}
                _input={this._handleParamChange}
                id="filtQ"
              />
              <Label text="Cutoff/Q" />
              
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default Filter;
