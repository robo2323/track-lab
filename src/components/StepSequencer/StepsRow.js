import React, { Component } from 'react';
import Step from './Step';
import Button from '../Elements/Button';
import Display from '../Elements/Display';
import Slider from '../Elements/Slider';

class StepsRow extends Component {
  componentDidUpdate() {}
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0', position: 'relative' }}>
        <Display data={this.props.instLabel} width={80} height={55} />
        <Slider min={-15} max={10} sliderClass={'slider-small'} styles={{left:'80px'}} />
        <Button
          styles={{ borderRadius: '50%', height: '40px', width: '40px', margin: '0 20px' }}
          _handleClick={this.props._handleInstBtnClick}
          data={this.props.instName}
        />

        <Step instName={this.props.instName} stepNum={0} />
        <Step instName={this.props.instName} stepNum={1} />
        <Step instName={this.props.instName} stepNum={2} />
        <Step instName={this.props.instName} stepNum={3} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={4} />
        <Step instName={this.props.instName} stepNum={5} />
        <Step instName={this.props.instName} stepNum={6} />
        <Step instName={this.props.instName} stepNum={7} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={8} />
        <Step instName={this.props.instName} stepNum={9} />
        <Step instName={this.props.instName} stepNum={10} />
        <Step instName={this.props.instName} stepNum={11} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={12} />
        <Step instName={this.props.instName} stepNum={13} />
        <Step instName={this.props.instName} stepNum={14} />
        <Step instName={this.props.instName} stepNum={15} />
      </div>
    );
  }
}

export default StepsRow;
