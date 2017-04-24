module.exports = {

  createScore: function(songName, score, user, res, next){
    SongService.getOneSongBasedOnName(res, songName, function(songObject){
      var song = songObject;

      Score.create({score: score, user: user, song: song}).exec(function(err, score){
        if(err){
          console.log(err);
          return res.serverError(err);
        }
        if(!score){
          return res.serverError('Could create score, sorry.');
        }

        next(score);
      });
    });
  },
}
