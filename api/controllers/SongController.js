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

	update: function(request, response){
		var songName = request.param('song_name');
		var attributeToEdit = request.param('attribute');
		var newValue = request.param('new_value');

		SongService.editSong(songName, attributeToEdit, response, function(song){
			return response.json(song);
		});
	}
};
