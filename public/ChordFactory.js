import { Test } from './Test.js';
import { Notes } from './Notes.js';


function CreateNotesArray() {
  var notesArray = Notes.GetMidiNotesArray();
  var ass = [];  
  notesArray.forEach(e => {
    ass.push([e]);
  })
  return ass;
}

export default class ChordFactory {
  Types = {
    Notes : 1,
    MajorChords: 2,
    Test: 3
  }

  Create(type) {
      switch(type) {
        case this.Types.Notes:
          return CreateNotesArray();

        case this.Types.MajorChords:
          return (Chords.BuildMajorChordsArray());

        case this.Types.Testing: //THIS IS FOR TESTING ONLY!
          return Test.chords;
      }
  }
}

