var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
require('dotenv').config();

var keys = require('./keys.js');

// grab spotify keys
var spotify = new Spotify(keys.spotify);

// what is the user trying to look for
var command1 = process.argv[2];
var command2 = process.argv[3];

console.log(command1, command2);

var artist;
var song;
var movie;

// if/else telling program what to run and when
if (command1 === 'concert-this') {
  concertThis(command2);
  artist = command2;
} else if (command1 === 'spotify-this') {
  spotifyThis(command2);
  song = command2;
} else if (command1 === 'movie-this') {
  movieThis(command2);
  movie = command2;
} else if (command1 === 'do-what-it-says') {
  doWhatItSays();
}

function concertThis(artist) {
  // axios search for BANDSINTOWN
  axios
    .get(
      'https://rest.bandsintown.com/artists/' +
      artist +
      '/events?app_id=codingbootcamp'
    )
    .then(function (response) {
      console.log(response.data);
      if (!response.data[0]) {
        console.log('No concerts found!');
      } else {
        for (var i = 0; i < response.data.length; i++) {
          console.log('-------------');
          console.log('The concert venue is: ' + response.data[i].venue.name);
          // console.log("The location is: " + venue location);
          // console.log("The date is: " + date of event);
        }
      }
    });
}

function spotifyThis(song) {
  if (song === undefined) {
    song = "The sign";
  }
  // else {
    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });

    spotify.search(
      {
        type: 'track',
        query: song
      },
      function (err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }

        var songs = data.tracks.items;

        for (var i = 0; i < 5; i++) {
          console.log('Song name: ' + songs[i].name);
          console.log('Preview: ' + songs[i].preview_url);
          console.log('Album: ' + songs[i].album.name);
          console.log('-----------------------------------');
        }
      }
    );
  }
// };

function movieThis(movie) {
  if (movie === undefined) {
    movie = "Mr. Nobody";
  }
  // axios search for OMDB
  axios
    .get(
      'http://www.omdbapi.com/?t=' +
      movie +
      '&y=&plot=full&tomatoes=true&apikey=trilogy'
    )
    .then(function (response) {
      console.log('Title: ' + response.data.Title);
      console.log('Release year: ' + response.data.Year);
      console.log('IMDB: ' + response.data.imdbRating);
      // console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
      console.log('Produced in: ' + response.data.Country);
      console.log('Language: ' + response.data.Language);
      console.log('Plot: ' + response.data.Plot);
      console.log('Cast: ' + response.data.Actors);
    });
}