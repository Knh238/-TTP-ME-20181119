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

// const LogoutButton = props => {
//   return firebase.auth().currentUser ? (
//     <Footer
//       style={{
//         flexDirection: "column",
//         height: 90
//       }}
//     >
//       <Button
//         full
//         light
//         onPress={() => props.navigation.navigate("Create")}
//         style={{ borderColor: "#c0c0c0" }}
//       >
//         <Text style={{ fontFamily: "Oxygen" }}>Create Project</Text>
//       </Button>
//       <Divider style={{ backgroundColor: "#c0c0c0" }} />
//       <Button
//         full
//         light
//         onPress={() => {
//           logOut();
//           props.navigation.navigate("Login");
//         }}
//       >
//         <Text style={{ fontFamily: "Oxygen" }}>LOGOUT</Text>
//       </Button>
//     </Footer>
//   ) : null;
// };

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      showOne: false,
      groups: []
    };
    this.clickOne = this.clickOne.bind(this);
    this.clickOne = this.clickOne.bind(this);
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
    // const self = this;
    // let groupProjects;
    // let userProjects;
    // firebase.auth().onAuthStateChanged(async function(user) {
    //   if (user) {
    //     const projects = await firebase
    //       .database()
    //       .ref("projects")
    //       .once("value")
    //       .then(snap => snap.val());
    //     groupProjects = [];
    //     userProjects = [];
    //     for (let key in projects) {
    //       if (projects[key].members) {
    //         const members = projects[key].members;
    //         const name = projects[key].name;
    //         const color = projects[key].color;
    //         if (members.includes(user.email) && members.length > 1) {
    //           groupProjects.push({ name, key, color, members });
    //         } else if (members[0] === user.email) {
    //           userProjects.push({ name, key, color, members });
    //         }
    //       }
    //     }
    //     self.setState({
    //       groups: groupProjects
    //     });
    //   }
    // });
  }

  render() {
    const nav = this.props.navigation;
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
                    onPress={() => this.clickOne()}
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
        {/* <LogoutButton navigation={nav} /> */}
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
