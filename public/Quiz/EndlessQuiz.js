// import QuizEventManager from './QuizEventManager.js';
import Quiz from './Quiz.js';
var questionsArray = [];

export default class EndlessQuiz extends Quiz {
  setQuestionsArray(qA) { questionsArray = qA }
  
  createQuestion() {
    return questionsArray[getRandomQuestion(questionsArray.length)];
  }

  compare(arr, answer) {
    if(arr.length != answer.length)
      return false;

    var isEqual = true;
    
    arr.forEach(e => {
      if(!answer.includes(e)) {
        console.log(e);
        isEqual = false;
      }
    });
    return isEqual;
  }
}

function getRandomQuestion(num) {
  return Math.floor(Math.random() * num);
}

