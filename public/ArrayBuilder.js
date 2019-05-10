import { Notes } from './Notes.js';
import ChordBuilder from './ChordBuilder.js';

var chordBuilder = new ChordBuilder();

 export default class ArrayBuilder {

  CreateNotesArray() {
    var notesArray = Notes.GetMidiNotesArray();
    var ass = [];  
    notesArray.forEach(e => {
      ass.push([e]);
    })
    return ass;
  }

  BuildMajorChordsArray() {
    var majorChordsArray = [];

    Notes.GetMidiNotesArray().forEach(root => {
      var temp = this.BuildMajorChord(root)
      majorChordsArray.push(temp);
    });

    return majorChordsArray;
  }
 }
  