var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var moment = require("moment");
require('dotenv').config();

var keys = require('./keys.js');

// grab spotify keys
var spotify = new Spotify(keys.spotify);

// what is the user trying to look for
var command1 = process.argv[2];
var command2 = process.argv.slice(3).join(" ");
var artist;
var song;
var movie;

// if/else telling program what to run and when
if (command1 === 'concert-this') {
  concertThis(command2);
  artist = command2;
} else if (command1 === 'spotify-this-song') {
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

      if (!response.data[0]) {
        console.log('No concerts found!');
      } else {
        for (var i = 0; i < 5; i++) {
          console.log('------------------------');
          console.log('The concert venue is: ' + response.data[i].venue.name);
          console.log("The location is: " + response.data[i].venue.city);
          console.log("The date is: " + moment(response.data[i].datetime).format("MMM Do YY"));
          console.log('------------------------');
        }
      }
    });
}

function spotifyThis(song) {
  if (song == "") {
    song = "The Sign Ace of Base";
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
        console.log('------------------------');
        console.log("Artist(s): " + songs[i].album.artists[0].name);  
        console.log('Song name: ' + songs[i].name);
        console.log('Preview: ' + songs[i].preview_url);
        console.log('Album: ' + songs[i].album.name);
        console.log('------------------------');
      }
    }
  );
}
// };


function movieThis(movie) {
  if (movie == "") {
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

      // I tried to append the file to log.txt but could not figure it out

      // var data = response.data;

      // var moviee = [
      //   'Title: ' + data.Title,
      //   'Release year: ' + data.Year,
      //   'IMDB: ' + data.imdbRating,
      //   'Produced in: ' + data.Country,
      //   'Language: ' + data.Language,
      //   'Plot: ' + data.Plot,
      //   'Cast: ' + data.Actors,
      // ]

      console.log('------------------------');
      console.log('Title: ' + response.data.Title);
      console.log('Release year: ' + response.data.Year);
      console.log('IMDB: ' + response.data.imdbRating);
      console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
      console.log('Produced in: ' + response.data.Country);
      console.log('Language: ' + response.data.Language);
      console.log('Plot: ' + response.data.Plot);
      console.log('Cast: ' + response.data.Actors);
      console.log('------------------------');
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable) in one array
    var dataArr = data.split(",");

    command1 = dataArr[0];
    command2 = dataArr[1];

    if (command1 === "concert-this") {
      concertThis(command2);
    } else if (command1 === "spotify-this-song") {
      spotifyThis(command2);
    } else if (command1 === "movie-this") {
      movieThis(command2);
    }
  })
}

// fs.appendFile("log.txt", moviee, function(err) {
//   if (err) throw err;
//   // console.log(showData);
// });