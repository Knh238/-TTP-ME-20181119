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
// import Login from "../screens/Login";

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      showOne: false,
      showTwo: false,
      showThree: false
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
  clickTwo() {
    if (!this.state.showTwo) {
      this.setState({ showTwo: true });
    } else {
      this.setState({ showTwo: false });
    }
  }
  clickThree() {
    if (!this.state.showThree) {
      this.setState({ showThree: true });
    } else {
      this.setState({ showThree: false });
    }
  }

  render() {
    const nav = this.props.navigation;
    return (
      <Container>
        <Header style={{ height: 80 }}>
          <Body>
            <Icon
              reverse
              name="heartbeat"
              type="font-awesome"
              color="royalblue"
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
                onPress={() => nav.navigate("Links")}
              >
                <Body>
                  <Text style={{ fontFamily: "permanent-marker" }}>
                    Profile
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    color="royalblue"
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
                onPress={() => nav.navigate("Schedule")}
              >
                <Body>
                  <Text style={{ fontFamily: "playfair" }}>My Bookmarks</Text>
                  {/* <Text style={{ fontFamily: "poppins" }}>Days left:</Text> */}
                </Body>
                <Right>
                  <Icon
                    //reverse
                    // raised

                    name="book-bookmark"
                    type="foundation"
                    color="royalblue"
                    size={35}
                    onPress={() => this.clickOne()}
                  />
                  {/* <Badge secondary>
                      <Text style={{ fontFamily: "poppins" }}>6</Text>
                    </Badge> */}
                </Right>
              </ListItem>
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
