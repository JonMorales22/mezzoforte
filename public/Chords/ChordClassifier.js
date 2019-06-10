import { Notes } from './Notes.js';

export default class ChordClassifier {
  classify(chord) {
    var root = Notes.MidiToNoteName[chord[0]];
    var quality = this.findQuality(chord);

    return root + ' ' + quality;
  }

  findQuality(chord) {
    console.log(chord);
    var quality;
    
    var res1 = chord[1] - chord[0];
    var res2 = chord[2] - chord[1];

    if((res1==4&&res2==3))
      quality = 'Major';
    else if((res1==3&&res2==4))
      quality = 'Minor';
    else
      quality = 'idk';

    return quality;
  }
}