const Notes = require('./Notes.js');
var AudioContext;

class AudioAPI {
    setAudioContext(audioContext) {
     console.log(audioContext);
     AudioContext = audioContext
   }
    playSound(noteFrequency) {
    var note = Notes.FrequencyToNotes()[noteFrequency];
    var wave = createWave("sine", noteFrequency)
    wave.start();
    wave.stop(AudioContext.currentTime + .25);
  }
}

function createWave(type, value) {
  var oscillator = AudioContext.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(value, AudioContext.currentTime);
  oscillator.connect(AudioContext.destination);
  return oscillator;
}

export var Audio = new AudioAPI();