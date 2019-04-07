const EventEmitter = require('events');

var midiStuff;

class Midi extends EventEmitter {
  setMidiAccess(midis) {
    midiStuff = midis;
  }

  setInput(input) {
    input.onmidimessage = MIDIMessageEventHandler;
  }

  getInputs() {

    var inputsArray = [];
    var inputValues = midiStuff.inputs;
    
    midiStuff.inputs.forEach(function(port, key) {
      inputsArray.push(port);
    })
    return inputsArray;
  }
}


function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function frequencyFromNoteNumber( note ) {
  var freq = 440 * Math.pow(2,(note-69)/12);
  return round(freq, 2);
}

function MIDIMessageEventHandler(event) {
    // Mask off the lower nibble (MIDI channel, which we don't care about)
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
          var noteFreq = frequencyFromNoteNumber(event.data[1])
          Midis.emit("noteOn", noteFreq);
          return;
        }
        // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80:
         Midis.emit("noteOff");
        return;
    }
  }

export var Midis = new Midi();
