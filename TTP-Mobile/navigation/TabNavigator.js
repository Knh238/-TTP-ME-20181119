import React from "react";
import { Platform, TouchableHighlight } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  tabBarIcon
} from "react-navigation";
import { Avatar, Divider, Icon, Button } from "react-native-elements";

import HomeScreen from "../screens/HomeScreen";

export default createBottomTabNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabTitle: (
        <Icon
          size={55}
          name="twitter-square"
          type="font-awesome"
          color="#90CAF9"
          onPress={() => nav.navigate("Home")}
        />
      )
    }),
    tabBarOptions: {
      activeTintColor: "#1DA1F2",
      inactiveTintColor: "#1DA1F2"
    }
  }
);
