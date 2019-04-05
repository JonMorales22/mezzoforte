// var myScript = document.querySelector('script');
// var div = document.querySelector('.note_display')

var Midis = require('./Midis.js');

window.addEventListener('load', function() {
  //console.log(Hello.Hello());
  navigator.requestMIDIAccess()
    .then((midiaccess) =>{
      Midis.setMidiAccess(midiaccess);
      var inputs = Midis.getInputs();
      Midis.setMidiEvent(inputs[0]);
    });  
})

console.log(Midis.setMidiAccess());

// function displayNote(note) {
//   div.innerHTML = note;
// }

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
