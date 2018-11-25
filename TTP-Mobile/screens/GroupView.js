//a  group  that  only  displays  tweets  containing  thehashtag
// specified  by  the  group  name
// in  order  to  filter  tweets  by  topics  I'minterested  in.

//must be able to delte too.
// maybe delete button could be on single page display
//or it could be in settings.
//probably setting si better
//add note on single group view anyway
// tired of this topic? delete this group from your seetings page

//do basically a twitter search by hashtag

import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { Button, Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import Header from "../secrets";

// static navigationOptions = {
//   header: null
// };

export default class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  //later seperate this out to grab location as a seperate property
  //and then pre-set trends as an array on state first before handing it
  //or just [ ] when u pass it to state like {Trends:[data[0]]}
  componentWillMount() {
    const self = this;
    const group = this.props.navigation.state.params.group;

    return axios
      .get(
        `https://api.twitter.com/1.1/search/tweets.json?q=${group}&lang=en`,
        {
          headers: Header
        }
      )
      .then(function(res) {
        console.log("data is--------------------", res.data.statuses);
        // console.log(
        //   "data is--------------------",
        //   res.data.statuses[0].user.id_str
        // );
        self.setState({ tweets: res.data.statuses });
      });
  }

  //add a force update thing
  //refresh button or gesture on scroll end or something
  //unclear if refreshing bc location change---so lets assume its just a time issue
  //maybe onpress= this.state.change or will recieved props etc
  //component will update

  render() {
    this.state ? console.log("theres state!") : null;
    const hashtag = this.props.navigation.state.params.group;
    console.log("this props in the redner of group view----------", hashtag);
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
          // colors={["#90CAF9", "#2196F3", "#1976D2"]}
          // colors={["powderblue", "lightblue", "#64b5f6"]}
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
            {/* <View
              style={{
                alignItems: "center"
                // marginTop: 10,
                // marginBottom: 10
              }}
            > */}
            {/* <Image
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
            </View> */}
            <View>
              <Text
                style={{
                  fontSize: 25,
                  //color: "rgba(96,100,109, 1)",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                Popular Tweets About
              </Text>
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
              <Text
                style={{
                  fontSize: 30,
                  //color: "rgba(96,100,109, 1)",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                # {hashtag}
              </Text>
              <List>
                {this.state.tweets
                  ? this.state.tweets.map(msg => (
                      <ListItem avatar key={msg.id}>
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
                      </ListItem>
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

/* <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `${this.state.tweets[0].user.profile_image_url}`
                        }}
                      />
                    </Left>
                    <Body>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "rgba(96,100,109, 1)",
                          textAlign: "center",
                          fontFamily: "oxygen"
                        }}
                      >
                        {this.state.tweets[0].user.name}@
                        {this.state.tweets[0].user.screen_name}
                        {"\n"}
                        {this.state.tweets[0].created_at.slice(0, 19)}
                        {"\n"}
                        {this.state.tweets[0].text}
                        {"\n"}
                      </Text>
                    </Body>
                    <Right>
                      <Text note>
                        {this.state.tweets[0].created_at.slice(0, 19)}{" "}
                      </Text>
                    </Right>
                  </ListItem> */
