//I  want  to  create  a  group  that  only  displays  tweets  containing  thehashtag
// specified  by  the  group  name
// in  order  to  filter  tweets  by  topics  I'minterested  in.

//must be able to delte too.
// maybe delete button could be on single page display
//or it could be in settings.
//probably setting si better
//add note on single group view anyway
// tired of this topic? delete this group from your seetings page

import React, { Component } from "react";
import firebase from "../firebase";
import { View, Keyboard } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class CreateGroup extends Component {
  constructor() {
    super();
    this.state = { group: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   const self = this;
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       let userProjects = [];
  //       var ref = firebase.database().ref("projects");
  //       ref.on("value", function(snapshot) {
  //         let projects = snapshot.val();
  //         for (let key in projects) {
  //           if (projects[key].members) {
  //             const members = projects[key].members;
  //             const name = projects[key].name;
  //             const color = projects[key].color;
  //             if (members.includes(user.email)) {
  //               userProjects.push({ name, key, color });
  //             }
  //           }
  //         }
  //         self.setState({
  //           projects: userProjects,
  //           selectedProject: userProjects[0].key
  //         });
  //       });
  //     }
  //   });
  // }
  handleSubmit() {
    const self = this;
    const nav = this.props.navigation;
    const group = this.state.group;
    //const groups = this.props.navigation.state.params.groups.length;
    // let userGroups;
    // let user=auth().currentUser
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const currUser = user.uid;
        // console.log("current user uid", user.);
        // const groups = await firebase
        //   .database()
        //   .ref(`users/${currUser}/groups`)
        //   .once("value")
        //   .then(snap => snap.val());

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

        //console.log("this user group before setting state", groups);
        //     self.setState({
        //       groups
        //     });
        //   } else {
        //     console.log("no groups");
      }
    });
  }

  //   handleSubmit() {
  //     const nav = this.props.navigation;
  //     const name = this.state.name;

  //     let newKey;
  //     let currentUser;
  //     firebase.auth().onAuthStateChanged(function(user) {
  //       currentUser = user.uid;
  // newKey = firebase
  //   .database()
  //   .ref("projects/")
  //   .push().key;
  //       firebase
  //         .database()
  //         .ref("user/" )
  //         .set({
  //           name,
  //           color,
  //           members: member.length
  //             ? [currentUser, ...member.toLowerCase().split(",")]
  //             : [currentUser]
  //         });
  //       nav.navigate("ProjectHome", {
  //         project: {
  //           name: name,
  //           key: newKey,
  //           color: color,
  //           members: member.length
  //             ? [currentUser, ...member.toLowerCase().split(",")]
  //             : [currentUser]
  //         }
  //       });
  //     });
  //     Keyboard.dismiss();
  //     this.setState({ name: "", member: "" });
  //   }

  render() {
    return (
      <View>
        <Card>
          <FormLabel>Group Topic</FormLabel>
          <FormInput onChangeText={group => this.setState({ group })} />
        </Card>
        <Button
          title="CREATE"
          buttonStyle={{
            width: "100%",
            height: 45,
            marginTop: 10,
            backgroundColor: "#242424"
          }}
          onPress={() => {
            this.handleSubmit();
          }}
        />
      </View>
    );
  }
}
