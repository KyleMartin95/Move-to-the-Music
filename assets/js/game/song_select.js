$(document).ready(function(){
  var audio = new Audio();

  function searchTracks(query) {
      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          data: {
              q: query,
              type: 'track'
          },
          success: function (response) {
              if (response.tracks.items.length) {
                  var track = response.tracks.items[0];
                  console.log(track);
                  audio.src = track.preview_url;
                  audio.play();
              }
          }
      });
  }

  function playSong(songName, artistName) {
      var query = songName;
      if (artistName) {
          query += ' artist:' + artistName;
      }

      searchTracks(query);
  }

  if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
          'stop': function () {
              audio.pause();
          },
          'play track *song': function (song) {
              playSong(song);
          },
          'play *song by *artist': function (song, artist) {
              playSong(song, artist);
          },
          'play song *song': function (song) {
              playSong(song);
          },
          'play *song': function (song) {
              console.log("play" + song);
              playSong(song);
          },

          ':nomatch': function (message) {
          }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
  }

  annyang.addCallback('error', function () {
    console.log('error');
  });
});
