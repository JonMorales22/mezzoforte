import { Notes } from '../Chords/Notes.js';

var AudioContext;

class AudioApi {
   setAudioContext(audioContext) {
     AudioContext = audioContext
   }

   playSound(midiNote) {
     // console.log(midiNote);
     var wave = createWave("sine", Notes.CalcFrequencyFromNoteNumber(midiNote))
     wave.start();
     wave.stop(AudioContext.currentTime + .25);
  }

  playChord(chords) {
    // console.log(chords);
    chords.forEach(note => {
      // console.log(note);
      this.playSound((note));  
    })
  }

  playSoundFromMidiNote(midiNote) {
    var freq = Notes.CalcFrequencyFromNoteNumber(midiNote);
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