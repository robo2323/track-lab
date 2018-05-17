import Tone from 'tone';

const mono = new Tone.MonoSynth({
  detune: 0,
  oscillator: {
    type: 'sawtooth'
  },
  envelope: {
    attack: 0.0,
    decay: 1.5,
    release: 2
  },
  filter: {
    type: 'lowpass',
    frequency: 1000,
    rolloff: -12,
    Q: 0,
    gain: 0
  },
  filterEnvelope: {
    attack: 0,
    decay: 0.001,
    sustain: 0,
    release: 0,
    baseFrequency: 500,
    octaves: 5,
    exponent: 5
  }
}).toMaster();

export default mono;
