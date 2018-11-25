var firebase = require("firebase");
const config = require("./secrets");

firebase.initializeApp(config);

export default firebase;
