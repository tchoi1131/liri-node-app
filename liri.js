require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

if(process.argv[2] === "concert-this"){
    var bandsInTownApiUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";

}

if(process.argv[2] === "spotify-this-song"){

}

if(process.argv[2] === "movie-this"){
    var omdbApiUrl = "http://www.omdbapi.com/?apikey=c37102c&";

}

if(process.argv[2] === "do-what-it-says"){
    
}