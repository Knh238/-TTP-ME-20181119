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

// static navigationOptions = {
//   header: null
// };

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
  }

  render() {
    const nav = this.props.navigation;
    this.state ? console.log("theres state!") : null;
    const hashtag = this.props.navigation.state.params.group;
    // console.log(
    //   "this props in the redner of group view----------",
    //   this.state.tweets[0]
    // );
    // console.log("this props in the redner of group view----------", hashtag);
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
                Popular Tweets About
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

              <Button
                buttonStyle={{
                  backgroundColor: "white",
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
                textStyle={{ fontFamily: "abril", color: "rgb(66, 194, 244)" }}
                onPress={() => this.componentWillMount()}
              />
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
                            //onPress={() => nav.navigate("AuthorInfo")}
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
              {/* <Button
                buttonStyle={{
                  backgroundColor: "white",
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
                // Icon="arrowright"
                title="check for new posts"
                textStyle={{ fontFamily: "abril", color: "rgb(66, 194, 244)" }}
                // onPress={() => this.forceUpdate()}
                onPress={() => this.componentWillMount()}
              /> */}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
