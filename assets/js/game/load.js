var game = null;

function Game(){
  this.element = document.getElementById("game");
  this.context = this.element.getContext("2d");
  this.element.width = 1275;
  this.element.height = 1080;
  this.frameRate = 1000/10;
  this.frame = 0;
  this.direction;
  this.floors = [];
  this.frames = [];

  this.background = new Image();
  this.background.onload = onImageLoad;
  this.background.src = '/images/transparent_background.png';

  for(var i = 0; i <= 11; i++){
    var floorSource = '/images/dance_floor' + i + '.png';
    this.floors.push(floorSource);
  }
  for(var i = 0; i <= this.floors.length; i++){
    this.frames.push(new Image());
    this.frames[i].onload = onImageLoad;
    this.frames[i].src = this.floors[i];
  }

  this.girl = new Image();
  this.girl.onload = onImageLoad;
  this.girl.src = '/images/chibi-girl.png';

  this.hitMessage = new Image();

  this.arrows = [];
  var arrowSRC = ['/images/up_left_arrow.png', '/images/up_arrow.png', '/images/up_right_arrow.png',
            '/images/right_arrow.png', '/images/down_right_arrow.png', '/images/down_arrow.png',
            '/images/down_left_arrow.png', '/images/left_arrow.png'];
  for(var i = 0; i <= arrowSRC.length; i++){
    this.arrows.push(new Image());
    this.arrows[i].onload = onImageLoad;
    this.arrows[i].src = arrowSRC[i];
  }

  setInterval(animate, this.frameRate);
}

var onImageLoad = function(){
  console.log("loaded image");
};

//start the game
$(document).ready(function(){
  game = new Game();
});
