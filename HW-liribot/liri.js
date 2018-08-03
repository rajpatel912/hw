require("dotenv").config();

//grab key.js file
var keys = require("./keys.js");
var Twitter = require('twitter');


//store in process arv
let userInput = process.argv[2];

//store api keys in variables

var client = new Twitter(keys.twitter);


//twitter api
let getTweets = function() {
    let params = {screen_name: 'bcsDeveloper'};

    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
        }
    }
    });
}

//spotify






if (userInput === "my-tweets") {
    getTweets();
//I think i have to put some info for spotify?
  }