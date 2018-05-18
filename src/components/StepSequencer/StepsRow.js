import React, { Component } from 'react';
import Step from './Step';
import Button from '../Elements/Button';
import Display from '../Elements/Display';

class StepsRow extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0' }}>
        <Display data={this.props.instLabel} width={80} height={55} />
        <Button
          styles={{ borderRadius: '50%', height: '40px', width: '40px', margin: '0 20px' }}
          _handleClick={this.props._handleInstBtnClick}
          data={this.props.instName}
        />

        <Step instName={this.props.instName} stepNum={0} />
        <Step instName={this.props.instName} stepNum={1} />
        <Step instName={this.props.instName} stepNum={2} />
        <Step instName={this.props.instName} stepNum={3} />
        <Step instName={this.props.instName} stepNum={4} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={5} />
        <Step instName={this.props.instName} stepNum={6} />
        <Step instName={this.props.instName} stepNum={7} />
        <Step instName={this.props.instName} stepNum={8} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={9} />
        <Step instName={this.props.instName} stepNum={10} />
        <Step instName={this.props.instName} stepNum={11} />
        <Step instName={this.props.instName} stepNum={12} />
        <span>||</span>
        <Step instName={this.props.instName} stepNum={13} />
        <Step instName={this.props.instName} stepNum={14} />
        <Step instName={this.props.instName} stepNum={15} />      
      </div>
    );
  }
}

export default StepsRow;
