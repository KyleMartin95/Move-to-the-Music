/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadGame: function(request, response){
		var songName = request.param('song_name');

		SongService.getOneSong(response, songName, function(song){
			return response.view('game/game', {css: ['game/game.css'], javascript: ['game/game.js', 'game/keyboard.js', 'game/gamepad.js'], songName: song.name, songBeats: song.beatMap});
		});
	}
};
