/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	start: function(request, response){
		return response.view('game/start', {css: ['game/start.css']})
	},

	songs: function(request, response){
		SongService.getSongs(response, function(songsArray){
			return response.view('game/song_select', {css: ['game/song_select.css'], javascript: ['/game/song_select.js'],songs: songsArray});
		});
	},

	loadGame: function(request, response){
		songName = request.param('song_name');

		SongService.getOneSong(response, songName, function(song){
			return response.view('game/game', {css: ['game/game.css'], javascript: ['game/load.js', 'game/logic.js', 'game/gamepad.js'], songName: song.name, songBeats: song.beatMap});
		});
	}
};
