/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	loadTutorial: function(request, response){
		SongService.getOneSongBasedOnName(response, "Aint No Man", function(song){
			return response.view('game/game', {css: ['game/game.css'], javascript: ['game/game.js', 'game/keyboard.js', 'game/gamepad.js', 'game/requests.js'], songName: song.name, songBeats: song.beatMap, tutorial});
		});
	},


	loadGame: function(request, response){
		var songName = request.param('song_name');

		SongService.getOneSongBasedOnName(response, songName, function(song){
			return response.view('game/game', {css: ['game/game.css'], javascript: ['game/game.js', 'game/keyboard.js', 'game/gamepad.js', 'game/requests.js'], songName: song.name, songBeats: song.beatMap});
		});
	}
};
