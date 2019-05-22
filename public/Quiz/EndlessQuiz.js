// import QuizEventManager from './QuizEventManager.js';
 import Quiz from './Quiz.js';

var numTotalQuestions = 0, numCorrectAnswers = 0;
var questionsArray = [];
var question;
var isTestActive=false;

function onEvent() {
  
}

export default class EndlessQuiz extends Quiz {
  getNumberCorrectAnswers() { return numCorrectAnswers }
  getTotalNumberQuestions() { return numTotalQuestions }
  getCurrentQuestion() { return question }
  setQuestionsArray(qA) { questionsArray = qA }
  
  makeQuestion() {
    toggleIsTestActive();
    question = questionsArray[getRandomQuestion(questionsArray.length)];
    numTotalQuestions++;
  }

  checkAnswer(answer) {
    
    if(!isTestActive || question.length<1  )
      return; 

    var index = question.indexOf(answer);

    if(index==-1){
      console.log("wrong!!");
      toggleIsTestActive();
    }
    else {
      compare(question, index);
      
      if(question.length<1) {
        console.log("correct!");
        numCorrectAnswers++;
        toggleIsTestActive();
      }
    }

    console.log(`Number of questions: ${numTotalQuestions}`)
    console.log(`Number of correct answers: ${numCorrectAnswers}`)

  }
}

function compare(arr1, index) {
  if(index == 0)
    question.shift();
  else if(index==question.length-1)
    question.pop();
  else {
    var back = arr1.slice(index+1);
    var front = arr1.slice(0,index);
    question = front.concat(back);
  }
}

function getRandomQuestion(num) {
  return Math.floor(Math.random() * num);
}

function toggleIsTestActive() {
  if(!isTestActive)
    isTestActive=true;
  else
    isTestActive=false;
}

// export var Quiz = new quiz();



