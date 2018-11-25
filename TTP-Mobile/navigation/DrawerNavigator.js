import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import {
  Container,
  Header,
  Content,
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
// import Login from "../screens/Login";
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
        <Text style={{ fontFamily: "oxygen" }}>LOGOUT</Text>
      </Button>
    </Footer>
  ) : null;
};

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      showOne: false,
      groups: []
    };
    this.clickOne = this.clickOne.bind(this);
  }

  clickOne() {
    if (!this.state.showOne) {
      this.setState({ showOne: true });
    } else {
      this.setState({ showOne: false });
    }
  }
  componentDidMount() {
    const self = this;
    let userGroups;
    // let user=auth().currentUser
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const currUser = user.uid;
        //console.log("current user groups", currUser);
        const groups = await firebase
          .database()
          .ref(`users/${currUser}/groups`)
          .once("value")
          .then(snap => snap.val());

        //console.log("this user group before setting state", groups);
        self.setState({
          groups
        });
      } else {
        console.log("no groups");
      }
    });
  }

  render() {
    const nav = this.props.navigation;
    console.log("this state in drawer is------", this.state);
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
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("TrendingNearby")}
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>Settings</Text>
                </Body>
                <Right>
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    color="#2196F3"
                    size={28}
                    onPress={() => this.clickOne()}
                  />
                </Right>
              </ListItem>

              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("Location")}
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>My Location</Text>
                  {/* <Text style={{ fontFamily: "poppins" }}>Days left:</Text> */}
                </Body>
                <Right>
                  <Icon
                    name="location"
                    type="entypo"
                    color="#2196F3"
                    size={35}
                    onPress={() => this.clickOne()}
                  />
                  {/* <Text> new messages </Text> */}
                  {/* <Badge secondary>
                      <Text style={{ fontFamily: "playfair" }}>6</Text>
                    </Badge> */}
                </Right>
              </ListItem>
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("TrendingNearby")}
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
                    onPress={() => this.clickOne()}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("TweetsNearMe")}
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>Tweets Near Me</Text>
                  {/* <Text style={{ fontFamily: "poppins" }}>Days left:</Text> */}
                </Body>
                <Right>
                  <Icon
                    name="near-me"
                    type="material-icons"
                    color="#2196F3"
                    size={35}
                    onPress={() => this.clickOne()}
                  />
                  {/* <Text> new messages </Text> */}
                  {/* <Badge secondary>
                      <Text style={{ fontFamily: "playfair" }}>6</Text>
                    </Badge> */}
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}> My Groups</Text>
                </Body>
                <Right>
                  <Icon
                    //reverse
                    // raised

                    name="group"
                    type="font-awesome"
                    color="#2196F3"
                    size={35}
                    onPress={() => this.clickOne()}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>
                    {" "}
                    New Tweets in group
                  </Text>
                </Body>
                <Right>
                  <Badge warning>
                    {/* //success is green
                  //info is light blue 
                  //primary is navy */}
                    <Text
                      style={{
                        fontFamily: "oxygen"
                      }}
                    >
                      6
                    </Text>
                  </Badge>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}> add new group </Text>
                </Body>
                <Right>
                  <Icon
                    // name="add-circle-outline"
                    name="add-circle"
                    type="materialicons"
                    color="#2196F3"
                    size={35}
                    onPress={() => this.clickOne()}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                onPress={() => nav.navigate("TrendingNearby")}
              >
                <Body>
                  <Text style={{ fontFamily: "oxygen" }}>Logout</Text>
                </Body>
                <Right>
                  <Icon
                    name="exit-to-app"
                    type="material-icons"
                    // name="log-out"
                    // type="feather"
                    color="#2196F3"
                    size={28}
                    onPress={() => logout()}
                  />
                </Right>
              </ListItem>
              {/* {this.state.groups
                ? this.state.groups.map(project => {
                    return (
                      <ListItem
                        key={project.key}
                        title={project.name}
                        style={{
                          marginLeft: 0,
                          paddingLeft: 10
                        }}
                        container={{
                          flex: 1
                        }}
                        onPress={() =>
                          nav.navigate("ProjectHome", {
                            project: project
                          })
                        }
                      >
                        {" "}
                        <Avatar
                          rounded
                          icon={{ name: "user", type: "font-awesome" }}
                          size="xsmall"
                          containerStyle={{
                            marginRight: 20
                          }}
                          overlayContainerStyle={{
                            backgroundColor: `#${project.color}`
                          }}
                        />
                        <Text style={{ fontFamily: "Oxygen" }}>
                          {project.name}
                        </Text>
                      </ListItem>
                    );
                  })
                : null} */}
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
    Home: StackNavigator
    //Profile: Profile,
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: CustomDrawer
  }
);
export default DrawerNavigator;
