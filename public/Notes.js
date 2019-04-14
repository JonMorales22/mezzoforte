const Frequencies = {
  261.63: "c4", 
  293.66: "d4", 
  329.63: "e4", 
  349.23: "f4", 
  392.00: "g4", 
  440.00: "a4", 
  493.88: "b4", 
  523.25: "c5" 
}

const Notes = {
  "c4": 261.63, 
  "d4": 293.66, 
  "e4": 329.63, 
  "f4": 349.23, 
  "g4": 392.00, 
  "a4": 440.00, 
  "b4": 493.88, 
  "c5": 523.25
}

const Midi = {
  60: 261.63,
  62: 293.66,
  64: 329.63,
  65: 349.23,
  67: 392.00,
  69: 440.00,
  71: 493.88,
  72: 523.25
}

module.exports = {
  FrequencyToNotes: function() { return Frequencies },
  NotesToFrequency: function() { return Notes },
  MidiToFrequency : function() { return Midi },
  GetNoteFrequenciesArray: function() {
    var NoteFrequenicesArray = []
    for(var key in Notes) {
      NoteFrequenicesArray.push( Notes[key] );
    }
    return NoteFrequenicesArray;
  },
  GetMidiNotesArray: function() {
    var MidiNotesArray = []
    
    for(var key in Midi) 
      MidiNotesArray.push(Midi[key]);
    
    return MidiNotesArray;
  }
}