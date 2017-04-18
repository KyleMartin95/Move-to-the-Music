var keyMap = {
  'q': 'up_left', 'w': 'up', 'e': 'up_right', 'a': 'left', 'd': 'right',
  'z': 'back_left', 'x': 'down', 'c': 'back_right'
};

var date = new Date();

//checks if hit or miss when button is pressed
//beats is the list of times associated with a beat
var checkIfHit = function(time){
  var difficulty = .12;
  var elapsedTime = ((time - startTime)/1000) + .3;
  for(var i = 0; i < beats.length; i++) {
    if(elapsedTime - beats[i] > difficulty*-1 && elapsedTime - beats[i] < difficulty) {
      return true;
    }
  }
  return false;
}

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

//handles hit event
var reset;
var hit = function(direction){
  //in case of multiple hits before reset
  clearTimeout(reset);

  //need to make sure its not up or down because theres not a girl animation for that
  if((direction != 'up') & (direction != 'down')){
    game.girl = new Image();
    game.girl.onload = onImageLoad;
    game.girl.src = '/images/girl_' + direction + '.png';
  }else{
    game.girl = new Image();
    game.girl.onload = onImageLoad;
    game.girl.src = '/images/chibi-girl.png';
  }

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
  var ratio = Math.min(game.element.width/game.frames[game.frame].width, game.element.height/game.frames[game.frame].height);
  console.log(ratio);
  game.context.drawImage(game.frames[game.frame], 0, game.element.height/1.81512, game.frames[game.frame].width*ratio, game.frames[game.frame].height*ratio);
  ratio = Math.min(game.element.width/game.background.width, game.element.height/game.background.height);
  game.context.drawImage(game.background, 0, 0, game.background.width, game.background.height, 0, 0, game.element.width, game.element.height);
  game.context.drawImage(game.girl, game.element.width/2.25, game.element.height/3, game.girl.width*ratio, game.girl.height*ratio);
  game.context.drawImage(game.arrows[0], game.element.width/100, game.element.height/300, game.arrows[0].width*ratio, game.arrows[0].height*ratio);
  game.context.drawImage(game.arrows[1], game.element.width/2.25, game.element.height/300, game.arrows[1].width*ratio, game.arrows[1].height*ratio);
  game.context.drawImage(game.arrows[2], game.element.width/1.15, game.element.height/300, game.arrows[2].width*ratio, game.arrows[2].height*ratio);
  game.context.drawImage(game.arrows[3], game.element.width/1.15, game.element.height/2.2, game.arrows[3].width*ratio, game.arrows[3].height*ratio);
  game.context.drawImage(game.arrows[4], game.element.width/1.15, game.element.height/1.22, game.arrows[4].width*ratio, game.arrows[4].height*ratio);
  game.context.drawImage(game.arrows[5], game.element.width/2.25, game.element.height/1.3, game.arrows[5].width*ratio, game.arrows[5].height*ratio);
  game.context.drawImage(game.arrows[6], game.element.width/100, game.element.height/1.22, game.arrows[6].width*ratio, game.arrows[6].height*ratio);
  game.context.drawImage(game.arrows[7], game.element.width/100, game.element.height/2.2, game.arrows[7].width*ratio, game.arrows[7].height*ratio);
  //decides where to put hit message if there is one
  if(game.hitMessage.src != '#'){
    switch(game.direction){
      case 'up_left':
        game.context.drawImage(game.hitMessage, game.element.width/100, game.element.height/300, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'up':
        game.context.drawImage(game.hitMessage, game.element.width/2.25, game.element.height/300, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'up_right':
        game.context.drawImage(game.hitMessage, game.element.width/1.15, game.element.height/300, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'left':
        game.context.drawImage(game.hitMessage, game.element.width/100, game.element.height/2.2, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'right':
        game.context.drawImage(game.hitMessage, game.element.width/1.15, game.element.height/2.2, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'back_left':
        game.context.drawImage(game.hitMessage, game.element.width/100, game.element.height/1.22, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'down':
        game.context.drawImage(game.hitMessage, game.element.width/2.25, game.element.height/1.22, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
        break;
      case 'back_right':
        game.context.drawImage(game.hitMessage, game.element.width/1.15, game.element.height/1.22, game.hitMessage.width*ratio, game.hitMessage.height*ratio);
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
  $(document).keydown(function(event){
    keyPressEvent(event);
  });
});
