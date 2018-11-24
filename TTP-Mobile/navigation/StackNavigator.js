import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import TrendingNearbyScreen from "../screens/TrendingNearby";
import TweetsNearMeScreen from "../screens/TweetsNearMe";
import LocationScreen from "../screens/Location";
//import Profile from "../screens/Profile";

const StackNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          // <Image
          //   source={require("../assets/images/heart.png")}
          //   style={{ width: 10, height: 10 }}
          // />
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
          // <Icon name="heartbeat" type="font-awesome" color="royalblue" />
        ),
        headerTintColor: "#000000",
        headerBackTitle: null,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ paddingHorizontal: 10 }}>
              <Icon name="menu" />
            </View>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Note")}>
            <View style={{ paddingHorizontal: 10 }}>
              <Icon name="add" />
            </View>
          </TouchableOpacity>
        )
      })
    },
    Home: {
      screen: HomeScreen
      // headerRight: null,
      // tabBarVisible: true
    },
    TrendingNearby: {
      screen: TrendingNearbyScreen
      // headerRight: null,
      // appBarVisible: true
    },
    TweetsNearMe: {
      screen: TweetsNearMeScreen
      // headerRight: null,
      // appBarVisible: true
    },
    Location: {
      screen: LocationScreen
      // headerRight: null,
      // appBarVisible: true
    }
    //   Profile: {
    //     screen: Profile
    //     // headerRight: null,
    //     appBarVisible: true
    //   },
  },

  {
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

export default StackNavigator;
