var Handlebars = require('handlebars');

Handlebars.registerHelper('getSong', function(songName){
  return songName
});

module.exports = Handlebars.helpers;
