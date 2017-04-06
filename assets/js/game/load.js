var game = null;
var context = null;
var frameRate = 1000/10;
var frame = 0;
var direction;
var floors = [];
var frames = [];
var background = null;
var girl = null;
var hitMessage = new Image();
var arrows = [];

$(document).ready(function(){

  var setup = function(){
    game = document.getElementById("game");
    context = game.getContext("2d");
    game.width = 1275;
    game.height = 1080;
    loadBackground();
    loadFloors();
    loadGirl();
    loadArrows();
    setInterval(animate, frameRate);
  };

  setup();
});

var loadBackground = function(){
  background = new Image();
  background.onload = onImageLoad;
  background.src = '/images/transparent_background.png';
}

var loadFloors = function(){
  for(var i = 0; i <= 11; i++){
    var floorSource = '/images/dance_floor' + i + '.png';
    floors.push(floorSource);
  }
  for(var i = 0; i <= floors.length; i++){
    frames.push(new Image());
    frames[i].onload = onImageLoad;
    frames[i].src = floors[i];
  }
};

var loadGirl = function(){
  girl = new Image();
  girl.onload = onImageLoad;
  girl.src = '/images/chibi-girl.png';
}

var loadArrows = function(){
  var arrowSRC = ['/images/up_left_arrow.png', '/images/up_arrow.png', '/images/up_right_arrow.png',
            '/images/right_arrow.png', '/images/down_right_arrow.png', '/images/down_arrow.png',
            '/images/down_left_arrow.png', '/images/left_arrow.png'];
  for(var i = 0; i <= arrowSRC.length; i++){
    arrows.push(new Image());
    arrows[i].onload = onImageLoad;
    arrows[i].src = arrowSRC[i];
  }
}

var animate = function(){
  context.clearRect(0, 0, game.width, game.height);
  context.drawImage(frames[frame], 0, 595);
  context.drawImage(background, 0, 0);
  context.drawImage(girl, 530, 250);
  context.drawImage(arrows[0], 50, 10);
  context.drawImage(arrows[1], 530, 10);
  context.drawImage(arrows[2], 1060, 10);
  context.drawImage(arrows[7], 50, 400);
  context.drawImage(arrows[3], 1060, 400);
  context.drawImage(arrows[6], 50, 700);
  context.drawImage(arrows[5], 530, 700);
  context.drawImage(arrows[4], 1060, 700);
  //decides where to put hit message if there is one
  if(hitMessage.src != '#'){
    switch(direction){
      case 'up_left':
        context.drawImage(hitMessage, 50, 10);
        break;
      case 'up_right':
        context.drawImage(hitMessage, 1060, 10);
        break;
      case 'left':
        context.drawImage(hitMessage, 50, 400);
        break;
      case 'right':
        context.drawImage(hitMessage, 1060, 400);
        break;
      case 'back_left':
        context.drawImage(hitMessage, 50, 700);
        break;
      case 'back_right':
        context.drawImage(hitMessage, 1060, 700);
        break;
      default:
        //do nothing
        break;
    }
  }
  frame = ((frame + 1) % floors.length);
};

var onImageLoad = function(){
  console.log("loaded image");
};
