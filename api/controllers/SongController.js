/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(request, response){
		SongService.getSongs(response, function(songsArray){
			return response.view('game/song_select', {css: ['game/song_select.css'], javascript: ['/game/song_select.js'],songs: songsArray});
		});
	},

	show: function(request, response){
		var id = request.param('id');

		SongService.getOneSongBasedOnId(response, id, function(song){
			return response.json(song);
		});
	},

	update: function(request, response){
		var songName = request.body.song;
		var attributeToEdit = request.body.attribute;
		var newValue = request.body.newValue;

		SongService.editSong(songName, attributeToEdit, response, function(song){
			return response.json(song);
		});
	}
};
