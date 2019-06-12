import { Notes } from './Notes.js';

export default class ChordClassifier {
  classify(chord) {
    var root = Notes.MidiToNoteName[chord[0]];
    var quality = this.findQuality(chord);

    return root + ' ' + quality;
  }

  findQuality(chord) {
    console.log(chord);
    
    var thirdInterval = chord[1] - chord[0];
    var fifthInterval = chord[2] - chord[1];

    if(thirdInterval==4 && fifthInterval==3)
      return this.stringOfEnum(Notes.ChordTypes, Notes.ChordTypes.Major);
    else if(thirdInterval==3 && fifthInterval==4)
      return this.stringOfEnum(Notes.ChordTypes, Notes.ChordTypes.Minor);
    else if(thirdInterval==3 && fifthInterval==3)
      return this.stringOfEnum(Notes.ChordTypes, Notes.ChordTypes.Diminished);
  }

  stringOfEnum(e,value) {
    for (var k in e) if (e[k] == value) return k;
    return null;
  }
}