//var Audio = require('./Audio.js');
var midiStuff, NoteOn, NoteOff;

function MIDIMessageEventHandler(event) {
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        var noteFreq = frequencyFromNoteNumber(event.data[1])
        NoteOn(noteFreq);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      NoteOff(event.data[1]);
      return;
  }
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function frequencyFromNoteNumber( note ) {
  var freq = 440 * Math.pow(2,(note-69)/12);
  return round(freq, 2);
}

module.exports = {
  setMidiAccess: function(midi) {
    midiStuff = midi;
    //console.log(midiStuff);
  },

  getInputs: function() {
    var inputsArray = [];
    var inputValues = midiStuff.inputs;
    
    midiStuff.inputs.forEach(function(port, key) {
      inputsArray.push(port);
    })
    return inputsArray;
  },

  setInput: function(input) {
    input.onmidimessage = MIDIMessageEventHandler;
    //console.log(input);
  },

  setNoteOnandOff: function(noteOn, noteOff) {
    NoteOn = noteOn;
    NoteOff = noteOff;
  } 
}