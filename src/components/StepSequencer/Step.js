import React, { Component } from 'react';
import { Context } from '../App';
import db from '../../firebase';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      note: 'C',
      octave: 4,
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      noteIndex: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addStepToDB = this.addStepToDB.bind(this);
  }
  componentDidMount() {
    if (this.props.instName === 'kick') {
      this.setState({ note: 'G', octave: '1' });
    }
    if (this.props.instName === 'bass') {
      this.setState({ note: 'C', octave: '2' });
    }
    db
      .collection('tracks')
      .doc('test-track')
      .collection('patterns')
      .doc(this.props.instName)
      .onSnapshot((doc) => {
        if (doc.exists) {
          if (doc.data()[this.props.stepNum]) {
            const note = doc.data()[this.props.stepNum][0];
            const octave = doc.data()[this.props.stepNum][1];
            this.setState({
              note,
              octave,
              clicked: note
            });
          } else {
            this.setState({
              clicked: false
            });
          }
        }
      });
  }


  addStepToDB(stepNum, note) {
    db
      .collection('tracks')
      .doc('test-track')
      .collection('patterns')
      .doc(this.props.instName)
      .set(
        {
          [stepNum]: note
        },
        { merge: true }
      );
  }

  render() {
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div
            id={this.props.stepNum}
            className={`
            step stepNum${this.props.stepNum} 
            ${this.state.clicked ? 'step__clicked' : 'step__not-clicked'}
            ${state.currentStep === this.props.stepNum && state.playing ? 'currentStep' : ''}
            `}
            onWheel={(e) => {
              e.preventDefault();
              if (e.deltaY < 0) {
                let newIndex = this.state.noteIndex;

                if (newIndex < 6) {
                  newIndex++;
                } else {
                  newIndex = 0;
                  this.state.octave < 8 && this.setState({ octave: +this.state.octave + 1 });
                }
                this.setState({ noteIndex: newIndex, note: this.state.notes[newIndex] }, () => {
                  this.state.clicked &&
                    actions.setInstNote(
                      this.props.instName,
                      this.props.stepNum,
                      `${this.state.note}${this.state.octave}`
                    );
                  this.state.clicked && this.addStepToDB(this.props.stepNum, `${this.state.note}${this.state.octave}`);
                });
              } else if (e.deltaY > 0) {
                let newIndex = this.state.noteIndex;

                if (newIndex > 0) {
                  newIndex--;
                } else {
                  newIndex = 6;
                  this.state.octave > 0 && this.setState({ octave: +this.state.octave - 1 });
                }
                this.setState({ noteIndex: newIndex, note: this.state.notes[newIndex] }, () => {
                  this.state.clicked &&
                    actions.setInstNote(
                      this.props.instName,
                      this.props.stepNum,
                      `${this.state.note}${this.state.octave}`
                    );
                  this.state.clicked && this.addStepToDB(this.props.stepNum, `${this.state.note}${this.state.octave}`);
                });
              }
            }}
            onClick={() => {

              actions.setInstNote(
                this.props.instName,
                this.props.stepNum,
                this.state.clicked ? null : `${this.state.note}${this.state.octave}`
              );
              const clicked = !this.state.clicked;

              this.setState({ clicked: clicked }, () => {

                this.state.clicked
                  ? this.addStepToDB(this.props.stepNum, `${this.state.note}${this.state.octave}`)
                  : this.addStepToDB(this.props.stepNum, null);
              });
            }}
          >{`${this.state.note}${this.state.octave}`}</div>
        )}
      </Context.Consumer>
    );
  }
}

export default Step;
