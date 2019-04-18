var numTotalQuestions = 0, numCorrectAnswers = 0;
var questionsArray = [];
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
    console.log(answer);
    console.log(question);
    if(!isTestActive)
      return;
    
    if(checkArrayEquality(question, answer)) {
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

function checkArrayEquality(arr1, arr2) {
  var flag;
  if(arr1.length != arr2.length)
    return false;

  for(let i=0;i<arr1.length;i++) {
    if(arr1[i] != arr2[i])
      return false;
  }

  console.log("do we reach this code path?");
  return true;
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



