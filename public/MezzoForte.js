//v8.11.2

import { Midis } from './Midis.js';
import { Audio } from './Audio.js';
import { Quiz } from './Quiz.js';
import { Notes } from './Notes.js';
import {Chords} from './Chord-Builder.js'

var quiz_button = document.querySelector(".start_quiz");
var audioContext = new window.AudioContext;


Audio.setAudioContext(audioContext);

function buildQuestionsArray(type) {
  
  switch(type) {
    case 1:
      
      var notesArr = Notes.GetMidiNotesArray();
      var test = [];  
      
      notesArr.forEach(e => {
        test.push([e]);
      })

      Quiz.setQuestionsArray(test);
      return;

    case 2:
      Quiz.setQuestionsArray(Chords.BuildMajorChordsArray());
      return;
  }
}

function ass(midiAccess) {
  console.log(midiAccess);
  Midis.setMidiAccess(midiAccess);
  var inputs = Midis.getInputs();
  Midis.setInput(inputs[0]);
}

quiz_button.onclick = function() {
  Quiz.makeQuestion();
  Audio.playChord(Quiz.getCurrentQuestion());
};

window.addEventListener('load', async function() {
  buildQuestionsArray(2);
 
  var midiaccess = await navigator.requestMIDIAccess();
  ass(midiaccess);

  var test = await Midis.openInput();
})

Midis.on('noteOn', (midiNote) => {
  Audio.playSound(midiNote) 
  Quiz.checkAnswer(midiNote);
}) 
