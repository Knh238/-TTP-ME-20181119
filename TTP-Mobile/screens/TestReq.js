var client = require("../twitterAPI");

// client.get("favorites/list", function(error, tweets, response) {
//   if (error) throw error;
//   console.log(tweets); // The favorites.
//   console.log(response); // Raw response object.
// });

var stream = client.stream("statuses/filter", { track: "javascript" });
stream.on("data", function(event) {
  console.log(event && event.text);
});

stream.on("error", function(error) {
  throw error;
});

// You can also get the stream in a callback if you prefer.
client.stream("statuses/filter", { track: "javascript" }, function(stream) {
  stream.on("data", function(event) {
    console.log(event && event.text);
  });

  stream.on("error", function(error) {
    throw error;
  });
});
