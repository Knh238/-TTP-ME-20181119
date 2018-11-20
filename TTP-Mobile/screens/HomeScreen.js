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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
          contentContainerStyle={{
            paddingTop: 20
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Image
              source={
                __DEV__
                  ? require("../assets/images/twitter.png")
                  : require("../assets/images/twitter.png")
              }
              style={{
                width: 100,
                height: 80,
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
            />
            <Text
              style={{
                marginTop: 30,
                fontSize: 18,
                color: "royalblue",
                textAlign: "center",
                fontFamily: "playfair"
              }}
            >
              {"\n"}
              {"\n"}
              stuff
              {"\n"}
            </Text>
            <Button
              // icon={<Icon name="arrow-right" size={15} color="white" />}
              buttonStyle={{
                backgroundColor: "rgb(66, 194, 244)",
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: "center",
                width: "55%"
              }}
              center
              // Icon="arrowright"
              title="How to use this app"
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
            <Text
              style={{
                fontSize: 15,
                color: "#D500F9",
                textAlign: "center"
              }}
            >
              (by the way their website sucks)
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync("http://www.buzzfeed.com");
  };
}
