// environment variables
require("dotenv").config();

// grab keys.js file
var keys = require("./keys.js");

// grab spotify keys
var spotify = new Spotify(keys.spotify);

// grab the axios package
var axios = require("axios");

// fs package
var fs = require("fs");

// what is the user trying to look for
var command1 = process.argv[2];

// specific search
var command2 = process.argv[3];

// if/else telling program what to run and when
if (command1 === "concert-this") {
  concertThis(command2);
} else if (command1 === "spotify-this-song") {
  spotifyThis(command2);
} else if (command1 === "movie-this") {
  movieThis(command2);
} else if (command1 === "do-what-it-says") {
  doWhatItSays();
}

function concertThis(command2) {
  // axios search for BANDSINTOWN
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {
      console.log(response.data);
      if (!response.data[0]) {
        console.log("No concerts found!");
      }
      else {
        for (var i = 0; i < response.data.length; i++) {
          console.log("-------------");
          console.log("The concert venue is: " + response.data[i].venue.name);
          // console.log("The location is: " + venue location);
          // console.log("The date is: " + date of event);
        };
      }
    }
  );
};


function movieThis(command2) {
// axios search for OMDB 
axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy")
  .then(function (response) {
    console.log("Title: " + response.data.Title);
    console.log("Release year: " + response.data.Year);
    console.log("IMDB: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Produced in: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Cast: " + response.data.Actors);
  });
};

function spotifyThis(command2){

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
   
  spotify.search({ type: 'track', query: command2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
}