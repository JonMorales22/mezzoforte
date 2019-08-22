export default class ScaleBuilder {
  ScaleTypes = {
    Major: 1,
    Minor: 2,
    // Test: 3
  } 
  
  GetScaleIntervals(scale) {
    switch(scale) {
      case this.ScaleTypes.Major:
        return majorIntervals;

      case this.ScaleTypes.Minor:
        return minorIntervals;
    
      // case this.ScaleTypes.Test:
      //   return testIntervals;
    }
  } 

  Build(root, scale) {
    var intervals = this.GetScaleIntervals(scale);
    var notes = []

    intervals.forEach( e=> {
     notes.push(root+e);
    })

    return notes;
  }
}

var majorIntervals = [0,2,4,5,7,9,11,12];
var minorIntervals = [0,2,3,5,7,8,10,12];
// var testIntervals = [0];