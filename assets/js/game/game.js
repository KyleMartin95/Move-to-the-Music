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

  this.startTime;

  //initialize song and score
  this.song;
  this.score = 0;

  //start animation
  this.animation = setInterval(animate, this.frameRate);
}

//checks if hit or miss when button is pressed
//beats is the list of times associated with a beat
var checkIfHit = function(time){
  var difficulty = .12;
  var elapsedTime = ((time - game.startTime)/1000) + .3;
  for(var i = 0; i < beats.length; i++) {
    if(elapsedTime - beats[i] > difficulty*-1 && elapsedTime - beats[i] < difficulty) {
      return true;
    }
  }
  return false;
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

var loadSong = function(){
  game.song = new Howl({
    src: ['/audio/' + songName +'.mp3']
  });

  //starts song once it loads and registers the time the song starts
  game.song.once('load', function(){
    game.song.play();
    var date = new Date();
    game.startTime = date.getTime();
  });

  //calls the game end function when the song is over
  game.song.on('end', function(){
    endGame();
  });
};

var endGame = function(){
  //stops the animation
  clearInterval(game.animation);

  //hide the game and show the name form
  $('.game-container').hide();
  $('#page-content-wrapper').css('background-color', '#7BAFD4');
  $('.main-login').show();

  //prevent form post
  $("#name-submit").submit(function(e){
    e.preventDefault();

    var user = $('#name').val();

    //create a new score
    requests.updateScore(songName, user, game.score, function(scoreObject){
      displayScores(scoreObject);
    });

    var displayScores = function(scoreObject){
      //get all the scores of the song that played including the one that was just added
      requests.getScores(scoreObject.song, function(scores){
        //hide the name submit form
        $('.main-login').hide();

        //display all the scores for the song
        $('#score-table').show();
        $(scores).each(function(index, scoreObject){
          var markup = '<tr><td>' + scoreObject.user + '</td><td>' + scoreObject.score + '</td></tr>';
          $('table tbody').append(markup);
        });
      });
    }
  });
};

var onImageLoad = function(){
  console.log("loaded image");
};

//start the game
$(document).ready(function(){
  var width = window.innerWidth * .75;
  var height = window.innerHeight;

  //initialize game object
  game = new Game(width, height);

  //start song
  loadSong();
});
