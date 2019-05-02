# liri-node-app


## Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. In this case, LIRI will tell the user concerts, spotify songs, and movies.

## Requirements 
* Node installation
* These NPM packages:
  * Require
  * Node-spotify-api
  * FS
  * Moment
  * Dotenv
  * Axios
  * Bandsintown
  * OMDB
* Your own personal spotify API key and secret

## Installation

## Usage
Liri can be used with the commands "concert-this", "spotify-this", or "movie-this". By typing in the command then specifically what you are looking for, Liri will print your desired information. For example, if you were looking for information about the movie Jaws, you would type "Node liri.js movie-this jaws" into the terminal.

If not information is provided, the defualt song is "The Sign" and default movie is "Mr. Nobody."