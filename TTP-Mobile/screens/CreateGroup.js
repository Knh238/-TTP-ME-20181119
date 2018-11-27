import React, { Component } from "react";
import firebase from "../firebase";
import { View, Keyboard } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { LinearGradient } from "expo";

export default class CreateGroup extends Component {
  constructor() {
    super();
    this.state = { group: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const self = this;
    const nav = this.props.navigation;
    const group = this.state.group;

    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const currUser = user.uid;

        const newKey = await firebase
          .database()
          .ref(`users/${currUser}/groups/`)
          .push().key;
        firebase
          .database()
          .ref(`users/${currUser}/groups/`)
          .child(newKey)
          .set(group);
        Keyboard.dismiss();
        self.setState({
          group: ""
        });
        nav.navigate("Home");
      }
    });
  }

  render() {
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
          <Card style={{ height: "50%" }}>
            <FormLabel>Group Topic</FormLabel>
            <FormInput onChangeText={group => this.setState({ group })} />
          </Card>
          <Button
            title="CREATE"
            buttonStyle={{
              width: "100%",
              height: 45,
              marginTop: 10,
              borderRadius: 5,
              backgroundColor: "#2196F3"
            }}
            onPress={() => {
              this.handleSubmit();
            }}
          />
        </LinearGradient>
      </View>
    );
  }
}
