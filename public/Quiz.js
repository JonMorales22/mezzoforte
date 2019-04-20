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
  //   console.log("Answer: " + answer);
  //   console.log("Question: " + question);

  //   if(!isTestActive)
  //     return;
    
  //   if(check(question, answer)) {
  //     console.log('correct!');
  //   }
  //   else {
  //     console.log('wrong!')
  //   }

  //   console.log(`Number of questions: ${numTotalQuestions}`)
  //   console.log(`Number of correct answers: ${numCorrectAnswers}`)
  // }
    
    if(!isTestActive || question.length<1  )
      return; 


    if(!check(question, answer)) {
      console.log("wrong!!");
      toggleIsTestActive();
    }
    else {
      console.log("correct!");
    }

    console.log(`Number of questions: ${numTotalQuestions}`)
    console.log(`Number of correct answers: ${numCorrectAnswers}`)

  }

}

function check(arr1, answer) {
  
  var index = arr1.indexOf(answer)
  
  if(index == -1)
    return false;

  if(index == 0)
    question.shift();
  else if(index==question.length-1)
    question.pop();
  else {

    var back = arr1.slice(index+1);
    var front = arr1.slice(0,index);
    question = front.concat(back);
    
  }
  console.log("question after: " + question);
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



