//v8.11.2

import { Midis } from './Midis.js';
import { Audio } from './Audio.js';
import { Quiz } from './Quiz.js';
import { Notes } from './Notes.js';

// const Notes = require('./Notes.js');
//const MidiNotes = Notes.GetMidiNotesArray();

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
  console.log(inputs);
    //   Midis.setInput(inputs[0]);
    // .then((midiaccess) =>{
    //   Midis.setMidiAccess(midiaccess);
    //   var inputs = Midis.getInputs();
    //   Midis.setInput(inputs[0]);

    //   var test = await Midis.openInput();
    //   console.log(test);
      
      // Midis.on('noteOn', (midiNote) => {
      //   Audio.playSound(Notes.Midi[midiNote]) 
      //   Quiz.checkAnswer(Notes.Midi[midiNote]);
      // })
    // });  
})

function calcMajorChords(rootMidiNote) {
  var third = rootMidiNote+4;
  var fifth = rootMidiNote+7;
  var chord = [rootMidiNote, third, fifth];
  return chord;
}

        // console.clear();
        // var chord = calcMajorChords(midiNote);
        // chord.forEach(note => {
        //   console.log(note)
        //   Audio.playSoundFromMidiNote(note);
        // })