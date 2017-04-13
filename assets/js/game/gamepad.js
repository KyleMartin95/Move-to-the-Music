var buttonMap = {
  2: {
    'number': 0,
    'direction': 'up_left',
    'key': 'q'
  },

  12:{
    'number': 1,
    'direction': 'up',
    'key': 'w'
  },

  1: {
    'number': 2,
    'direction': 'up_right',
    'key': 'e'
  },

  15: {
    'number': 3,
    'direction': 'left',
    'key': 'a'
  },

  13: {
    'number': 4,
    'direction': 'right',
    'key': 'd'
  },

  0: {
    'number': 5,
    'direction': 'back_left',
    'key': 'z'
  },

  14: {
    'number': 6,
    'direction': 'down',
    'key': 'x'
  },

  3: {
    'number': 7,
    'direction': 'back_right',
    'key': 'c'
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

    setInterval(updateStatus, 500);
  }

  function updateStatus() {
    scangamepads();
    for (j in controllers) {
      var controller = controllers[j];
      for (var i=0; i<controller.buttons.length; i++) {
        var button = controller.buttons[i];
        //check to make sure it is a button
        if (typeof(button) == "object") {
          //check if button is pressed
          if(button.pressed){
            buttonPressEvent(button, i);
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
      window.addEventListener("webkitgamepadconnected", connecthandler);
      window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
    }else {
      setInterval(scangamepads, game.frameRate);
    }
  }

  function buttonPressEvent(button, buttonNumber){
    var time = date.getTime();
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
  }

  setInterval(checkForGamePad, 500);
});
