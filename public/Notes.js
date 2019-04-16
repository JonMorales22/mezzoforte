class NotesUtility {
  
  Midi = {
    60: 261.63,
    62: 293.66,
    64: 329.63,
    65: 349.23,
    67: 392.00,
    69: 440.00,
    71: 493.88,
    72: 523.25
  }
  NotesDict = {
    "c4": 261.63, 
    "d4": 293.66, 
    "e4": 329.63, 
    "f4": 349.23, 
    "g4": 392.00, 
    "a4": 440.00, 
    "b4": 493.88, 
    "c5": 523.25
  }
  Frequencies = {
    261.63: "c4", 
    293.66: "d4", 
    329.63: "e4", 
    349.23: "f4", 
    392.00: "g4", 
    440.00: "a4", 
    493.88: "b4", 
    523.25: "c5" 
  }

  GetNoteFrequenciesArray() {
    var NoteFrequenicesArray = []
    for(var key in this.NotesDict) 
      NoteFrequenicesArray.push( this.NotesDict[key] );
    
    return NoteFrequenicesArray;
  }

  GetMidiNotesArray() {
    var MidiNotesArray = []
    
    for(var key in Midi) 
      MidiNotesArray.push(Midi[key]);
    
    return MidiNotesArray;
  }

  calcMajorChords(rootMidiNote) {
    var third = rootMidiNote+4;
    var fifth = rootMidiNote+7;
    var chord = [rootMidiNote, third, fifth];
    return chord;
  }

  FrequencyFromNoteNumber( note ) { return round(440 * Math.pow(2,(note-69)/12), 2); }
}

function Round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }

export var Notes = new NotesUtility();