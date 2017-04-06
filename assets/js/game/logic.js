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

var reset;

$(document).ready(function(){



  $(document).keypress(function(event){
    console.log("keyPressed");
    var key = event.key;
    switch(key){
      case 'q':
        hit(keyMap.q)
        break;
      case 'w':
        hit(keyMap.w)
        break;
      case 'e':
        hit(keyMap.e)
        break;
      case 'a':
        hit(keyMap.a)
        break;
      case 'd':
        hit(keyMap.d)
        break;
      case 'z':
        hit(keyMap.z)
        break;
      case 'x':
        hit(keyMap.x)
        break;
      case 'c':
        hit(keyMap.c)
        break;
      default:
        //do nothing
        break;
    }
  });
});



var hit = function(direction){
  //in case of multiple hits before reset
  clearTimeout(reset);

  girl = new Image();
  girl.onload = onImageLoad;
  girl.src = '/images/girl_' + direction + '.png';
  animate();
  
  //resets the girl to normal standing after a few seconds
  reset = setTimeout(function(){
    girl = new Image();
    girl.onload = onImageLoad;
    girl.src = '/images/chibi-girl.png';
    animate()
  }, 2500);
};
