import {Notes} from './Notes.js';

export default class ChordBuilder {

  BuildMajorChord(rootMidiNote) {
    var third = rootMidiNote+4;
    var fifth = rootMidiNote+7;
    //var noteName = Notes.FrequencyToNoteName[Notes.Midi[rootMidiNote]];
    return [rootMidiNote, third, fifth];
  }

  BuildMinorChord(rootMidiNote) {
    return [rootMidiNote, rootMidiNote+3, rootMidiNote+7];
  }

  BuildDiminishedChord(rootMidiNote) {
    var chord = [rootMidiNote, rootMidiNote+3, rootMidiNote+6]
    chord.forEach(e => {
      console.log(Notes.MidiToNoteName[e]);
    })
    return chord;
  }
}

//export var Chords = new ChordBuilder();