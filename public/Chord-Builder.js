import {Notes} from './Notes.js';

class ChordBuilder {

  BuildMajorChord(rootMidiNote) {
    var third = rootMidiNote+4;
    var fifth = rootMidiNote+7;
    var noteName = Notes.Frequencies[Notes.Midi[rootMidiNote]];
    return [rootMidiNote, third, fifth];
  }

  BuildMinorChord() {

  }

  BuildMajorChordsArray() {
    var majorChords = [];
  
    Notes.GetMidiNotesArray().forEach(root => {
      var temp = this.BuildMajorChord(root)
      majorChords.push(temp);
    });
  
    return majorChords;
  }

}

export var Chords = new ChordBuilder();