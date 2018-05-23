import React, { Component } from 'react';
import Step from './Step';
import Button from '../Elements/Button';
import Display from '../Elements/Display';
import Slider from '../Elements/Slider';
import randomColor from 'randomcolor';
import db from '../../firebase';

class StepsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: randomColor()
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    db
      .collection('tracks')
      .doc('test-track')
      .collection('patterns')
      .doc(this.props.instName)
      .onSnapshot((doc) => {
        if (doc.data()) {
          this.setState({
            0: doc.data()['0'],
            1: doc.data()['1'],
            2: doc.data()['2'],
            3: doc.data()['3'],
            4: doc.data()['4'],
            5: doc.data()['5'],
            6: doc.data()['6'],
            7: doc.data()['7'],
            8: doc.data()['8'],
            9: doc.data()['9'],
            10: doc.data()['10'],
            11: doc.data()['11'],
            12: doc.data()['12'],
            13: doc.data()['13'],
            14: doc.data()['14'],
            15: doc.data()['15']
          });
        }
      });
  }
  componentDidUpdate() {}
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: '10px 0',
          position: 'relative',
          backgroundColor: this.state.color,
          borderRadius: '6px',
          paddingRight: '8px'
        }}
      >
        <Display data={this.props.instLabel} width={100} height={55} />
        <Slider
          min={-15}
          max={10}
          value={this.props.volume}
          sliderClass={'slider-small'}
          styles={{ left: '103px' }}
          _input={this.props._handleVolumeSlider}
          instName={this.props.instName}
        />
        <Button
          styles={{ borderRadius: '50%', height: '40px', width: '40px', margin: '0 20px' }}
          _handleClick={this.props._handleInstBtnClick}
          data={this.props.instName}
        />

        <Step instName={this.props.instName} note={this.state[0]} stepNum={0} />
        <Step instName={this.props.instName} note={this.state[1]} stepNum={1} />
        <Step instName={this.props.instName} note={this.state[2]} stepNum={2} />
        <Step instName={this.props.instName} note={this.state[3]} stepNum={3} />
        <span>||</span>
        <Step instName={this.props.instName} note={this.state[4]} stepNum={4} />
        <Step instName={this.props.instName} note={this.state[5]} stepNum={5} />
        <Step instName={this.props.instName} note={this.state[6]} stepNum={6} />
        <Step instName={this.props.instName} note={this.state[7]} stepNum={7} />
        <span>||</span>
        <Step instName={this.props.instName} note={this.state[8]} stepNum={8} />
        <Step instName={this.props.instName} note={this.state[9]} stepNum={9} />
        <Step instName={this.props.instName} note={this.state[10]} stepNum={10} />
        <Step instName={this.props.instName} note={this.state[11]} stepNum={11} />
        <span>||</span>
        <Step instName={this.props.instName} note={this.state[12]} stepNum={12} />
        <Step instName={this.props.instName} note={this.state[13]} stepNum={13} />
        <Step instName={this.props.instName} note={this.state[14]} stepNum={14} />
        <Step instName={this.props.instName} note={this.state[15]} stepNum={15} />
      </div>
    );
  }
}

export default StepsRow;
