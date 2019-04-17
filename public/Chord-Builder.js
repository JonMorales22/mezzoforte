import {Notes} from './Notes.js';

class ChordBuilder {

  BuildMajorChord(rootMidiNote) {
    var third = rootMidiNote+4;
    var fifth = rootMidiNote+7;
    var noteName = Notes.Frequencies[Notes.Midi[rootMidiNote]];
    //var chord = {[noteName]: [rootMidiNote, third, fifth]};
    return [rootMidiNote, third, fifth];
  }

  BuildMinorChord() {

  }

}

export var Chords = new ChordBuilder();