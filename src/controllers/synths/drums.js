import Tone from 'tone';
///HHO

const lowPass = new Tone.Filter({
  frequency: 14000
});

const openHiHat = new Tone.NoiseSynth({
  

  envelope: {
    attack: 0.01,
    decay: 0.3
  }
}).toMaster()

export const closedHiHat = new Tone.NoiseSynth({
  volume: -10,
  filter: {
    Q: 1
  },
  envelope: {
    attack: 0.01,
    decay: 0.15
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.03,
    baseFrequency: 4000,
    octaves: -2.5,
    exponent: 4
  }
}).connect(lowPass);
lowPass.toMaster();
////kick

const kickEnvelope = new Tone.AmplitudeEnvelope({
  attack: 0.0001,
  decay: 0.8,
  sustain: 0,
  release: 0
}).toMaster();

const kick = new Tone.Oscillator('C1').connect(kickEnvelope).start();

const kickSnapEnv = new Tone.FrequencyEnvelope({
  attack: 0.005,
  decay: 0.01,
  sustain: 0,
  release: 0,
  baseFrequency: 'C1',
  octaves: 2.7
}).connect(kick.frequency);

const kickMembrane = new Tone.MembraneSynth({
  envelope: {
    pitchDecay: 0.1,
    sustain: 0,
    attack: 0.02,
    decay: 0.3
  },
  octaves: 3
}).toMaster();
export { kickEnvelope, kickSnapEnv, kickMembrane, openHiHat };
