import ScaleBuilder from '../../public/Chords/ScaleBuilder.js'

const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

var scaleBuilder = new ScaleBuilder();

var majorIntervals = [0,2,4,5,7,9,11,12];
var minorIntervals = [0,2,3,5,7,8,10,12];

describe('#Build', () => {

  it('Created a major scale', () => {
    //arrange
    var majorScale = scaleBuilder.Build(60,scaleBuilder.ScaleTypes.Major)
    var root = 60;
    
    //act
    var result = scaleBuilder.Build(60,scaleBuilder.ScaleTypes.Major)
      .map((x) => {
        return x - root;
      })

    //assert
    expect(result).to.deep.equal(majorIntervals);
  })

  it('Created a minor scale', () => {
    //arrange
    var root = 60;

    //act
    var result = scaleBuilder.Build(root,scaleBuilder.ScaleTypes.Minor)
      .map((x) => {
        return x - root;
      })

    //assert
    expect(result).to.deep.equal(minorIntervals);
  })

  it('Created a major scale at the highest MIDI note ', () => {
    //arrange
    var root = 127;

    //act
    var result = scaleBuilder.Build(root,scaleBuilder.ScaleTypes.Minor)
      .map((x) => {
        return x - root;
      })

    //assert
    expect(result).to.deep.equal(minorIntervals);
  })


})