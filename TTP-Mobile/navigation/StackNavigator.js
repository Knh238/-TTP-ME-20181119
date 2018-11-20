import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
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
          <Icon name="heartbeat" type="font-awesome" color="royalblue" />
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
