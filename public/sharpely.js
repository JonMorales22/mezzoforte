var Hello = require('./Midis.js');


var audioCtx = new window.AudioContext;
var myScript = document.querySelector('script');
var pre = document.querySelector('pre');

var div = document.querySelector('.note_display')

var midiAccess;

window.addEventListener('load', function() {
  console.log(Hello.Hello());
  
  navigator.requestMIDIAccess()
    .then((midiaccess) =>{
      midiAccess = midiaccess;
      initMidiAccess();
    });  
})

function initMidiAccess() {
  const inputs = midiAccess.inputs.values();
  
  var result = inputs.next();
  console.log(result);

  result.value.onmidimessage = MIDIMessageEventHandler;
}

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
  playSound({wave: "sine", freq: noteFreq, duration: .25});
  displayNote(noteFreq);

  console.log(noteNumber);
  console.log(noteFreq);
}

function noteOff(data) {
  console.log(data);
}

function playSound(sound) {
  var wave = createWave(sound.wave, sound.freq);  
  wave.start();
  wave.stop(audioCtx.currentTime + sound.duration);
}

function createWave(type, value) {
  var oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(value, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  return oscillator;
}

function displayNote(note) {
  div.innerHTML = note;
}

pre.innerHTML = myScript.innerHTML

// navigator.requestMIDIAccess()
//   .then(function(midiAccess) {
//     access = midiAccess;
//      // Get lists of available MIDI controllers
//      const inputs = midiAccess.inputs.values();
//      const outputs = midiAccess.outputs.values();

//      // let result = inputs.next();
//      // while(!result.done) {
//      //   console.log(result.value);
//      //   result=inputs.next();
//      // }

//      let result = inputs.next();
//      console.log(result);

//      result.value.onmidimessage = function ( event ) {
//       var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
//         for (var i=0; i<event.data.length; i++) {
//           str += "0x" + event.data[i].toString(16) + " ";
//         }
//       console.log( str );
//      }

     // console.log(result);

     // while(!stopLogging) {
     //   function startLoggingMIDIInput( midiAccess, indexOfPort ) {
     //     midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
     //   }
     // }
 // });

// function onMIDIMessageEvent( event ) {
//   var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
//   for (var i=0; i<event.data.length; i++) {
//     str += "0x" + event.data[i].toString(16) + " ";
//   }
//   console.log( str );
// }
