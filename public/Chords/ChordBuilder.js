export default class ChordBuilder {
  MajorChord(root) {
    var third = root+4;
    var fifth = root+7;
    return [root, root+4, root+7];
  }

  MinorChord(root) {
    return [root, root+3, root+7];
  }

  DiminishedChord(root) {
    return [root, root+3, root+6];
  }
}