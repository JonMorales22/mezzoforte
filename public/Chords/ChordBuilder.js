export default class ChordBuilder {
  MajorChord(root) {
    return [root, root+4, root+7];
  }

  MinorChord(root) {
    return [root, root+3, root+7];
  }

  DiminishedChord(root) {
    return [root, root+3, root+6];
  }
}