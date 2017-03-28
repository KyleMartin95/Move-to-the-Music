/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	render: function(request, response){
		return response.view('game/game', {css: ['../styles/game.css']});
	}
};
