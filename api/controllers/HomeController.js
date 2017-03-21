/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	render: function (request, response) {
    return response.view('main/index'/*, {css: ['../styles/index.css']}*/);
  }

};
