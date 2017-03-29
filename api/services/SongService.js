module.exports = {

  getSongs: function(res, next){
    Song.find().exec(function(err, songs){
      if(err){
        console.log(err)
        return res.serverError(err)
      }
      if(!songs){
        return res.notFound('Could not find songs, sorry.')
      }

      next(songs)
    })
  },

  getOneSong: function(res, songName, next){
    Song.findOne({name: songName}).exec(function (err, song){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!song) {
		    return res.notFound('Could not find that song, sorry.');
		  }

      next(song)
		});
  }

}
