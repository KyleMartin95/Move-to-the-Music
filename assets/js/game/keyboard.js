var keyMap = {
  'q': 'up_left', 'w': 'up', 'e': 'up_right', 'a': 'left', 'd': 'right',
  'z': 'back_left', 'x': 'down', 'c': 'back_right'
};

var keyPressEvent = function(event){
  var key = event.key;
  var d = new Date()
  var time = d.getTime();
  if(checkIfHit(time)) {
    switch(key){
      case 'q':
        //set direction girl points to
        game.direction = keyMap.q;
        //calls hit event to make animation happen
        hit(keyMap.q)
        break;
      case 'w':
        game.direction = keyMap.w;
        hit(keyMap.w)
        break;
      case 'e':
        game.direction = keyMap.e;
        hit(keyMap.e)
        break;
      case 'a':
        game.direction = keyMap.a;
        hit(keyMap.a)
        break;
      case 'd':
        game.direction = keyMap.d;
        hit(keyMap.d)
        break;
      case 'z':
        game.direction = keyMap.z;
        hit(keyMap.z)
        break;
      case 'x':
        game.direction = keyMap.x;
        hit(keyMap.x)
        break;
      case 'c':
        game.direction = keyMap.c;
        hit(keyMap.c)
        break;
      default:
        //do nothing
        break;
    }
  }
  else {
    game.direction = 'miss';
    hit('miss');
  }
}

//register key press event
$(document).ready(function(){
  $(document).keydown(function(e){
    //only want to trigger event for qweadzxc
    if(e.which == 81 || e.which == 87 || e.which == 69 || e.which == 65 || e.which == 68 || e.which == 90 || e.which == 88 || e.which == 67){
      keyPressEvent(event);
    }
  });
});
