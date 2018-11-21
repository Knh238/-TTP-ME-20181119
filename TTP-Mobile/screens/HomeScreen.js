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
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Icon } from "expo";

import { WebBrowser } from "expo";
import { LinearGradient } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={{
          //   flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <ScrollView
        //   style={{
        //     flex: 1,
        //     backgroundColor: "#fff"
        //   }}
        //   contentContainerStyle={{
        //     padding: 10
        //   }}
        >
          <LinearGradient
            // colors={["#90CAF9", "#2196F3", "#1976D2"]}
            colors={["powderblue", "lightblue", "#2196F3"]}
            fill
            style={{ marginBottom: 2 }}
          >
            <View
              style={{
                alignItems: "center"
                // marginTop: 10,
                // marginBottom: 10
              }}
            >
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
            /> */}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "playfair"
                }}
              >
                Kristin's Mobile App Build for TTP
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(96,100,109, 1)",
                  textAlign: "center",
                  fontFamily: "playfair"
                }}
              >
                ps I also did a fullstack app...
              </Text>
              <LottieView
                source={require("../assets/images/twitter_icon.json")}
                autoPlay
                loop
                style={{
                  alignContent: "center",
                  position: "relative"
                }}
              />

              <Button
                // icon={<Icon name="arrow-right" size={15} color="white" />}
                buttonStyle={{
                  backgroundColor: "rgb(66, 194, 244)",
                  borderWidth: 0,
                  borderRadius: 30,
                  alignSelf: "center",
                  width: "33%"
                }}
                center
                // Icon="arrowright"
                title="Login-in"
                textStyle={{ fontFamily: "playfair" }}
                // rightIcon="arrow"
              />

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync("http://www.buzzfeed.com");
  };
}
