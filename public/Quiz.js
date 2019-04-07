const Notes = require("./Notes.js");

var numTotalQuestions = 0, numCorrectAnswers = 0;
var NoteFrequenciesArray = Notes.GetNoteFrequenciesArray();
var question;
var isTestActive=false;

module.exports = {
  getNumberCorrectAnswers: function() { return numCorrectAnswers },
  getTotalNumberQuestions: function() { return numTotalQuestions },
  getCurrentQuestion: function() { return question },
  makeQuestion: makeQuestion,
  checkAnswer: function(answer) {
    if(!isTestActive)
      return;

    if(question == answer){
      console.log('correct!');
      numCorrectAnswers++;
    }
    else {
      console.log('wrong!')
    }
    toggleIsTestActive();
    console.log(`Number of questions: ${numTotalQuestions}`)
    console.log(`Number of correct answers: ${numCorrectAnswers}`)
  }
}

function getRandomNote(num) {
  return Math.floor(Math.random() * num);
}

function makeQuestion() {
    toggleIsTestActive();
    question = NoteFrequenciesArray[getRandomNote(NoteFrequenciesArray.length)];
    // console.log(question);
    numTotalQuestions++;
}

function toggleIsTestActive() {
  if(!isTestActive)
    isTestActive=true;
  else
    isTestActive=false;
}