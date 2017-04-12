var keyMap = {
  'q': 'up_left', 'w': 'up', 'e': 'up_right', 'a': 'left', 'd': 'right',
  'z': 'back_left', 'x': 'down', 'c': 'back_right'
};

var keyPressEvent = function(event){
  var key = event.key;
  switch(key){
    case 'q':
      //set direction girl points to
      game.direction = keyMap.q;
      //calls hit event to make animation happen
      hit(keyMap.q)
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
    case 'c':
      game.direction = keyMap.c;
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

  game.girl = new Image();
  game.girl.onload = onImageLoad;
  game.girl.src = '/images/girl_' + direction + '.png';
  game.hitMessage.onload = onImageLoad;
  game.hitMessage.src = '/images/hit.png';
  animate();

  //resets the girl to normal standing after a few seconds and clears hit message
  reset = setTimeout(function(){
    game.hitMessage = new Image();
    game.girl = new Image();
    game.girl.onload = onImageLoad;
    game.girl.src = '/images/chibi-girl.png';
    animate()
  }, 2500);
};

//main animation function
var animate = function(){
  game.context.clearRect(0, 0, game.element.width, game.element.height);
  game.context.drawImage(game.frames[game.frame], 0, 595);
  game.context.drawImage(game.background, 0, 0);
  game.context.drawImage(game.girl, 530, 250);
  game.context.drawImage(game.arrows[0], 50, 10);
  game.context.drawImage(game.arrows[1], 530, 10);
  game.context.drawImage(game.arrows[2], 1060, 10);
  game.context.drawImage(game.arrows[7], 50, 400);
  game.context.drawImage(game.arrows[3], 1060, 400);
  game.context.drawImage(game.arrows[6], 50, 700);
  game.context.drawImage(game.arrows[5], 530, 700);
  game.context.drawImage(game.arrows[4], 1060, 700);
  //decides where to put hit message if there is one
  if(game.hitMessage.src != '#'){
    switch(game.direction){
      case 'up_left':
        game.context.drawImage(game.hitMessage, 50, 10);
        break;
      case 'up_right':
        game.context.drawImage(game.hitMessage, 1060, 10);
        break;
      case 'left':
        game.context.drawImage(game.hitMessage, 50, 400);
        break;
      case 'right':
        game.context.drawImage(game.hitMessage, 1060, 400);
        break;
      case 'back_left':
        game.context.drawImage(game.hitMessage, 50, 700);
        break;
      case 'back_right':
        game.context.drawImage(game.hitMessage, 1060, 700);
        break;
      default:
        //do nothing
        break;
    }
  }
  game.frame = ((game.frame + 1) % game.floors.length);
};

//register key press event
$(document).ready(function(){
  $(document).keypress(function(event){
    keyPressEvent(event);
  });
});
