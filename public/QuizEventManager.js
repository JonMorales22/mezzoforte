import Quiz from './Quiz.js'

const EventEmitter = require('events');

class QuizEventManager extends EventEmitter {
  
  asdf(eventName) {
    this.emit(eventName);
  }

}
