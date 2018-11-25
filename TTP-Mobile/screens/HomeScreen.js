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
import { Icon } from "expo";
import { WebBrowser } from "expo";
import { LinearGradient } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const nav = this.props.navigation;
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
          // colors={["#90CAF9", "#2196F3", "#1976D2"]}
          // colors={["powderblue", "lightblue", "#2196F3"]}
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
          <View
            style={{
              alignItems: "center"
              // marginTop: 10,
              // marginBottom: 10
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                // color: "rgba(96,100,109, 1)",
                color: "black",
                textAlign: "center",
                fontFamily: "abril"
              }}
            >
              Kristin's Mobile App Build for TTP
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                // color: "rgba(96,100,109, 1)",
                textAlign: "center",
                fontFamily: "abril"
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
                // backgroundColor: "rgb(66, 194, 244)",
                backgroundColor: "white",
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: "center",
                width: "33%"
              }}
              center
              // Icon="arrowright"
              title="Login-in"
              textStyle={{ fontFamily: "abril", color: "rgb(66, 194, 244)" }}
              onPress={() => nav.navigate("Login")}
              // rightIcon="arrow"
            />
            <Button
              // icon={<Icon name="arrow-right" size={15} color="white" />}
              buttonStyle={{
                backgroundColor: "white",
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: "center",
                width: "33%",
                marginTop: 10
              }}
              center
              // Icon="arrowright"
              title="Sign-up"
              textStyle={{ fontFamily: "abril", color: "rgb(66, 194, 244)" }}
              onPress={() => nav.navigate("SignUp")}
              // rightIcon="arrow"
            />
          </View>
        </LinearGradient>
        {/* </ScrollView> */}
      </View>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync("http://www.buzzfeed.com");
  };
}
