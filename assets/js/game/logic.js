var keyMap = {
  'q': 'up_left', 'w': 'up', 'e': 'up_right', 'a': 'left', 'd': 'right',
  'z': 'back_left', 'x': 'down', 'c': 'back_right'
};

var date = new Date();

  //checks if hit or miss when button is pressed
  //beats is the list of times associated with a beat

  var checkIfHit = function(time){
    var beats = [4.083691469,4.701663295,5.423903673,6.090059891,6.765013335,7.383834996,8.105998601,8.748635338,9.431170785,10.034428567,10.716335054,11.407310549,12.057851569,12.716156055,13.414872846,14.057684476,14.72397166,15.334893964,15.929669,16.61249922,17.287100825,17.945950518,18.620541448,19.239383226,19.890047411,20.509012353,21.199339593,21.850117499,22.453436453,23.111931843,23.81006155,24.437168893,25.095700412,25.738144192,26.436854414,27.07929614,27.722277738,28.349341153,29.023260015,29.666361493,30.284862106,30.927536203,31.618095813,32.308308099,32.935332101,33.538525837,34.228641644,34.855756378];
    var difficulty = .1;
    var elapsedTime = (startTime - time);
    console.log(elapsedTime);
    for(var i = 0; i < beats.length; i++) {
      if(elapsedTime - beats[i] > difficulty*-1 && elapsedTime - beats[i] < difficulty) {
        console.log("hit");
        return true;
      }
    }
    console.log("miss");
    return false;
  }

var keyPressEvent = function(event){
  var key = event.key;
  var time = date.getTime();
  if(checkIfHit(time)) {
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
  else {
    game.direction = 'miss';
    hit('miss');
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
