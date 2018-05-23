import React, { Component } from 'react';

import Tone from 'tone';

import wav from '../../samples/808_drum_kit/snares/808-Clap02.wav';

class Clap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    const notes = new Array(16).fill(null);
    this.clap = new Tone.Player({
      url: wav
    }).toMaster();
    this.loop = new Tone.Sequence(
      (time, note) => {
        this.clap.start();
      },
      notes,
      '16n'
    );
  }
  // componentDidMount() {
  //   // this.props.createInstNotes(this.props.instName);
  // }
  componentDidUpdate() {
    if (this.props.playing && !this.state.playing) {
      this.loop.start();
    } else if (!this.props.playing && this.state.playing) {
      this.loop.stop();
    }
    // console.log(kickMembrane.volume.value);

    if (this.props.volume && +this.props.volume > -15) {
      this.clap.set('volume', this.props.volume);
    } else if (this.props.volume && +this.props.volume === -15) {
      this.clap.set('volume', -100);
    }
    if (this.props.notes) {
      for (let i = 0; i < this.props.notes.length; i++) {
        this.loop.remove(i);

        this.loop.add(i, this.props.notes[i]);
      }
    }
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
  }

  render() {
    return <div />;
  }
}

export default Clap;
