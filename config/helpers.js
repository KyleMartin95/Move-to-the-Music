var Handlebars = require('handlebars');

Handlebars.registerHelper('getSong', function(song){
  return song;
});

module.exports = Handlebars.helpers;
