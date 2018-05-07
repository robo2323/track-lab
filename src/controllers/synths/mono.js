import Tone from 'tone';

const mono = new Tone.MonoSynth({
  detune: 5,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.01,
    decay: 0.8,
    release: 0.8
  },
  filter: {
    Q: 5,
    type: 'lowpass',
    rolloff: -24
  },
  filterEnvelope: {
    attack: 0,
    decay: 0.001,
    sustain: 0,
    release: 0,
    baseFrequency: 100,
    octaves: 3,
    exponent: 2
  }
}).toMaster();

export default mono;
