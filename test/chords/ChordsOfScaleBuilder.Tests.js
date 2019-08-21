import chordsOfScaleBuilder from '../../public/Chords/ChordsOfScaleBuilder.js'

describe('#Build', () => {

  it('Created a major scale with the correct chords', () => {
    //arrange
    // var majorScale = chordsOfScaleBuilder.Build(60,chordsOfScaleBuilder.ScaleTypes.Major)
    // var root = 60;
    
    //act
    var result = chordsOfScaleBuilder.Build(60,chordsOfScaleBuilder.ScaleTypes.Major)
      .map((x) => {
        return x - root;
      })

    //assert
    expect(result).to.deep.equal(majorIntervals);
  })

})