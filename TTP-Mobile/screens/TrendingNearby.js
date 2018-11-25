import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { List, ListItem, Left, Right, Badge } from "native-base";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Icon } from "expo";

import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import Header from "../secrets";

// static navigationOptions = {
//   header: null
// };

export default class TrendingNearbyScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  //later seperate this out to grab location as a seperate property
  //and then pre-set trends as an array on state first before handing it
  //or just [ ] when u pass it to state like {Trends:[data[0]]}
  componentWillMount() {
    const self = this;
    return axios
      .get("https://api.twitter.com/1.1/trends/place.json?id=2459115", {
        headers: Header
      })
      .then(function(res) {
        console.log("data is", res.data[0].trends);
        self.setState(res.data[0].trends);
      });
    // return axios
    //   .get(
    //     "https://api.twitter.com/1.1/search/tweets.json?geocode=40.7268,-73.9910,5mi",
    //     {
    //       headers: Header
    //     }
    //   )
    //   .then(function(res) {
    //     console.log(
    //       "data is--------------------",
    //       res.data.statuses[0].user.id_str
    //     );
    //     self.setState(res.data.statuses);
    //   });
    // https://api.twitter.com/1.1/search/tweets.json
    // ?q=nasa&result_type=popular
    // /1.1/search/tweets.json?q=nasa&result_type=popular
    // specified by ” latitude,longitude,radius “,
    ///default count is 15
  }

  render() {
    this.state ? console.log("theres state!") : null;
    return (
      <View
        style={{
          //   flexDirection: "column",
          //   padding: 20,
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        {/* <ScrollView
        //   style={{
        //     flex: 1,
        //     backgroundColor: "#fff"
        //   }}
        //   contentContainerStyle={{
        //     padding: 10
        //   }}
        > */}
        <LinearGradient
          colors={["powderblue", "lightblue", "#90caf9"]}
          //colors={["powderblue", "lightblue", "#2196F3"]}

          fill
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%"
          }}
        >
          <ScrollView>
            <View
              style={{
                alignItems: "center"
                // marginTop: 10,
                // marginBottom: 10
              }}
            >
              <Image
                source={
                  __DEV__
                    ? require("../assets/images/twitter.png")
                    : require("../assets/images/twitter.png")
                }
                style={{
                  width: 80,
                  height: 60,
                  resizeMode: "contain",
                  marginTop: 3,
                  marginLeft: -10
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                Kristin's Mobile App Build for TTP
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                ps I also did a fullstack app...
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "oxygen"
                }}
              >
                trending info @ location
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "oxygen"
                }}
              >
                on -moment js today display
              </Text>
              {/*     
              {this.state[0]
                ? this.state.map(topic => (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(96,100,109, 1)",
                        textAlign: "center",
                        fontFamily: "playfair"
                      }}
                    >
                      {topic.name}
                    </Text>
                  ))
                : null} */}

              {this.state[0] ? (
                <List>
                  <ListItem>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "rgba(96,100,109, 1)",
                        textAlign: "center",
                        fontFamily: "oxygen"
                      }}
                    >
                      1. {this.state[0].name}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "rgba(96,100,109, 1)",
                        textAlign: "center",
                        fontFamily: "oxygen"
                      }}
                    >
                      2.{this.state[1].name}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "rgba(96,100,109, 1)",
                        textAlign: "center",
                        fontFamily: "oxygen"
                      }}
                    >
                      3. {this.state[2].name}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "rgba(96,100,109, 1)",
                        textAlign: "center",
                        fontFamily: "oxygen"
                      }}
                    >
                      4. {this.state[3].name}
                    </Text>
                  </ListItem>
                </List>
              ) : null}

              {/* <LottieView
                source={require("../assets/images/twitter_icon.json")}
                autoPlay
                loop
                style={{
                  alignContent: "center",
                  position: "relative"
                }}
              /> */}

              {/* <TouchableOpacity
                onPress={this._handleHelpPress}
                style={{
                  paddingVertical: 15
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1565C0",
                    textAlign: "center"
                    // fontFamily: "playfairBold"
                  }}
                >
                  buzzfeed
                </Text>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </LinearGradient>
        {/* </ScrollView> */}
      </View>
    );
  }
}

// var client = require("../twitterAPI");

// // client.get("favorites/list", function(error, tweets, response) {
// //   if (error) throw error;
// //   console.log(tweets); // The favorites.
// //   console.log(response); // Raw response object.
// // });

// var stream = client.stream("statuses/filter", { track: "javascript" });
// stream.on("data", function(event) {
//   console.log(event && event.text);
// });

// stream.on("error", function(error) {
//   throw error;
// });

// // You can also get the stream in a callback if you prefer.
// client.stream("statuses/filter", { track: "javascript" }, function(stream) {
//   stream.on("data", function(event) {
//     console.log(event && event.text);
//   });

//   stream.on("error", function(error) {
//     throw error;
//   });
// })
