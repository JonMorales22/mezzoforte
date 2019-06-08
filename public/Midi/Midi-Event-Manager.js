
import { Midis } from './Midis.js'
import { Audio } from './Audio.js'

var isRecording = false;
var isActive = true;
var chord = [];

Midis.on('noteOn', midiNote => {
  Audio.playSound([midiNote]);

  if(!isActive)
    return;

  setTime();
  captureNotes(midiNote);
})

function setTime() {
  if(!isRecording) {
    toggleisRecording();
    setTimeout(()=> {
      toggleisRecording()
      //console.log("testing");
      chord.sort();
      Midis.emit('chordOn', chord);
      chord = [];
      }, 100);
  }
}

function toggleisRecording() {
  if(!isRecording)
    isRecording=true;
  else
    isRecording=false;
}

function captureNotes(midiNote) {
  if(!isRecording && !isActive)
    return;
  chord.push(midiNote)
}

class MidiEventManager {

}

export var midiEventManager = new MidiEventManager();
