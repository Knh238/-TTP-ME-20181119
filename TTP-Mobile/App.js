import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { createSwitchNavigator } from "react-navigation";
import DrawerNavigator from "./navigation/DrawerNavigator";
// import HomeScreen from "./screens/HomeScreen";
// import TabNavigator from "./navigation/TabNavigator";
// importStackNavigator from "./navigation/StackNavigator";
// import Signup from './screens/SignUp';

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          exp
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return <DrawerNavigator />;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/twitter.png")]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "permanent-marker": require("./assets/fonts/PermanentMarker-Regular.ttf"),
        Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
        playfair: require("./assets/fonts/PlayfairDisplay-Regular.ttf")
        // poppins: require("./assets/fonts/Poppins-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
