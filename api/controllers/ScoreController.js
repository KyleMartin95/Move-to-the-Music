/**
 * ScoreController
 *
 * @description :: Server-side logic for managing scores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(request, response){
		var songName = request.body.song;
		var score = request.body.score;
		var user = request.body.user;

		ScoreService.createScore(songName, score, user, response, function(score){
			return response.json(score);
		});
	}
};
