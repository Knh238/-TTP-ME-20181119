var Twitter = require("twitter");
var config = require("./secrets");
var client = new Twitter(config);

export default client;

// export const mobileApp = firebase.initializeApp(config);

// require_once('TwitterAPIExchange.php');
// // var config = require("./secret");
// /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
// $settings = array(
//     'oauth_access_token':"YOUR_OAUTH_ACCESS_TOKEN",
//     'oauth_access_token_secret':"YOUR_OAUTH_ACCESS_TOKEN_SECRET",
//     'consumer_key':"YOUR_CONSUMER_KEY",
//     'consumer_secret': "YOUR_CONSUMER_SECRET"
// );

// var firebase = require("firebase");
// var config = require("./secret");

// export const mobileApp = firebase.initializeApp(config);

// export default firebase;
