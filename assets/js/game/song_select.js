var audio = new Audio();

$(document).ready(function(){
  $('.list-group-item a').each(function() {
    $(this).click(function(e){
      e.preventDefault();
      var diff = $('#difficulty :selected').text();
      var songName = $(this).attr('id');
      console.log(diff);
      window.location.href = '/game/play/'+songName+'/'+diff;
      });
    });

  function linkClickEvent(e) {
    e.preventDefault();
    var diff = $('#difficulty :selected').text();
    var songName = e.target.ID;
    console.log(diff);
    window.location.href = '/game/play/'+songName+'/'+diff;
  }

  $('.song-link').hoverIntent(function(){
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

  $('.song-link').on('focus', function(){
    $(this).stop(true);
    var query = $(this).attr('id');
    setTimeout(function(){
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
    }, 600);
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
