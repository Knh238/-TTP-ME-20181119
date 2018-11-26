import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import TrendingNearbyScreen from "../screens/TrendingNearby";
import TweetsNearMeScreen from "../screens/TweetsNearMe";
import LocationScreen from "../screens/Location";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import CreateGroup from "../screens/CreateGroup";
import GroupView from "../screens/GroupView";
import SettingsScreen from "../screens/Settings";
import AuthorInfo from "../screens/AuthorInfo";

const StackNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
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
        ),
        headerTintColor: "#000000",
        headerBackTitle: null,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ paddingHorizontal: 10 }}>
              <Icon name="menu" />
            </View>
          </TouchableOpacity>
        )
      })
    },
    Home: {
      screen: HomeScreen
    },
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    TrendingNearby: {
      screen: TrendingNearbyScreen
    },
    TweetsNearMe: {
      screen: TweetsNearMeScreen
    },
    Location: {
      screen: LocationScreen
    },
    CreateGroup: {
      screen: CreateGroup
    },
    GroupView: {
      screen: GroupView
    },
    AuthorInfo: {
      screen: AuthorInfo
    },
    Settings: {
      screen: SettingsScreen
    }
  },

  {
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

export default StackNavigator;
