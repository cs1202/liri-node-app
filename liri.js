console.log('this is loaded');

//REQUIRES STORED IN VARIABLES s
var fs = require('fs');
var keys = require('./keys.js');
var twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');


var liriRequestedItem = "";


//FUNCTION FOR TWITTER

function mytweets() {

	var client = new twitter(keys.twitterKeys);
	var params = {screen_name: 'legiiteo', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			return console.log (error);
		}

		console.log('\n********************************************************************************');
		console.log('Screen Name: ' + tweets[0].user.screen_name, 
			'\nLocation: ' + tweets[0].user.location, 
			'\nDescription: ' + tweets[0].user.description);
		console.log('\n********************************************************************************');

		for (var i = 0; i < tweets.length; i++) {
			tweets[i];

			console.log('\n================================================================================');
			console.log('\nDate created: ' + tweets[i].created_at + '\nTweet: ' + tweets[i].text)			
		}

	});
}

// FUNCTION FOR SPOTIFY.	

 function spotThatFy(songName) {



 	var spotify = new Spotify(keys.spotifyKeys);
 	 

 	songName = songName || 'Ace of Base The Sign';


 	spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
 		if (err) {
 			return console.log('Error occurred: ' + err);
 		}
 		var artistName = data.tracks.items[0].artists[0].name;
 		var songName = data.tracks.items[0].name;
 		var previewLink = data.tracks.items[0].preview_url;
 		var albumName = data.tracks.items[0].album.name;

 		console.log('\n********************************************************************************');
 		console.log("bingooooooo")
 		console.log('Artist: ' + artistName,
 			'\nSong Name: ' + songName, 
 			'\nPreview Link: ' + previewLink, 
 			'\nAlbum Name: ' + albumName);
 		console.log('********************************************************************************');
 		
 	});

 }



// FUNCTION FOR MOVIES.
function movieInfo() {

	var movieName = process.argv[3] || "Mr. Nobody";
	var key = keys.omdbKeys.api_key;
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + key;

	request(queryUrl, function(error, response, body) {
		if(error) {
			return console.log(error);
		}
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body)
			var movieTitle = body.Title;
			var movieYear = body.Year;
			var imdbRating = body.Ratings[0].Value;
			var rottenTomatoesRating = body.Ratings[1].Value;
			var country = body.Country;
			var language = body.Language;
			var plot = body.Plot;
			var actors = body.Actors;

			console.log('********************************************************************************');
			console.log("If you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix! yayy")
			console.log('\nTitle: '+ movieTitle, 
				'\nYear: ' + movieYear, 
				'\nIMBD Rating: ' + imdbRating, 
				'\nRotten Tomatoes Rating: ' + rottenTomatoesRating, 
				'\nProduction Country: ' + country, 
				'\nMovie Language: ' + language, 
				'\nPlot: ' + plot, 
				'\nActors: ' + actors);
			console.log('********************************************************************************');
		}
	});
}	



//FUNCTION FOR DO WHAT IT SAYS
function doIt() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) { console.log(err);}

		else {
			var listItem = data.split(",")
			var index1 = listItem[1];
			console.log(index1);
			spotThatFy(index1);
		}
	});
}	




var action = process.argv[2];
console.log("write the commands as follows:'my-tweets' , 'spotify-this-song', 'movie-this do-what-it-says'")

switch (action) {
	case 'my-tweets':
	mytweets();
	break;

	case 'spotify-this-song':
	spotThatFy(process.argv[3]);
	break;

	case 'movie-this':
	movieInfo();
	break;

	case 'do-what-it-says':
	doIt();
	break;
};


















