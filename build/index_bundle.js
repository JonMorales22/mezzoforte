/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/sharpely.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/Midis.js":
/*!*************************!*\
  !*** ./public/Midis.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  Hello: function() {\n    return \"Hello!\";\n  },\n  Fuck: function() {\n    return \"Fuck\";\n  }\n}\n\n//# sourceURL=webpack:///./public/Midis.js?");

/***/ }),

/***/ "./public/sharpely.js":
/*!****************************!*\
  !*** ./public/sharpely.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hello = __webpack_require__(/*! ./Midis.js */ \"./public/Midis.js\");\n\n\nvar audioCtx = new window.AudioContext;\nvar myScript = document.querySelector('script');\nvar pre = document.querySelector('pre');\n\nvar div = document.querySelector('.note_display')\n\nvar midiAccess;\n\nwindow.addEventListener('load', function() {\n  console.log(Hello.Hello());\n  \n  navigator.requestMIDIAccess()\n    .then((midiaccess) =>{\n      midiAccess = midiaccess;\n      initMidiAccess();\n    });  \n})\n\nfunction initMidiAccess() {\n  const inputs = midiAccess.inputs.values();\n  \n  var result = inputs.next();\n  console.log(result);\n\n  result.value.onmidimessage = MIDIMessageEventHandler;\n}\n\nfunction MIDIMessageEventHandler(event) {\n  // Mask off the lower nibble (MIDI channel, which we don't care about)\n  switch (event.data[0] & 0xf0) {\n    case 0x90:\n      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message\n        noteOn(event.data[1]);\n        return;\n      }\n      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.\n    case 0x80:\n      noteOff(event.data[1]);\n      return;\n  }\n}\n\nfunction frequencyFromNoteNumber( note ) {\n  return 440 * Math.pow(2,(note-69)/12);\n}\n\nfunction noteOn(noteNumber) {\n  var noteFreq = frequencyFromNoteNumber(noteNumber)\n  playSound({wave: \"sine\", freq: noteFreq, duration: .25});\n  displayNote(noteFreq);\n\n  console.log(noteNumber);\n  console.log(noteFreq);\n}\n\nfunction noteOff(data) {\n  console.log(data);\n}\n\nfunction playSound(sound) {\n  var wave = createWave(sound.wave, sound.freq);  \n  wave.start();\n  wave.stop(audioCtx.currentTime + sound.duration);\n}\n\nfunction createWave(type, value) {\n  var oscillator = audioCtx.createOscillator();\n  oscillator.type = type;\n  oscillator.frequency.setValueAtTime(value, audioCtx.currentTime);\n  oscillator.connect(audioCtx.destination);\n  return oscillator;\n}\n\nfunction displayNote(note) {\n  div.innerHTML = note;\n}\n\npre.innerHTML = myScript.innerHTML\n\n// navigator.requestMIDIAccess()\n//   .then(function(midiAccess) {\n//     access = midiAccess;\n//      // Get lists of available MIDI controllers\n//      const inputs = midiAccess.inputs.values();\n//      const outputs = midiAccess.outputs.values();\n\n//      // let result = inputs.next();\n//      // while(!result.done) {\n//      //   console.log(result.value);\n//      //   result=inputs.next();\n//      // }\n\n//      let result = inputs.next();\n//      console.log(result);\n\n//      result.value.onmidimessage = function ( event ) {\n//       var str = \"MIDI message received at timestamp \" + event.timestamp + \"[\" + event.data.length + \" bytes]: \";\n//         for (var i=0; i<event.data.length; i++) {\n//           str += \"0x\" + event.data[i].toString(16) + \" \";\n//         }\n//       console.log( str );\n//      }\n\n     // console.log(result);\n\n     // while(!stopLogging) {\n     //   function startLoggingMIDIInput( midiAccess, indexOfPort ) {\n     //     midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});\n     //   }\n     // }\n // });\n\n// function onMIDIMessageEvent( event ) {\n//   var str = \"MIDI message received at timestamp \" + event.timestamp + \"[\" + event.data.length + \" bytes]: \";\n//   for (var i=0; i<event.data.length; i++) {\n//     str += \"0x\" + event.data[i].toString(16) + \" \";\n//   }\n//   console.log( str );\n// }\n\n\n//# sourceURL=webpack:///./public/sharpely.js?");

/***/ })

/******/ });