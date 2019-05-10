//v8.11.2

import { Midis } from './Midis.js';
import { Audio } from './Audio.js';
import { Quiz } from './Quiz.js';
import { midiEventManager }  from './Midi-Event-Manager';
import ChordFactory from './ChordFactory.js';

var chordFactory = new ChordFactory();

var quiz_button = document.querySelector(".start_quiz");
var audioContext = new window.AudioContext;


Audio.setAudioContext(audioContext);

quiz_button.onclick = function() {
  Quiz.makeQuestion();
  Audio.playChord(Quiz.getCurrentQuestion());
};

window.addEventListener('load', async function() {
  Quiz.setQuestionsArray(chordFactory.Create(chordFactory.Types.Notes));
  var test = await Midis.setMidiAccess(navigator);
})


Midis.on('chordOn', (chord) => {

  Quiz.checkAnswer(chord);

 console.log(chord);
}) 
