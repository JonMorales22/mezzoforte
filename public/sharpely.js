var Midis = require('./Midis.js');
var Audio = require('./Audio.js');
var Notes = require('./Notes.js');
// var Quiz = require('./Quiz');

var quiz_button = document.querySelector(".start_quiz");

var test = makeTest(10);
var question;

quiz_button.onclick = function() {
  if(test.length > 0){
    question = test.shift();
    console.log(Notes.FrequencyToNotes()[question]);
    Audio.playSound(question);
  }
  else
    console.log("test end");
};

function makeTest(numQuestions) {
  var test = [];
  for(let i=0; i< numQuestions; i++)
    test.push(getRandomNote()); 

  return test;
}

function getRandomNote() {
  var NotesArray = Notes.GetNotesArray()
  var index = Math.floor(Math.random() * NotesArray.length);
  return NotesArray[index];
}

function noteOn(noteFrequency) {
  
  Audio.playSound(noteFrequency);

  if(noteFrequency == question)
    console.log("Correct!")
  else
    console.log("Wrong!")
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