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
  Thumbnail,
  Body,
  Text,
  Card
} from "native-base";
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

export default class TweetsNearMeScreen extends React.Component {
  constructor() {
    super();
    this.state = { tweets: [] };
  }

  //later seperate this out to grab location as a seperate property
  //and then pre-set trends as an array on state first before handing it
  //or just [ ] when u pass it to state like {Trends:[data[0]]}
  componentWillMount() {
    const self = this;

    return axios
      .get(
        "https://api.twitter.com/1.1/search/tweets.json?geocode=40.7268,-73.9910,5mi",
        {
          headers: Header
        }
      )
      .then(function(res) {
        console.log(
          "data is--------------------",
          res.data.statuses[0].user.id_str
        );
        self.setState({ tweets: res.data.statuses });
      });
    // https://api.twitter.com/1.1/search/tweets.json
    // ?q=nasa&result_type=popular
    // /1.1/search/tweets.json?q=nasa&result_type=popular
    // specified by ” latitude,longitude,radius “,
    ///default count is 15
  }

  //add a force update thing
  //refresh button or gesture on scroll end or something
  //unclear if refreshing bc location change---so lets assume its just a time issue
  //maybe onpress= this.state.change or will recieved props etc
  //component will update

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
        <LinearGradient
          colors={["powderblue", "lightblue", "#90caf9"]}
          // colors={["powderblue", "lightblue", "#2196F3"]}
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
                  // color: "rgba(96,100,109, 1)",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                Tweets near me
              </Text>

              <List>
                {this.state.tweets
                  ? this.state.tweets.map(msg => (
                      // <ListItem avatar key={msg.id}>
                      <Card
                        key={msg.id}
                        style={{
                          padding: 20,
                          width: "85%",
                          alignSelf: "center"
                        }}
                      >
                        <Left>
                          <Thumbnail
                            source={{
                              uri: `${msg.user.profile_image_url}`
                            }}
                          />
                        </Left>
                        <Body>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "rgba(96,100,109, 1)",
                              textAlign: "center",
                              fontFamily: "abril"
                            }}
                          >
                            {msg.user.name}@{msg.user.screen_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "rgba(96,100,109, 1)",
                              textAlign: "center",
                              fontFamily: "oxygen"
                            }}
                          >
                            {msg.text}
                          </Text>
                        </Body>
                        <Right>
                          <Text note fontFamily="sedgwick">
                            {msg.created_at.slice(0, 16)}{" "}
                          </Text>
                        </Right>
                      </Card>
                    ))
                  : null}
              </List>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
