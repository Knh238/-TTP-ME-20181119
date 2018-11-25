import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";

export default class LocationScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    long: null,
    lat: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = JSON.stringify(location.coords.latitude);
    let long = JSON.stringify(location.coords.longitude);
    // location.long = response.coords.longitude;
    // location.lat = response.coords.latitude;

    // this.setState({ location: {lat:location.coords.latitude;, long:location.coords.longitude });
    this.setState({ lat });
    this.setState({ long });
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.lat) {
      text = `${this.state.lat}, ${this.state.long}`;
      //   JSON.stringify(
      //     this.state.location.coords.latitude,
      //     this.state.location.coords.latitude
      //   );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}> My current location is:</Text>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});

//https://api.twitter.com/1.1/trends/closest.json
//gets only one obj

///https://api.twitter.com/1.1/trends/place.json

//note: this should eventaully be loaded with app or home page. so u can pass it down as props. then call it elsewhere.
// https://api.twitter.com/1.1/search/tweets.json
// ?q=nasa&result_type=popular
// /1.1/search/tweets.json?q=nasa&result_type=popular
// specified by ” latitude,longitude,radius “,
// ///default count is 15
