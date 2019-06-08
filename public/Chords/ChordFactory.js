import { Test } from './Test.js';
import ArrayBuilder from './ArrayBuilder.js'

var arrayBuilder = new ArrayBuilder();


export default class ChordFactory {
  Types = {
    Notes : 1,
    MajorChords: 2,
    MinorChords: 3,
    Test: 9
  }

  Create(type) {
      switch(type) {
        case this.Types.Notes:
          return arrayBuilder.CreateNotesArray();

        case this.Types.MajorChords:
          return arrayBuilder.BuildMajorChordsArray();

        case this.Types.MinorChords:
          return arrayBuilder.BuildMinorChordsArray();

        case this.Types.Testing: //THIS IS FOR TESTING ONLY!
          return Test.chords;
      }
  }
}

