// const Notes = require('./Notes.js');
import { Notes } from './Notes.js';

var AudioContext;

class AudioApi {
    setAudioContext(audioContext) {
     AudioContext = audioContext
   }
    playSound(noteFrequency) {
    // var note = Notes.FrequencyToNotes()[noteFrequency];
    var wave = createWave("sine", noteFrequency)
    wave.start();
    wave.stop(AudioContext.currentTime + .25);
  }

  playSoundFromMidiNote(midiNote) {
    var note = frequencyFromNoteNumber(midiNote);
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

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function frequencyFromNoteNumber(midiNote) {
  var freq = 440 * Math.pow(2,(midiNote-69)/12);
  return round(freq, 2);
}

export var Audio = new AudioApi();