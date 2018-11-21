var client = require("../twitterAPI");

client.get("favorites/list", function(error, tweets, response) {
  if (error) throw error;
  console.log(tweets); // The favorites.
  console.log(response); // Raw response object.
});
