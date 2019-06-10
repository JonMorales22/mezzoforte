const EventEmitter = require('events');

var midiStuff;

class Midi extends EventEmitter {
  Input;
  InputsArray = [];

  async setMidiAccess(navigator) {
    try {
      midiStuff = await navigator.requestMIDIAccess();
      
      //var inputs = this.getInputs();
      //this.setInput(inputs[0]);
      //var result = await this.Input.open();

      // return this.Input;
    }
    catch(error) {
      console.error(error)
    }

  }

  // async setInput(input) {
  //   try {
  //     input.onmidimessage = MIDIMessageEventHandler;
  //     this.Input = input;
  //     var result = await this.Input.open();
  //   }
  //   catch(error) {
  //     console.error(error);
  //   }
  // }

  async setInput(index) {
    try {
      this.Input = this.InputsArray[index];
      this.Input.onmidimessage = MIDIMessageEventHandler;
      var result = await this.Input.open();
      return result;
    }
    catch(error) {
      console.error(error);
    }
  }

  getInputs() {
    var inputValues = midiStuff.inputs;
    var inputs = [];    
    midiStuff.inputs.forEach((port, key) => {
      this.InputsArray.push(port);
    })

    return this.InputsArray;
  }

}

function MIDIMessageEventHandler(event) {
    // Mask off the lower nibble (MIDI channel, which we don't care about)
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
          //var noteFreq = frequencyFromNoteNumber(event.data[1])
          //console.log(event.data)
          // console.log(event.data);
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
