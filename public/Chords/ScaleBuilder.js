export default class ScaleBuilder {
  Scales = {
    Major: 1,
    Minor: 2
  } 
  
  GetScaleIntervals(scale) {
    switch(scale) {
      case this.Scales.Major:
        return majorIntervals;

      case this.Scales.Minor:
        return minorIntervals;
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