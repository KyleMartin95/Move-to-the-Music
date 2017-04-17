/**
 * UserController
 *
 * @description :: Server-side logic for managing user info
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	users: function(request, response){
		UserService.getUsers(response, function(usersArray){
			return res.send(usersArray);
		});
	},

	findUser: function(request, response){
		userName = request.param('user_name');

		SongService.getOneSong(response, userName, function(user){
			return res.send(user)
		});
	}

	findSongUsers: function(request, response){
		songName = request.param('song_name');

		UserService.getSongUsers(response, userName, function(user){
			return res.send(user)
		});
	}

	findSongHighScore: function(request, response){

	}
};
