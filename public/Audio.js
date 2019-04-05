const audioCtx = new window.AudioContext;

function createWave(type, value) {
  var oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(value, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  return oscillator;
}

module.exports = {
  playSound: function(sound) {
    var wave = createWave(sound.wave, sound.freq);  
    wave.start();
    wave.stop(audioCtx.currentTime + sound.duration);
  }
} 
