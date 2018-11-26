import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  List,
  ListItem,
  Left,
  Right,
  Badge,
  Card,
  Thumbnail,
  Body,
  Text
} from "native-base";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import { Icon } from "expo";
import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import AuthInfo from "../secrets";

export default class TrendingNearbyScreen extends React.Component {
  constructor() {
    super();
    this.state = { tweets: [], woeid: null };
  }
  componentWillMount() {
    const self = this;
    const woeid = this.props.navigation.state.params.woeid.woeid;
    return axios
      .get(`https://api.twitter.com/1.1/trends/place.json?id=${woeid}`, {
        headers: AuthInfo
      })
      .then(function(res) {
        self.setState({ tweets: res.data[0].trends });
      });
  }

  render() {
    const location = this.props.navigation.state.params.woeid;
    this.state ? console.log("theres state!") : null;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <LinearGradient
          colors={["powderblue", "lightblue", "#90caf9"]}
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
                  fontFamily: "abril",
                  padding: 10
                }}
              >
                Trending in:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "abril",
                  padding: 10
                }}
              >
                {location.name}, {location.country}
              </Text>

              {this.state.tweets
                ? this.state.tweets.map(msg => (
                    <Card
                      key={msg.name}
                      style={{ padding: 20, width: "85%", alignSelf: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          color: "rgba(96,100,109, 1)",
                          textAlign: "center",
                          fontFamily: "abril"
                        }}
                      >
                        {msg.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "rgba(96,100,109, 1)",
                          textAlign: "center",
                          fontFamily: "oxygen"
                        }}
                      >
                        # of tweets about this: {msg.tweet_volume}
                      </Text>
                    </Card>
                  ))
                : null}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
