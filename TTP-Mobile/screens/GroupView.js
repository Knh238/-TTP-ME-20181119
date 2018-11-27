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

export default class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  componentWillMount() {
    const self = this;
    const group = this.props.navigation.state.params.group;
    return axios
      .get(
        `https://api.twitter.com/1.1/search/tweets.json?q=${group}&lang=en&count=15`,
        {
          headers: AuthInfo
        }
      )
      .then(function(res) {
        self.setState({ tweets: res.data.statuses });
      });
    scrollTo({ x: 0, y: 0 });
    //tryign to get it to jump back to the top of scroll view.
  }

  render() {
    const nav = this.props.navigation;
    this.state ? console.log("theres state!") : null;
    const hashtag = this.props.navigation.state.params.group;

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
                Tweets About
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
                  fontSize: 30,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                # {hashtag}
              </Text>
              <View style={{ marginBottom: 20 }}>
                <Button
                  buttonStyle={{
                    backgroundColor: "rgb(66, 194, 244)",
                    borderWidth: 0,
                    borderRadius: 30,
                    alignSelf: "center",
                    width: "60%",
                    marginTop: 10
                  }}
                  center
                  icon={{
                    name: "refresh",
                    type: "font-awesome",
                    color: "#1DA1F2"
                  }}
                  title="check for new posts"
                  textStyle={{ fontFamily: "abril", color: "white" }}
                  onPress={() => this.componentWillMount()}
                  //p.s. i know this is the wrong way to do this.
                  //I know there should be a component willupdate/etc
                  //that will send a modified request to the api
                  //that would look for posts since_id:
                  //which would mean i'd need to store the id of the last item in the array
                  //the response array that is currently on state
                  //and place that on a diff property in state
                  //then if the number of in a place on state and keep updating it
                />
              </View>
              {this.state.tweets
                ? this.state.tweets.map(msg => (
                    <Card
                      avatar
                      key={msg.id}
                      style={{ padding: 10, width: "90%", alignSelf: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          nav.navigate("AuthorInfo", { user: msg.user })
                        }
                      >
                        <Left>
                          <Thumbnail
                            source={{
                              uri: `${msg.user.profile_image_url}`
                            }}
                          />
                        </Left>
                      </TouchableOpacity>
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
                      <Right>
                        <Text note fontFamily="sedgwick">
                          {msg.created_at.slice(0, 16)}{" "}
                        </Text>
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
