$(document).ready(function(){
  $(document).keypress(function(event){
    keyPressEvent(event);
  });
});

var keyMap = {
  'q': 'up_left',
  'w': 'up',
  'e': 'up_right',
  'a': 'left',
  'd': 'right',
  'z': 'back_left',
  'x': 'down',
  'c': 'back_right'
};

var keyPressEvent = function(event){
  var key = event.key;
  switch(key){
    case 'q':
      direction = keyMap.q;
      hit(keyMap.q)
      break;
    case 'e':
      direction = keyMap.e;
      hit(keyMap.e)
      break;
    case 'a':
      direction = keyMap.a;
      hit(keyMap.a)
      break;
    case 'd':
      direction = keyMap.d;
      hit(keyMap.d)
      break;
    case 'z':
      direction = keyMap.z;
      hit(keyMap.z)
      break;
    case 'c':
      direction = keyMap.c;
      hit(keyMap.c)
      break;
    default:
      //do nothing
      break;
  }
}

//handles hit event
var reset;
var hit = function(direction){
  //in case of multiple hits before reset
  clearTimeout(reset);

  girl = new Image();
  girl.onload = onImageLoad;
  girl.src = '/images/girl_' + direction + '.png';
  hitMessage.onload = onImageLoad;
  hitMessage.src = '/images/hit.png';
  animate();

  //resets the girl to normal standing after a few seconds and clears hit message
  reset = setTimeout(function(){
    hitMessage = new Image();
    girl = new Image();
    girl.onload = onImageLoad;
    girl.src = '/images/chibi-girl.png';
    animate()
  }, 2500);
};
