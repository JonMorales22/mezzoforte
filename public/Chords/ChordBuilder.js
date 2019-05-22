import {Notes} from './Notes.js';

export default class ChordBuilder {

  BuildMajorChord(rootMidiNote) {
    var third = rootMidiNote+4;
    var fifth = rootMidiNote+7;
    var noteName = Notes.Frequencies[Notes.Midi[rootMidiNote]];
    return [rootMidiNote, third, fifth];
  }

  BuildMinorChord() {

  }

  Build7thChords() {
    
  }



}

//export var Chords = new ChordBuilder();