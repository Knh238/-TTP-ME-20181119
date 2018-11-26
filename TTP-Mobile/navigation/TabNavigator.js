import React from "react";
import { Platform, TouchableHighlight } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  tabBarIcon
} from "react-navigation";
import { Avatar, Divider, Icon, Button } from "react-native-elements";
// import TabBarIcon from "./tabBarIcon";
import HomeScreen from "../screens/HomeScreen";

export default createBottomTabNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabTitle: (
        <Icon
          //   reverse
          size={55}
          name="twitter-square"
          type="font-awesome"
          color="#90CAF9"
          onPress={() => nav.navigate("Home")}
        />
      )
      // tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // const { routeName } = navigation.state;
      // let iconName;
      // if (routeName === "Home") {
      //   iconName = `ios-information-circle${focused ? "" : "-outline"}`;
      // } else if (routeName === "Settings") {
      //   iconName = `ios-options${focused ? "" : "-outline"}`;
      // }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      //   return (
      //     <Icon
      //       //   reverse
      //       size={55}
      //       name="twitter-square"
      //       type="font-awesome"
      //       color="#90CAF9"
      //       onPress={() => nav.navigate("Home")}
      //     />
      //   );
      // }
    }),
    tabBarOptions: {
      activeTintColor: "#1DA1F2",
      inactiveTintColor: "#1DA1F2"
    }
  }
);
