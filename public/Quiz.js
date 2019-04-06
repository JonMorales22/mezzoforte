const Notes = require("./Notes.js");

var numTotalQuestions = 0, numCorrectAnswers = 0;
var NotesArray = Notes.GetNotesArray();
var question;

module.exports = {
  getNumberCorrectAnswers: function() { return numCorrectAnswers },
  getTotalNumberQuestions: function() { return numTotalQuestions },
  getCurrentQuestion: function() { return question },
  makeNewQuestion: makeQuestion,
  checkAnswer: function(answer) {
    if(question == answer){
      console.log('correct!');
      numCorrectAnswers++;
    }
    else {
      console.log('wrong!')
    }
    console.log(`Number of questions: ${numTotalQuestions}`)
    console.log(`Number of correct answers: ${numCorrectAnswers}`)
  }
}

function getRandomNote(num) {
  return Math.floor(Math.random() * num);
}

function makeQuestion() {
    question = NotesArray[getRandomNote(NotesArray.length)];
    // console.log(question);
    numTotalQuestions++;
}