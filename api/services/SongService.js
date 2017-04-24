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

  getOneSongBasedOnName: function(res, songName, next){
    Song.findOne({name: songName}).populate('scores').exec(function (err, song){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!song) {
		    return res.notFound('Could not find that song, sorry.');
		  }

      next(song)
		});
  },

  getOneSongBasedOnId: function(res, id, next){
    Song.findOne({id: id}).populate('scores').exec(function (err, song){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!song) {
		    return res.notFound('Could not find that song, sorry.');
		  }

      next(song)
		});
  },

  editSong: function(songName, attributeToEdit, newValue, res, next){
    Song.update({name: songName}, {attributeToEdit: newValue}).exec(function(err, song){
      if(err){
        return res.serverError(err);
      }
      if(!song){
        res.serverError('There was an issue updating this item, sorry.');
      }

      next(song);
    });
  }
}
