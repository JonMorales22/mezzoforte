//v8.11.2
import { Midis } from './Midi/Midis.js';
import { Audio } from './Midi/Audio.js';
import { Notes } from './Chords/Notes.js';
import { midiEventManager }  from './Midi/Midi-Event-Manager';

import ChordsOfScaleBuilder from './Chords/ChordsOfScaleBuilder.js';
import EndlessQuiz from './Quiz/EndlessQuiz.js';

var chordsOfScaleBuilder = new ChordsOfScaleBuilder();
var quiz = new EndlessQuiz();

var quiz_button = document.querySelector(".start_quiz");
var play_note = document.querySelector(".play_note");


Audio.setAudioContext(new window.AudioContext);


window.addEventListener('load', async function() {
  quiz.setQuestionsArray(chordsOfScaleBuilder.Build(60, chordsOfScaleBuilder.Types.Minor));
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
