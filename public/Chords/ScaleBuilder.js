import { Notes } from './Notes.js';

export default class ScaleBuilder {
  
  majorIntervals = [0,2,4,5,8,10,11,12];
  
  MajorScale(root) {
    var scale = []
    majorIntervals.forEach( e=> {
      scale.push(root+e);
    })
  }


}