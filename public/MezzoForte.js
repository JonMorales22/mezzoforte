//v8.11.2
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
  quiz.setQuestionsArray(chordsOfScaleBuilder.Build(60, chordsOfScaleBuilder.Types.Major));
  
  var test = await Midis.setMidiAccess(navigator);
  var inputs = await Midis.getInputs();

  console.log(inputs);

  inputs.forEach((input,index) => {

    inputs_holder.innerHTML += `<input type="radio" name="input" value=${index}>${input.name}<br>`;
  })
})

//=======================================================//


quiz_button.onclick = function() {
  quizState.currentQuestion = quiz.createQuestion();
  Audio.playChord(quizState.currentQuestion);
  quizState.numTotalQuestions++;
  console.log(quiz.getQuestionsArray());
};

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

Midis.on('chordOn', (chord) => {
  if(!quizState.currentQuestion)
    return;

  if(quiz.compare(quizState.currentQuestion, chord)) {
    console.log("correct!");
    quizState.numCorrect++;
  } else {
    console.log("wrong...");
  }

  console.log(chordClassifier.classify(chord));
  console.log(chordClassifier.classify(quizState.currentQuestion));
  console.log(quizState.numTotalQuestions);
  console.log(quizState.numCorrect);
}) 


