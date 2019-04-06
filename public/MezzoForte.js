const Midis = require('./Midis.js');
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
      Midis.setMidiAccess(midiaccess);
      var inputs = Midis.getInputs();
      Midis.setNoteOnandOff(noteOn, function() {} );
      Midis.setInput(inputs[0]);
    });  
})