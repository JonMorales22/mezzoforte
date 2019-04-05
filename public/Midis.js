var Audio = require('./Audio.js');

function MIDIMessageEventHandler(event) {
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        noteOn(event.data[1]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      noteOff(event.data[1]);
      return;
  }
}

function frequencyFromNoteNumber( note ) {
  return 440 * Math.pow(2,(note-69)/12);
}

function noteOn(noteNumber) {
  var noteFreq = frequencyFromNoteNumber(noteNumber)
  Audio.playSound({wave: "sine", freq: noteFreq, duration: .25});

  console.log(noteNumber);
  console.log(noteFreq);
}

function noteOff(data) {
  console.log(data);
}

// function initMidiAccess() {
//   const inputs = midiAccess.inputs.values();
  
//   var result = inputs.next();
//   //console.log(result);

//   result.value.onmidimessage = MIDIMessageEventHandler;
// }


var midiStuff;

module.exports = {
  setMidiAccess: function(midi) {
    midiStuff = midi;
    console.log(midiStuff);
  },
  getInputs: function() {
    var inputsArray = [];
    var inputValues = midiStuff.inputs;
    
    midiStuff.inputs.forEach(function(port, key) {
      inputsArray.push(port);
    })

    return inputsArray;
  },
  setMidiEvent: function(port) {
    port.onmidimessage = MIDIMessageEventHandler;
    console.log(port);
  }
}