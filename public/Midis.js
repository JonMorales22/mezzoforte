const EventEmitter = require('events');

var midiStuff;

class Midi extends EventEmitter {
  Input;

  setMidiAccess(midis) {
    midiStuff = midis;
  }

  setInput(input) {
    input.onmidimessage = MIDIMessageEventHandler;
    this.Input = input;
  }

  getInputs() {

    var inputsArray = [];
    var inputValues = midiStuff.inputs;
    

    midiStuff.inputs.forEach(function(port, key) {
      inputsArray.push(port);
    })


    return inputsArray;
  }

  async openInput() {
    try {
      var result = await this.Input.open()
      return result;
    }
    catch(error) {
      console.err(error);
    }
  }
}

function MIDIMessageEventHandler(event) {
    // Mask off the lower nibble (MIDI channel, which we don't care about)
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
          //var noteFreq = frequencyFromNoteNumber(event.data[1])
          //console.log(event.data)
          Midis.emit("noteOn", event.data[1]);
          return;
        }
        // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80: {
        //console.log(event.data);
        Midis.emit("noteOff");
        return;
      }
    }
  }

export var Midis = new Midi();
