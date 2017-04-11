var audio = new Audio();

$(document).ready(function(){
  responsiveVoice.speak("Please choose a song you want to dance to. You can hover over a song to hear a clip of it.", "US English Female");

  $('.list-group-item').hoverIntent(function(){
    $(this).stop(true)
    var query = $(this).attr('id');
    console.log(query);
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {
            if (response.tracks.items.length) {
                var track = response.tracks.items[0];
                audio.src = track.preview_url;
                audio.play();
            }
        }
    });
  }, function(){
    audio.pause();
  });

  if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
          'stop': function () {
              audio.pause();
              responsiveVoice.speak("Pausing Audio", "US English Female");
          },
          'play track *song': function (song) {
              playSong(song);
              responsiveVoice.speak("Playing " + song, "US English Female");

          },
          'play *song by *artist': function (song, artist) {
              playSong(song, artist);
              responsiveVoice.speak("Playing " + song + " by " + artist, "US English Female");
          },
          'play song *song': function (song) {
              playSong(song);
              responsiveVoice.speak("Playing " + song, "US English Female");
          },
          'play *song': function (song) {
              console.log("play" + song);
              responsiveVoice.speak("Playing " + song, "US English Female");
              playSong(song);
          },

          ':nomatch': function (message) {
            responsiveVoice.speak("Invalid Commnand", "US English Female");
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

function trackInfo(trackID){
  $.ajax({
      url: 'https://api.spotify.com/v1/audio-analysis/' + trackID,

      success: function (response) {
          if (response.tracks.items.length) {
              var track = response.tracks.items[0];
              console.log(track);
              var id = track.id;
              getInfo(track.id);
          }
      }
  });
}

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
                var id = track.id;
                trackInfo(track.id);
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
