//v8.11.2

import { Midis } from './Midis.js';
import { Audio } from './Audio.js';
import { Quiz } from './Quiz.js';
import { Notes } from './Notes.js';

var quiz_button = document.querySelector(".start_quiz");
var audioContext = new window.AudioContext;

Audio.setAudioContext(audioContext);
Quiz.setQuesionsArray(Notes.GetNoteFrequenciesArray());

quiz_button.onclick = function() {
  Quiz.makeQuestion();
  //console.log(Notes.FrequencyToNotes()[Quiz.getCurrentQuestion()]);
  Audio.playSound(Quiz.getCurrentQuestion());
};

window.addEventListener('load', async function() {
  var midiaccess = await navigator.requestMIDIAccess();
  
  Midis.setMidiAccess(midiaccess);
  var inputs = Midis.getInputs();
  Midis.setInput(inputs[0]);

  var test = await Midis.openInput();
    
  Midis.on('noteOn', (midiNote) => {
    Audio.playSound(Notes.Midi[midiNote]) 
    Quiz.checkAnswer(Notes.Midi[midiNote]);
  }) 
})
