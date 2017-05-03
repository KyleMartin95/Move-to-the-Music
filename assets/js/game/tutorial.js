/////////////        tutorial walkthrough            //////////////////////////
var tutorial = function(){
  responsiveVoice.speak("Hey, welcome to move to the music! The goal of the game is to step on the dance pad to the beat of the music. You can step on any button on the dance pad on any beat. Try pressing on the up arrow", "US English Female", {onstart: voiceStartCallback, onend: firstVoiceEndCallback});

  function voiceStartCallback(){
    console.log('voice started');
  }

  function firstVoiceEndCallback(){
    console.log('voice ended');
    setTimeout(function(){
      calibrationDirection = 'down';
      responsiveVoice.speak("The sound you just heard is an indication that you stepped on the beat. Now try stepping on the down arrow.", "US English Female", {onstart: voiceStartCallback, onend: secondVoiceEndCallback});
    }, 3000);
  }

  function secondVoiceEndCallback(){
    console.log("second voice callback");
    setTimeout(function(){
      calibrationDirection = 'up_left';
      responsiveVoice.speak("That sound means you hit off the beat. Stepping on the beat gets you ten points. You can rack up even more points by getting combos. One combo is blastoff. Try stepping on the up-left arrow", "US English Female", {onstart: voiceStartCallback, onend: thirdVoiceEndCallback});
    }, 3000);
  }

  function thirdVoiceEndCallback(){
    console.log("third voice callback");
    setTimeout(function(){
      calibrationDirection = 'left';
      responsiveVoice.speak("Now hit the left arrow", "US English Female", {onstart: voiceStartCallback, onend: fourthVoiceEndCallback});
    }, 3000);
  }

  function fourthVoiceEndCallback(){
    console.log("fourth voice callback");
    setTimeout(function(){
      calibrationDirection = 'back_left';
      responsiveVoice.speak("Now hit the bottom-left arrow", "US English Female", {onstart: voiceStartCallback, onend: fifthVoiceEndCallback});
    }, 3000);
  }

  function fifthVoiceEndCallback(){
    console.log("fifth voice callback");
    setTimeout(function(){
      calibrationDirection = 'up_right';
      responsiveVoice.speak("Another combo is running man. First, hit the up-right arrow", "US English Female", {onstart: voiceStartCallback, onend: sixthVoiceEndCallback});
    }, 3000);
  }

  function sixthVoiceEndCallback(){
    console.log("sixth voice callback");
    setTimeout(function(){
      calibrationDirection = 'right';
      responsiveVoice.speak("Now hit the right arrow", "US English Female", {onstart: voiceStartCallback, onend: seventhVoiceEndCallback});
    }, 3000);
  }

  function seventhVoiceEndCallback(){
    console.log("seventh voice callback");
    setTimeout(function(){
      calibrationDirection = 'back_right';
      responsiveVoice.speak("Finally step on bottom-right arrow", "US English Female", {onstart: voiceStartCallback, onend: eigthVoiceEndCallback});
    }, 3000);
  }

  function eigthVoiceEndCallback(){
    console.log("eigth voice callback");
    setTimeout(function(){
      responsiveVoice.speak("Nice! Looks like you're all set to play the game now", "US English Female", {onstart: voiceStartCallback, onend: lastVoiceEndCallback});
    }, 3000);
  }

  function lastVoiceEndCallback(){
    console.log('end of tutorial');
    console.log(buttonMap);
    localStorage.buttonMap = JSON.stringify(buttonMap);
  }

}
////////////////////          end tutorial              ///////////////////////

///////////////////          for calibrating dancepad   ///////////////////////

//button map is filled out during tutorial using calibration direction
var buttonMap = {};
var calibrationDirection = 'up';

var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.requestAnimationFrame;

function connecthandler(e) {
  addGamepad(e.gamepad);
  alert("gamepad connected");
}

function disconnecthandler(e) {
  alert("gamepad disconnected");
}

function addGamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  setInterval(updateStatus, 100);
}

var foundController = false;
var controller = null;
function updateStatus() {
  scangamepads();
  if(!foundController) {
    //console.log("checking for controller");
    for(var j=0; j < 4 && !foundController; j++) {
      var contr = controllers[j];
      if(contr == null) continue;
      for (var i=0; i<contr.buttons.length; i++) {
        var button = contr.buttons[i];
        //check to make sure it is a button
        if (typeof(button) == "object") {
          //check if button is pressed
          if(button.pressed){
            buttonPressEvent(button, i);
            foundController = true;
            controller = controllers[j];
          }else{
            //alert("made it into thing");
            continue;
          }
        }
      }
    }
  }else {
    console.log(foundController);
    console.log(controller);
    for (var i=0; i<controller.buttons.length; i++) {
      var button = controller.buttons[i];
      //check to make sure it is a button
      if (typeof(button) == "object") {
        //check if button is pressed
        if(button.pressed){
          buttonPressEvent(button, i);
        }else{
          //alert("made it into thing");
          continue;
        }
      }
    }
  }
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addGamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

function checkForGamePad(){
  if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
  }else if (haveWebkitEvents) {

  }else {
    setInterval(scangamepads, game.frameRate);
  }
}

function buttonPressEvent(button, buttonNumber){
  if(calibrationDirection == 'down'){
    var wrong = new Howl({
      src: ['/audio/clank.wav']
    });
    wrong.play();
  }else{
    var right = new Howl({
      src: ['/audio/congrats.WAV']
    });
    right.play();
  }
  buttonMap[buttonNumber] = {direction: calibrationDirection, pressed: false};
}

setInterval(checkForGamePad, 500);
