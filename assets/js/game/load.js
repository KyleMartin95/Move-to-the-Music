var game = null;
function Game(width, height){
  //get the game element and set the context
  this.element = document.getElementById("game");
  this.context = this.element.getContext("2d");

  //set the size of the game element
  this.element.width = document.body.clientWidth * .8;
  this.element.height = document.body.clientHeight;

  this.frameRate = 1000/15;
  this.frame = 0;

  this.direction;

  this.floors = [];
  this.frames = [];

  //load background
  this.background = new Image();
  this.background.onload = onImageLoad;
  this.background.src = '/images/transparent_background.png';

  //load floors
  for(var i = 0; i <= 11; i++){
    var floorSource = '/images/dance_floor' + i + '.png';
    this.floors.push(floorSource);
  }
  for(var i = 0; i <= this.floors.length; i++){
    this.frames.push(new Image());
    this.frames[i].onload = onImageLoad;
    this.frames[i].src = this.floors[i];
  }

  //load girl
  this.girl = new Image();
  this.girl.onload = onImageLoad;
  this.girl.src = '/images/chibi-girl.png';

  this.hitMessage = new Image();

  //load arrows
  this.arrows = [];
  var arrowSRC = ['/images/up_left_arrow.png', '/images/up_arrow.png', '/images/up_right_arrow.png',
            '/images/right_arrow.png', '/images/down_right_arrow.png', '/images/down_arrow.png',
            '/images/down_left_arrow.png', '/images/left_arrow.png'];
  for(var i = 0; i <= arrowSRC.length; i++){
    this.arrows.push(new Image());
    this.arrows[i].onload = onImageLoad;
    this.arrows[i].src = arrowSRC[i];
  }

  //start animation
  setInterval(animate, this.frameRate);
}

var onImageLoad = function(){
  console.log("loaded image");
};

//start the game
$(document).ready(function(){
  var width = window.innerWidth * .75;
  var height = window.innerHeight;
  game = new Game(width, height);
});
