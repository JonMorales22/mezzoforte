//v8.11.2
import { Midis } from './Midi/Midis.js';
import { Audio } from './Midi/Audio.js';
import { Notes } from './Chords/Notes.js';
import { midiEventManager }  from './Midi/Midi-Event-Manager';

import ChordFactory from './Chords/ChordFactory.js';
import QuizEventManager from './Quiz/QuizEventManager.js';

var chordFactory = new ChordFactory();
//var quizEventManager = new QuizEventManager();

import EndlessQuiz from './Quiz/EndlessQuiz.js';

var quiz = new EndlessQuiz();

var quiz_button = document.querySelector(".start_quiz");
var play_note = document.querySelector(".play_note");


Audio.setAudioContext(new window.AudioContext);
// console.log(Notes.GetMidiNotesArray());

window.addEventListener('load', async function() {
  quiz.setQuestionsArray(chordFactory.Create(chordFactory.Types.MajorChords));
  var test = await Midis.setMidiAccess(navigator);
})


//=======================================================//
var numTotalQuestions = 0, numCorrectAnswers = 0;
var currentQuestion;
//var stuff = 0;

quiz_button.onclick = function() {
  currentQuestion = quiz.createQuestion();
  Audio.playChord(currentQuestion);
  numTotalQuestions++;
  //console.log(Notes.GetMidiNotesArray());
};

play_note.onclick = function() {
  if(currentQuestion)
    Audio.playChord(currentQuestion);
}

Midis.on('chordOn', (chord) => {
  if(quiz.compare(currentQuestion, chord)){
    console.log("correct!");
    numCorrectAnswers++;
  } else {
    console.log("wrong...");
  }

  console.log(numTotalQuestions);
  console.log(numCorrectAnswers);
}) 
