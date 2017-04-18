var buttonMap = {
  2: {
    'number': 0,
    'direction': 'up_left',
    'key': 'q',
    'pressed': false
  },

  12:{
    'number': 1,
    'direction': 'up',
    'key': 'w',
    'pressed': false
  },

  1: {
    'number': 2,
    'direction': 'up_right',
    'key': 'e',
    'pressed': false
  },

  15: {
    'number': 3,
    'direction': 'left',
    'key': 'a',
    'pressed': false
  },

  13: {
    'number': 4,
    'direction': 'right',
    'key': 'd',
    'pressed': false
  },

  0: {
    'number': 5,
    'direction': 'back_left',
    'key': 'z',
    'pressed': false
  },

  14: {
    'number': 6,
    'direction': 'down',
    'key': 'x',
    'pressed': false
  },

  3: {
    'number': 7,
    'direction': 'back_right',
    'key': 'c',
    'pressed': false
  }
}

$(document).ready(function(){
  var haveEvents = 'GamepadEvent' in window;
  var haveWebkitEvents = 'WebKitGamepadEvent' in window;
  var controllers = {};
  var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;
  var date = new Date();

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

  function updateStatus() {
    scangamepads();

      var controller = controllers[0];
      for (var i=0; i<controller.buttons.length; i++) {
        var button = controller.buttons[i];
        //check to make sure it is a button
        if (typeof(button) == "object" && buttonMap[i]) {
          //check if button is pressed
          if(button.pressed && buttonMap[i].pressed == false){
            console.log("calling event");
            buttonPressEvent(button, i);
            buttonMap[i].pressed = true;
          }else if(button.pressed && buttonMap[i].pressed) {
            //alert("made it into thing");
            continue;
          }else if((button.pressed === false) & (buttonMap[i].pressed)){
            buttonMap[i].pressed = false;
          }
          console.log(i + ':  ' + button.pressed + '  ' + buttonMap[i].pressed + '  ' + buttonMap[i].direction);
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
      window.addEventListener("webkitgamepadconnected", connecthandler);
      window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
    }else {
      setInterval(scangamepads, game.frameRate);
    }
  }

  function buttonPressEvent(button, buttonNumber){
    var time = date.getTime();
    if(checkIfHit(time)) {
      switch(buttonNumber){
        case 0:
          //set direction girl points to
          game.direction = buttonMap[0].direction;
          //calls hit event to make animation happen
          hit(keyMap.z)
          break;
        case 1:
          game.direction = buttonMap[1].direction;
          hit(keyMap.e)
          break;
        case 2:
          game.direction = buttonMap[2].direction;
          hit(keyMap.q)
          break;
        case 3:
          game.direction = buttonMap[3].direction;
          hit(keyMap.c)
          break;
        case 13:
          game.direction = buttonMap[13].direction;
          hit(keyMap.d)
          break;
        case 15:
          game.direction = buttonMap[15].direction;
          hit(keyMap.a)
          break;
        default:
          //do nothing
          break;
      }
    }else {
      game.direction = 'miss';
      hit('miss');
    }
  }

  setInterval(checkForGamePad, 500);
});
