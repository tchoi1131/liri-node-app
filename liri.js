require("dotenv").config();
var fs = require('fs');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

processCommand(process.argv[2],process.argv[3]);

function processCommand(command, param1){
    if(command === "concert-this"){
    // We then run the request with axios module on a URL with a JSON
    axios.get("https://rest.bandsintown.com/artists/" + param1 + "/events?app_id=codingbootcamp").then(
      function(response) {
        //console.log(response.data);
        // Then we print out the details
        response.data.forEach(element => {
          var venue = element.venue;
          console.log("Name of the venue: " + venue.name +"\n"+
            "Venue location: "+ venue.city + ", " + venue.region +", " + venue.country +"\n"+
            "Date of the Event: " + moment(element.datetime).format("MM/DD/YYYY") + "\n"+
            "\n"
          );
        });
        
      }
    );
  }

  if(command === "spotify-this-song"){
    spotify
      .search({ type: "track", query: param1, limit: 1})
      .then(function(response) {
        //console.log(response.tracks.items[0]);
        if(response.tracks.items.length > 0){
          var song = response.tracks.items[0];
          console.log("Artist(s): " + song.artists[0].name + "\n" +
            "Song name: " + song.name + "\n" +
            "Preview: " + song.external_urls.spotify+ "\n" +
            "Album: " + song.album.name + "\n" +
            "\n"
          );
        }
        else{
          processCommand(command, "The Sign");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  if(command === "movie-this"){
    // We then run the request with axios module on a URL with a JSON
    axios
      .get("http://www.omdbapi.com/?t=" + param1 + "&y=&plot=short&apikey=trilogy")
      .then(
        function(response) {
          // Then we print out the imdbRating
          console.log(response.data);
          if(response.data.Response === "True"){
            var rottenRating = "";
            response.data.Ratings.forEach(element => {
              if(element.Source === "Rotten Tomatoes"){
                rottenRating = element.Value;
              }
            });
            console.log("Title: " + response.data.Title + "\n" +
              "Year: " + response.data.Year + "\n" +
              "IMDB Rating: " + response.data.imdbRating + "\n" +
              "Rotten Tomatoes Rating: " + rottenRating + "\n" +
              "Country: " + response.data.Country + "\n" +
              "Language: " + response.data.Language + "\n" +
              "Plot: " + response.data.Plot + "\n" +
              "Actors: " + response.data.Actors + "\n" +
              "\n"
            );
          }
          else{
            processCommand(command,"Mr. Nobody");
          }
        }
      );
  }

  if(command === "do-what-it-says"){
    fs.readFile('./random.txt', "utf8", function read(err, data) {
      if (err) {
          throw err;
      }
      //console.log(data.split(",")[0]);
      var params = data.split(",");
      processCommand(params[0],params[1]);
  });
  }
}