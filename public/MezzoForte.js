import { midi as Midis } from './Midis.js';

const Audio = require('./Audio.js');
// const Notes = require('./Notes.js');
const Quiz = require('./Quiz.js');

var quiz_button = document.querySelector(".start_quiz");

quiz_button.onclick = function() {
  Quiz.makeQuestion();
  //console.log(Notes.FrequencyToNotes()[Quiz.getCurrentQuestion()]);
  Audio.playSound(Quiz.getCurrentQuestion());
};

function noteOn(noteFrequency) {
  Audio.playSound(noteFrequency);
  Quiz.checkAnswer(noteFrequency);
}

window.addEventListener('load', function() {
  navigator.requestMIDIAccess()
    .then((midiaccess) =>{
      //console.log(midiaccess);
      //var Midis = new midis();
      //console.log(Midis);
      Midis.setMidiAccess(midiaccess);
      var inputs = Midis.getInputs();
      //console.log(inputs);
      //Midis.setNoteOnandOff(noteOn, function() {} );
      Midis.setInput(inputs[0], Midis);
      //Midis.checkThis();
      Midis.on('noteOn', (noteFrequency) => { console.log(noteFrequency) })
    });  
})