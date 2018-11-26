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
  Body,
  Right,
  Thumbnail,
  Card,
  Text
} from "native-base";
import { Button, Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import AuthInfo from "../secrets";

export default class AuthorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  componentWillMount() {
    const self = this;
    const userScreenName = this.props.navigation.state.params.user.screen_name;
    console.log("user screen name", userScreenName);
    return axios
      .get(
        `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userScreenName}&count=10&trim_user`,
        {
          headers: AuthInfo
        }
      )
      .then(function(res) {
        self.setState({ tweets: res.data });
      });
  }

  render() {
    const nav = this.props.navigation;
    this.state ? console.log("theres state!") : null;
    const user = this.props.navigation.state.params.user;

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
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                About the author
              </Text>
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
              <Text
                style={{
                  fontSize: 20,

                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                {user.name}@{user.screen_name}
              </Text>

              <Text
                note
                fontFamily="sedgwick"
                style={{ alignSelf: "center", color: "white" }}
              >
                {user.location}
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 15,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "oxygen"
                }}
              >
                followers: {user.followers_count}
                {"\n"}
                following: {user.friends_count}
              </Text>

              {this.state.tweets
                ? this.state.tweets.map(msg => (
                    <Card
                      avatar
                      key={msg.id}
                      style={{ padding: 10, width: "90%", alignSelf: "center" }}
                    >
                      <Left>
                        <Thumbnail
                          source={{
                            uri: `${msg.user.profile_image_url}`
                          }}
                        />
                        <Text
                          note
                          style={{
                            fontSize: 10,
                            color: "rgba(96,100,109, 1)",
                            textAlign: "center",
                            fontFamily: "abril"
                          }}
                        >
                          {msg.created_at.slice(0, 16)}
                        </Text>
                      </Left>

                      <Right>
                        <Body>
                          <Text
                            style={{
                              paddingTop: 10,
                              paddingBottom: 10,
                              fontSize: 15,
                              color: "rgba(96,100,109, 1)",
                              textAlign: "center",
                              fontFamily: "oxygen"
                            }}
                          >
                            {msg.text}
                          </Text>
                        </Body>
                      </Right>
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
