import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { Button, Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import Header from "../secrets";
import CreateGroup from "./CreateGroup";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userGroups: [], user: "", showAdd: false };
    this.deleteGroup = this.deleteGroup.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  componentWillMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref("users/");
        ref.on("value", function(snapshot) {
          const users = snapshot.val();
          for (var key in users) {
            if (key === user.uid) {
              self.setState({ user: users[key].displayName });
            }
          }
        });
      }
    });
  }

  deleteGroup(key) {
    const nav = this.props.navigation;
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const currUser = user.uid;
        return firebase
          .database()
          .ref(`users/${currUser}/groups`)
          .child(key.toString())
          .remove();
      }
    });
    nav.navigate("Home");
  }

  showForm() {
    const show = this.state.showAdd;
    this.setState({ showAdd: !show });
  }

  render() {
    this.state ? console.log("theres state!") : null;
    const nav = this.props.navigation;
    const groups = this.props.navigation.state.params.userGroups;
    const displayName = this.state.user;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <LinearGradient
          colors={["powderblue", "lightblue", "#90caf9"]}
          fill
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%"
          }}
        >
          <ScrollView>
            <View
              style={{
                alignItems: "center"
              }}
            >
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
            </View>
            <View>
              <Text
                style={{
                  fontSize: 35,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                {displayName}'s
              </Text>

              <Text
                style={{
                  fontSize: 25,
                  padding: 10,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "abril"
                }}
              >
                # groups
              </Text>
              <List
                style={{
                  width: "95%",
                  alignSelf: "center"
                }}
              >
                {groups
                  ? groups.map(msg => (
                      <ListItem
                        style={{ backgroundColor: "white" }}
                        key={msg.key}
                      >
                        <Body>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "rgba(96,100,109, 1)",
                              fontFamily: "abril"
                            }}
                          >
                            {msg.value}
                          </Text>
                        </Body>
                        <Right>
                          <Icon
                            size={25}
                            name="delete"
                            type="material-icons"
                            color="#1DA1F2"
                            onPress={() => this.deleteGroup(msg.key)}
                          />
                        </Right>
                      </ListItem>
                    ))
                  : null}
              </List>
              <Button
                title="ADD NEW GROUP"
                textStyle={{ color: "#1DA1F2", fontFamily: "abril" }}
                raised
                icon={{ name: "add", color: "#1DA1F2" }}
                buttonStyle={{
                  padding: 10,
                  marginTop: 20,
                  borderWidth: 0,
                  borderRadius: 30,
                  alignSelf: "center",
                  width: "70%",
                  //backgroundColor: "#242424"
                  backgroundColor: "white"
                }}
                onPress={() => nav.navigate("CreateGroup", { groups })}
                //onPress={() => this.showForm()}
              />
              {/* {this.state.showAdd ? (
                <View>
                  <CreateGroup />
                </View>
              ) : null} */}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
