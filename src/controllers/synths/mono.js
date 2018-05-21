import Tone from 'tone';

const MonoSynth = function() {
  return {
    oscOne: new Tone.OmniOscillator({
      type: 'sawtooth'
    }),
    oscTwo: new Tone.OmniOscillator({
      type: 'pwm',
      spread: 40,
      count: 6,
      modulationFrequency: 0.1
    }),
    envOne: new Tone.AmplitudeEnvelope(),
    envTwo: new Tone.AmplitudeEnvelope(),
    filter: new Tone.Filter(),
    panVol: new Tone.PanVol(),
    notes: new Array(16).fill(''),

    initialise() {
      this.oscOne.connect(this.envOne);
      this.oscTwo.connect(this.envOne);
      this.envOne.connect(this.filter);
      this.filter.connect(this.envTwo);
      this.envTwo.chain(this.panVol, Tone.Master);
      // this.envTwo.toMaster();
      this.oscOne.start().sync();
      this.oscTwo.start().sync();
      this.oscOne.start();
      this.oscTwo.start();
    },
    triggerAttackRelease(note, time = '8n') {
      this.oscOne.frequency.value = note;
      this.oscTwo.frequency.value = note;
      this.envOne.triggerAttackRelease(time);
      this.envTwo.triggerAttackRelease(time);
    },
    changeOsc(oscName, shape) {
      this[oscName].stop();
      this[oscName].type = shape;
      this[oscName].start();
    },
    changeOscGain(oscName, level) {
      this[oscName].volume.value = level;
    },
    changeOscTuning(oscName, tuning) {
      this[oscName].detune.value = tuning;
    },
    setNotes(notes) {
      this.notes = notes;
    }
  };
};

export default MonoSynth;

// kick drum
// const mono = new Tone.MonoSynth({
//   "oscillator" : {
//     "type" : "sawtooth"
//   },
//   "envelope" : {
//     "attack" : 0.00,
//     "decay" : 0.1,
//     "sustain" : 0.001,
//     "release" : 0.001,
//   },
//   "filter":{
//     "Q":20
//   },
//   "filterEnvelope" : {
//     "attack" : 0.0001,
//     "decay" : 0.05,
//     "sustain" : 0.01,
//     "release" : 0.01,
//     "baseFrequency" : 60,
//     "octaves" : 4
//   }
// }).toMaster();
