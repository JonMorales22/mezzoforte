import { Notes } from './Notes.js';

var AudioContext;

class AudioApi {
    setAudioContext(audioContext) {
     AudioContext = audioContext
   }
    playSound(noteFrequency) {
    var wave = createWave("sine", noteFrequency)
    wave.start();
    wave.stop(AudioContext.currentTime + .25);
  }

  playSoundFromMidiNote(midiNote) {
    var freq = Notes.FrequencyFromNoteNumber(midiNote);
    this.playSound(note);
  }
}

function createWave(type, value) {
  var oscillator = AudioContext.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(value, AudioContext.currentTime);
  oscillator.connect(AudioContext.destination);
  return oscillator;
}

export var Audio = new AudioApi();