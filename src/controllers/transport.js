import Tone from 'tone';
Tone.Transport.start();
export const Loop = function() {
  return {
    loop: new Tone.Sequence(
      function(time, note) {
        that.oscOne.frequency.value = note;
        that.oscTwo.frequency.value = note;
        that.envOne.triggerAttackRelease('16n');
        that.envTwo.triggerAttackRelease('16n');
      },
      ['A2', 'C2', '', 'C2', 'A2', '', 'A2', '', 'A2', 'C2', '', 'C2', 'A2', 'C2', '', 'C2'],
      '16n'
    )
  };
};
