var firebase = require("firebase");
const config = require("./secretsDb");

export const mobileApp = firebase.initializeApp(config);

export default firebase;
