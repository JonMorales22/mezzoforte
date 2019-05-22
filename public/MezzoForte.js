//v8.11.2
import { Midis } from './Midi/Midis.js';
import { Audio } from './Midi/Audio.js';

import { midiEventManager }  from './Midi/Midi-Event-Manager';

import ChordFactory from './Chords/ChordFactory.js';
import QuizEventManager from './Quiz/QuizEventManager.js';

var chordFactory = new ChordFactory();
//var quizEventManager = new QuizEventManager();

import EndlessQuiz from './Quiz/EndlessQuiz.js';
var quiz = new EndlessQuiz();

var quiz_button = document.querySelector(".start_quiz");

Audio.setAudioContext(new window.AudioContext);

quiz_button.onclick = function() {
  //quiz.asdf('button');
  quiz.makeQuestion();
  Audio.playChord(quiz.getCurrentQuestion());
};

window.addEventListener('load', async function() {
  quiz.setQuestionsArray(chordFactory.Create(chordFactory.Types.MajorChords));
  var test = await Midis.setMidiAccess(navigator);
})


Midis.on('chordOn', (chord) => {
  quiz.checkAnswer(chord);
  console.log(chord);
}) 
