$(document).ready(function(){
  window.addEventListener("gamepadConnected", gamepadConnected);

  window.addEventListener("gamepadDisconnected", gamePadDisconected);

  function buttonPressed(event, pressed){
    console.log(event.button, pressed);
  }

  function gamepadConnected(event){
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
    alert('Dance Pad Connected');
  }

  function gamepadDisconnected(event){
    console.log("Gamepad disconnected from index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
    alert('Dance Pad Disonnected!');
  }
});
