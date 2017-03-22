/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	render: function (request, response) {
    return response.view('main/index', {css: ['../styles/index.css']});
  },

	about: function(request, response){
		return response.view('main/about', {css: ['../styles/about.css']});
	},

	play: function(request, response){
		return response.view('main/play', {css: ['../styles/play.css']});
	}

};
