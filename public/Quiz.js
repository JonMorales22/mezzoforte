var numTotalQuestions = 0, numCorrectAnswers = 0;
var questionsArray;
var question;
var isTestActive=false;

class quiz {
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

function getRandomQuestion(num) {
  return Math.floor(Math.random() * num);
}

function toggleIsTestActive() {
  if(!isTestActive)
    isTestActive=true;
  else
    isTestActive=false;
}

export var Quiz = new quiz();



