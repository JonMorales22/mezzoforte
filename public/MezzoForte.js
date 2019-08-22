//v8.11.2
import './styles.css'; 

import { Midis } from './Midi/Midis.js';
import { Audio } from './Midi/Audio.js';
import { midiEventManager }  from './Midi/Midi-Event-Manager';

import { Notes } from './Chords/Notes.js';
import ChordsOfScaleBuilder from './Chords/ChordsOfScaleBuilder.js';
import ChordClassifier from './Chords/ChordClassifier.js';

import { quizState } from './QuizState.js';
import EndlessQuiz from './Quiz/EndlessQuiz.js';

var chordsOfScaleBuilder = new ChordsOfScaleBuilder();
var chordClassifier = new ChordClassifier();

var quiz = new EndlessQuiz();

var quiz_button = document.querySelector(".start_quiz");
var play_note = document.querySelector(".play_note");
var inputs_holder = document.querySelector(".inputs_holder");
var inputs_button = document.querySelector(".inputs_button");

Audio.setAudioContext(new window.AudioContext);

var result;

window.addEventListener('load', async function() {
  quiz.setQuestionsArray(chordsOfScaleBuilder.Build(60, chordsOfScaleBuilder.ScaleTypes.Major));
  
  var test = await Midis.setMidiAccess(navigator);
  var inputs = await Midis.getInputs();

  inputs.forEach((input,index) => {

    inputs_holder.innerHTML += `<input type="radio" name="input" value=${index}>${input.name}<br>`;
  })
})

//=======================================================//


quiz_button.onclick = function() {
  quizState.currentQuestion = quiz.createQuestion();
  Audio.playChord(quizState.currentQuestion);
  quizState.numTotalQuestions++;
  quizState.isActive=true;
}

inputs_button.onclick = async function() {
  var inputs = document.getElementsByName('input');
  inputs.forEach(async (e) => {
    if(e.checked) {
      console.log(e.value);
      var res = await Midis.setInput(e.value)
      console.log(res);
    }
  })
}

play_note.onclick = function() {
  if(quizState.currentQuestion)
    Audio.playChord(quizState.currentQuestion);
}


var correctChord = document.querySelector('.correct_chord');
var chordReceived = document.querySelector('.chord_received');
var total_num_questions = document.querySelector('.total_num_questions');
var num_correct = document.querySelector('.num_correct');

Midis.on('chordOn', (chord) => {
  if(!quizState.currentQuestion || !quizState.isActive)
    return;

  if(quiz.compare(quizState.currentQuestion, chord)) {
    console.log("correct!");
    quizState.isActive=false;
    quizState.numCorrect++;
  } else {
    console.log("wrong...");
  }


  correctChord.innerHTML = chordClassifier.classify(chord);
  chordReceived.innerHTML = chordClassifier.classify(quizState.currentQuestion);
  total_num_questions.innerHTML = quizState.numTotalQuestions;
  num_correct.innerHTML = quizState.numCorrect

  console.log(chordClassifier.classify(chord));
  console.log(chordClassifier.classify(quizState.currentQuestion));
  console.log(quizState.numTotalQuestions);
  console.log(quizState.numCorrect);
}) 


