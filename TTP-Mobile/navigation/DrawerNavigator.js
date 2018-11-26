import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import {
  Container,
  Content,
  Header,
  Body,
  Button,
  Text,
  View,
  List,
  ListItem,
  Footer,
  Left,
  Right,
  Switch,
  Badge
} from "native-base";
import { Avatar, Divider, Icon } from "react-native-elements";
import StackNavigator from "./StackNavigator";
import HomeScreen from "../screens/HomeScreen";
import firebase from "../firebase";
import GroupView from "../screens/GroupView";
import axios from "axios";
import AuthInfo from "../secrets";
import ipKey from "../secretsStack";
import { Constants, Location, Permissions } from "expo";

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      errorMessage: null,
      long: null,
      lat: null,
      woeid: null
    };
  }

  componentDidMount() {
    const self = this;

    // let user=auth().currentUser
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const currUser = user.uid;
        var ref = firebase.database().ref(`users/${currUser}/groups`);
        ref.on("value", function(snapshot) {
          let groups = snapshot.val();
          let userGroups = [];
          for (let key in groups) {
            let obj = {};
            obj.key = key;
            obj.value = groups[key];
            userGroups.push(obj);
          }
          self.setState({
            userGroups
          });
        });
      }
    });
    this._getLocationAsync();
    this.getIP();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // this.setState({
      //   errorMessage: "Permission to access location was denied"
      // });
      this.getIP();
    }

    let location = await Location.getCurrentPositionAsync({});
    const lat = JSON.stringify(location.coords.latitude);
    const long = JSON.stringify(location.coords.longitude);
    //console.log("location info------", location);
    this.setState({ lat });
    this.setState({ long });
  };
  getWOEID() {
    const self = this;
    const lat = this.state.lat;
    const long = this.state.long;
    return axios
      .get(
        `https://api.twitter.com/1.1/trends/closest.json?lat=${lat}&long=${long}`,
        {
          headers: AuthInfo
        }
      )
      .then(function(res) {
        //console.log("data is--------------------", res.data[0]);
        self.setState({ woeid: res.data[0] });
      });
  }
  getIP() {
    const self = this;

    return axios
      .get(`http://api.ipstack.com/check?access_key=${ipKey}`)
      .then(function(res) {
        //console.log("data is--------------------", res.data.longitude);
        self.setState({ lat: res.data.latitude });
        self.setState({ long: res.data.longitude });
      });
  }

  render() {
    const nav = this.props.navigation;
    //console.log("this state in drawer is------", this.state);
    return (
      <Container>
        <Header style={{ height: 80 }}>
          <Body>
            <Icon
              //   reverse
              size={55}
              name="twitter-square"
              type="font-awesome"
              color="#90CAF9"
              onPress={() => nav.navigate("Home")}
            />
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <ScrollView>
            <List>
              {/* <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("Location")}
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>My Location</Text>
                </Body>
                <Right>
                  <Icon
                    name="location"
                    type="entypo"
                    color="#2196F3"
                    size={35}
                  />
                </Right>
              </ListItem> */}
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() =>
                  nav.navigate("TrendingNearby", {
                    woeid: this.state.woeid
                  })
                }
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>
                    Trending in my area
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name="trending-up"
                    type="material-icons"
                    color="#2196F3"
                    size={28}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() =>
                  nav.navigate("TweetsNearMe", {
                    lat: this.state.lat,
                    long: this.state.long
                  })
                }
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>Tweets Near Me</Text>
                </Body>
                <Right>
                  <Icon
                    name="location"
                    type="entypo"
                    color="#2196F3"
                    size={35}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() =>
                  nav.navigate("Settings", {
                    userGroups: this.state.userGroups
                  })
                }
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>My Groups</Text>
                </Body>
                <Right>
                  <Icon
                    name="settings"
                    type="material-icons"
                    color="#2196F3"
                    size={35}
                  />
                </Right>
              </ListItem>

              {this.state.userGroups
                ? this.state.userGroups.map(group => {
                    return (
                      <ListItem
                        key={group.key}
                        title={group}
                        style={{
                          marginLeft: 10,
                          paddingLeft: 10
                        }}
                        container={{
                          flex: 1
                        }}
                        onPress={() =>
                          nav.navigate("GroupView", {
                            group: group.value
                          })
                        }
                      >
                        <Icon
                          name="hashtag"
                          type="font-awesome"
                          color="#2196F3"
                          size={25}
                        />
                        <Text style={{ fontFamily: "oxygen" }}>
                          {group.value}
                        </Text>
                      </ListItem>
                    );
                  })
                : null}

              <ListItem
                onPress={() =>
                  nav.navigate("CreateGroup", { groups: this.state.groups })
                }
              >
                <Icon
                  name="add-circle"
                  type="materialicons"
                  color="#2196F3"
                  size={35}
                />

                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>Add new group </Text>
                </Body>
              </ListItem>
            </List>
          </ScrollView>
        </Content>
        <LogoutButton navigation={nav} />
      </Container>
    );
  }
}
const DrawerNavigator = createDrawerNavigator(
  {
    Home: StackNavigator,
    GroupView: GroupView
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: CustomDrawer
  }
);
export default DrawerNavigator;
const logOut = function() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Sign out complete.");
      },
      function(error) {
        console.error(error);
      }
    );
};

const LogoutButton = props => {
  return firebase.auth().currentUser ? (
    <Footer
      style={{
        flexDirection: "column",
        height: 90
      }}
    >
      <Button
        full
        light
        onPress={() => {
          logOut();
          props.navigation.navigate("Login");
        }}
      >
        <Text style={{ fontFamily: "oxygen" }}>Logout</Text>
        <Icon
          name="exit-to-app"
          type="material-icons"
          color="#2196F3"
          size={28}
        />
      </Button>
    </Footer>
  ) : null;
};
