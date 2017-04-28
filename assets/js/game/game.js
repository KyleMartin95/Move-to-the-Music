var game = null;
var user = null;

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
      var right = new Howl({
              src: ['/audio/congrats.WAV']
            });
      right.play();
      return true;
    }
  }
  var wrong = new Howl({
              src: ['/audio/clank.WAV']
            });
  wrong.play();
  return false;
}

//handles hit event
var reset;
var comboChecker = (new combo());

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

  if(direction != 'miss') {
    comboChecker.setComboSteps(direction);
    game.score += comboChecker.getComboPoints();
    document.getElementById("score").innerHTML = "" + game.score;
    document.getElementById("combo").innerHTML = "" + comboChecker.getComboMP3();
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

//used for tutorial, sort of hacky
var secondLoadSong = function(){
  game.song = new Howl({
    src: ['/audio/' + songName +'.mp3']
  });

  //starts song once it loads and registers the time the song starts
  game.song.once('load', function(){
    game.song.play();
    var date = new Date();
    game.startTime = date.getTime();
  });
}

/////////////                End Game Section          ////////////////////////
var endGame = function(){
  //stops the animation
  clearInterval(game.animation);

  //hide the game and show the name form
  $('.game-container').hide();
  $('#page-content-wrapper').css('background-color', '#7BAFD4');
  $('.main-center').css('display', 'inline-block');

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
///////////////////////////////////////////////////////////////////////////////


///////////          Combos Section                     ////////////////////
var bazooka = ['down','down','up',"Bazooka",50];
var jackhammer = ['back_left', 'back_right', 'up', 'Jackhammer', 50];
var berserker = ['left','back_right','up_left',"Berserker",50];
var bombardment = ['right','right','up',"Bombardment",50];
var canonball = ['left','up','right',"Canonball",50];
var corkscrew = ['up_left','up','back_right',"Corkscrew",50];
var inferno = ['back_right','down','back_left',"Inferno",50];
var pyschoTee = ['up_left','up_right','back_left',"PyschoTee",50];
var splinter = ['up_left','up','up_right',"Splinter",50];
var torpedo = ['up','up','down',"Torpedo",50];
var zigZag = ['back_left','right','up_left',"ZigZag",50];
var combos = [jackhammer,bazooka,berserker,bombardment,canonball,corkscrew,inferno,pyschoTee,splinter,torpedo,zigZag];
var maxComboSize = 3;

function combo(){
  this.comboInfo = [null, 10];
  this.comboSteps = [null, null, null];
  this.comboStart = 0;
  this.comboIndex = 0;
  this.comboMatched = false;
  this.comboName = "No Combo Yet!";
  this.comboPoints = 10;

  this.getComboSteps = function(){
    return this.comboSteps;
  }

  this.setComboSteps = function(direction){
    //var fir = this.comboStart;
    //var sec = this.comboStart+1>=maxComboSize ? 0 : this.comboStart + 1;
    //var third = this.comboStart+2>=maxComboSize ? 0 : this.comboStart + 2;
    //console.log(fir + ": " + this.comboSteps[fir] + " " + sec + ": " + this.comboSteps[sec] + " " + third +":" + this.comboSteps[third] + " Start: "+ this.comboStart + " Index to add to:" + this.comboIndex + " Combo Matched: " + this.comboMatched + " Points to add: " + this.comboPoints);
    if(this.comboMatched) {
      for(var k = 0; k < this.comboSteps.length; k++) {
        this.comboSteps[k] = null;
      }
      this.comboIndex = 0;
      this.comboStart = 0;
      this.comboName = "No Combo Yet!";
      this.comboPoints = 10;
      this.comboMatched = false;
    }
    this.comboSteps[this.comboIndex++] = direction;
    if(this.comboIndex == this.comboSteps.length) {
      //console.log("reset comboIndex to 0")
      this.comboIndex = 0;
    }
    if(this.comboIndex == this.comboStart) {
      //console.log("3 hits registered")
      for(var i = 0; i < combos.length; i++) {
        var compareIndex = this.comboStart;
        //console.log("starting compareIndex at " + compareIndex);
        for(var j = 0; j < maxComboSize; j++) {
          //console.log("comparing " + combos[i][j] + " to " + this.comboSteps[compareIndex]);
          if(combos[i][j] !== this.comboSteps[compareIndex++]) {
            //console.log("Not a match with " + combos[i][3]);
            break;
          }
          if(compareIndex == maxComboSize) {
            compareIndex = 0;
          }
          if(j == maxComboSize-1) {
            //console.log("Found a match");
            this.comboName = combos[i][maxComboSize];
            this.comboPoints = combos[i][maxComboSize+1];
            var theWordCombo = new Howl({
              src: ['/audio/Combo.mp3']
            });
            theWordCombo.play();
            var comboSound = new Howl({
              src: ['/audio/' + this.comboName +'.mp3']
            });
            setTimeout(function () {
              comboSound.play();
            }, 400);
            this.comboMatched = true;
            return;
          }
        }
      }
      if(this.comboIndex == this.comboStart) {
        this.comboStart++;
      }
      if(this.comboStart == maxComboSize) {
        this.comboStart = 0;
      }
    }
  };

  this.getComboMP3 = function(){
    return this.comboName;
  }

  this.getComboPoints = function(){
    return this.comboPoints;
  }
}

//////////////       End Combos Section              //////////////////////////

/////////////        tutorial walkthrough            //////////////////////////
var tutorial = function(){
  responsiveVoice.speak("Hey, welcome to move to the music! The goal of the game is to step on the dance pad to the beat of the music. You can press any button on any beat. Try it now", "US English Female", {onstart: voiceStartCallback, onend: firstVoiceEndCallback});

  function voiceStartCallback(){
    console.log('voice started');
  }

  function firstVoiceEndCallback(){
    console.log('voice ended');
    loadSong();
    setTimeout(function(){
      game.song.stop();
      responsiveVoice.speak("Nice job! Every time you step to the beat you get ten points. You can rack up even more points by hitting combos! You can get them by hitting certain combinations of three buttons in a row without stepping to the wrong beat. Go ahead and try some now!", "US English Female", {onstart: voiceStartCallback, onend: secondVoiceEndCallback});
    }, 20000);
  }

  function secondVoiceEndCallback(){
    console.log("second voice callback");
    secondLoadSong();
    setTimeout(function(){
      game.song.pause();
      responsiveVoice.speak("Sweet moves! You're all set to play the game now", "US English Female");
    }, 20000);
  }
}

////////////////////          end tutorial              ///////////////////////

//start the game
$(document).ready(function(){
  var width = window.innerWidth * .75;
  var height = window.innerHeight;

  //initialize game object and start animation
  game = new Game(width, height);

  //need to do different things based on tutorial
  if(isTutorial){
    //start tutorial
    tutorial();
  }else{
    //start song
    loadSong();
  }
});

var onImageLoad = function(){
  console.log("loaded image");
};
