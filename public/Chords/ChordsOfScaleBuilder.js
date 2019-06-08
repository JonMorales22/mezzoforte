// import { Notes } from './Notes.js';
import ChordBuilder from './ChordBuilder.js';
import ScaleBuilder from './ScaleBuilder.js';

var chordBuilder = new ChordBuilder();
var scaleBuilder = new ScaleBuilder();

export default class ChordsOfScaleBuilder {
  Types = {
    Major: 1,
    Minor: 2,
    Diminished: 3
  }

  GetPattern(scale) {
    switch(scale) {
      case this.Types.Major:
        return majorPattern;

      case this.Types.Minor:
        return minorPattern;   
    }
  }

  Build(root, scale) {
    var chords = []; 
    var pattern = this.GetPattern(scale);
    scaleBuilder.Build(root, scale).forEach((e, index) => {
      chords.push(pattern[index](e))
    })
    return chords;
  }
}

var majorPattern =  [chordBuilder.MajorChord, chordBuilder.MinorChord, chordBuilder.MinorChord, chordBuilder.MajorChord, chordBuilder.MajorChord, chordBuilder.MinorChord, chordBuilder.DiminishedChord, chordBuilder.MajorChord];
var minorPattern =  [chordBuilder.MinorChord, chordBuilder.DiminishedChord, chordBuilder.MajorChord, chordBuilder.MinorChord, chordBuilder.MinorChord, chordBuilder.MajorChord, chordBuilder.MajorChord, chordBuilder.MinorChord];