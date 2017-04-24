var requests = {
  updateScore: function(songName, user, score, next){
    console.log('searching with: ' + songName + user + score);
    $.ajax({
      url: '/scores',
      type: 'POST',
      data: {song: songName, score: score, user:user},
      dataType: 'text',
      success: function(scoreObject){
        scoreObject = JSON.parse(scoreObject);
        console.log(scoreObject);
        next(scoreObject);
      }
    });
  },

  getScores: function(songId, next){
    $.ajax({
      url: '/songs/' + songId,
      type: 'GET',
      dataType: 'text',
      success: function(songObject){
        var song = JSON.parse(songObject);
        var scores = song.scores;
        next(scores);
      },
      error: function(err){
        alert('There was an error, sorry');
        console.log(err);
      }
    });
  }
}
