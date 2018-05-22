import React, { Component } from 'react';

import Tone from 'tone';

import { kickMembrane } from '../../controllers/synths/drums';

class Kick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    const notes = new Array(16).fill(null);
    this.loop = new Tone.Sequence(
      (time, note) => {
        kickMembrane.triggerAttackRelease(note,'32n',time);
        
      },
      notes,
      '16n'
    );
  }
  componentDidMount() {
    this.props.createInstNotes(this.props.instName);
  }
  componentDidUpdate() {
    if (this.props.playing && !this.state.playing) {
      this.loop.start();
    } else if (!this.props.playing && this.state.playing) {
      this.loop.stop();
    }
    // if (this.props.volume && +this.props.volume > -15) {
    //   this.monoSynth.panVol.set('mute', false);
    //   this.monoSynth.panVol.set('volume', +this.props.volume);
    // } else if (this.props.volume && +this.props.volume === -15) {
    //   this.monoSynth.panVol.set('mute', true);
    // }

    if (this.props.currentNote) {
      const noteIndex = this.props.currentNote[0];
      const note = this.props.currentNote[1];

      if (!note) {
        this.loop.remove(noteIndex);
      } else {
        this.loop.remove(noteIndex);

        this.loop.add(noteIndex, note);
      }
    }

    // if (this.props.notes) {
    //   this.monoSynth.setNotes(this.props.notes);

    //   // db
    //   //   .collection('tracks')
    //   //   .doc('test-track')
    //   //   .collection('patterns')
    //   //   .doc('1')
    //   //   .set(
    //   //     {
    //   //       [this.props.instName]: this.props.notes
    //   //     },
    //   //     { merge: true }
    //   //   );
    // }
  }

  render() {
    return <div />;
  }
}

export default Kick;
