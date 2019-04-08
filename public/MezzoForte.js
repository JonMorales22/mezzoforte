import { Midis } from './Midis.js';
import { Audio } from './Audio.js';
import { Quiz } from './Quiz.js';

var quiz_button = document.querySelector(".start_quiz");
var audioContext = new window.AudioContext;

Audio.setAudioContext(audioContext);

quiz_button.onclick = function() {
  Quiz.makeQuestion();
  //console.log(Notes.FrequencyToNotes()[Quiz.getCurrentQuestion()]);
  Audio.playSound(Quiz.getCurrentQuestion());
};

window.addEventListener('load', function() {
  navigator.requestMIDIAccess()
    .then((midiaccess) =>{
      Midis.setMidiAccess(midiaccess);
      var inputs = Midis.getInputs();
      Midis.setInput(inputs[0], Midis);

      Midis.on('noteOn', (noteFrequency) => { 
        Audio.playSound(noteFrequency) 
        Quiz.checkAnswer(noteFrequency);
      })
    });  
})