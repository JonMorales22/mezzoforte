var Midis = require('./Midis.js');
var Audio = require('./Audio.js');
var Notes = require('./Notes.js');
var Quiz = require('./Quiz');

window.addEventListener('load', function() {
  navigator.requestMIDIAccess()
    .then((midiaccess) =>{
      Midis.setMidiAccess(midiaccess);
      var inputs = Midis.getInputs();
      Midis.setNoteOnandOff(Audio.playSound, function(data) {
        console.log(data);
      })
      Midis.setInput(inputs[0]);
    });  
})

var quiz_button = document.querySelector(".start_quiz");

quiz_button.onclick = getRandomNote;

function getRandomNote() {
  var NotesArray = Notes.GetNotesArray()
  var index = Math.floor(Math.random() * NotesArray.length);
  console.log(NotesArray[index]);
  Audio.playSound(NotesArray[index])
}

console.log(Midis.setMidiAccess());
