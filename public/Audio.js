const audioCtx = new window.AudioContext;
const Notes = require('./Notes.js');

function createWave(type, value) {
  var oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(value, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  return oscillator;
}

module.exports = {
  playSound: function(noteFrequency) {
    console.log(noteFrequency);
    var note = Notes.FrequencyToNotes()[noteFrequency];
    console.log(note);
    var wave = createWave("sine", noteFrequency)
    wave.start();
    wave.stop(audioCtx.currentTime + .25);
  }
} 
