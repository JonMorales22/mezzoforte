//v8.11.2
import { Midis } from './Midi/Midis.js';
import { Audio } from './Midi/Audio.js';
import { Notes } from './Chords/Notes.js';
import { midiEventManager }  from './Midi/Midi-Event-Manager';
import { quizState } from './QuizState.js';

import ChordsOfScaleBuilder from './Chords/ChordsOfScaleBuilder.js';
import EndlessQuiz from './Quiz/EndlessQuiz.js';

var chordsOfScaleBuilder = new ChordsOfScaleBuilder();
var quiz = new EndlessQuiz();

var quiz_button = document.querySelector(".start_quiz");
var play_note = document.querySelector(".play_note");
var inputs_holder = document.querySelector(".inputs_holder");
var inputs_button = document.querySelector(".inputs_button");

Audio.setAudioContext(new window.AudioContext);

var result;

window.addEventListener('load', async function() {
  quiz.setQuestionsArray(chordsOfScaleBuilder.Build(60, chordsOfScaleBuilder.Types.Minor));
  
  var test = await Midis.setMidiAccess(navigator);
  var inputs = await Midis.getInputs();

  console.log(inputs);

  inputs.forEach((input,index) => {

    inputs_holder.innerHTML += `<input type="radio" name="input" value=${index}>${input.name}<br>`;
  })
})

function blah() {
  console.log('test');
  // console.log(input);
  // result = input;
}
//=======================================================//


quiz_button.onclick = function() {
  quizState.currentQuestion = quiz.createQuestion();
  Audio.playChord(quizState.currentQuestion);
  quiz.numTotalQuestions++;
};

inputs_button.onclick = function() {
  var inputs = document.getElementsByName('input');
  inputs.forEach(e=> {
    if(e.checked)
      console.log(e.value);
  })
  //inputs.setInput(result)
}

play_note.onclick = function() {
  if(currentQuestion)
    Audio.playChord(quizState.currentQuestion);
}

Midis.on('chordOn', (chord) => {
  if(quiz.compare(quizState.currentQuestion, chord)){
    console.log("correct!");
    quizState.numCorrectAnswers++;
  } else {
    console.log("wrong...");
  }

  console.log(quizState.numTotalQuestions);
  console.log(quizState.numCorrectAnswers);
}) 
