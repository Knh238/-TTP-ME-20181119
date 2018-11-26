// import React, { Component } from 'react';
// import { ScrollView } from 'react-native';
// import firebase from '../firebase';
// import { Card, Button, ListItem, List, Text, Divider } from 'react-native-elements';

// export default class SettingsScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.getProjects = this.getProjects.bind(this);
//     this.deleteProject = this.deleteProject.bind(this);
//   }

//   async componentDidMount() {
//     const self = this;
//     const userId = firebase.auth().currentUser.uid;
//     let user;
//     await firebase
//       .database()
//       .ref('/users/' + userId)
//       .once('value')
//       .then(function(snapshot) {
//         user = snapshot.val() && snapshot.val();
//         self.setState({ user });
//       });
//     this.getProjects();
//   }

//   getGroups() {
//     const self = this;
//     let allProjects;
//     const email = this.state.user.email;
//     var ref = firebase.database().ref('projects');
//     ref.on('value', function(snapshot) {
//       let projects = snapshot.val();
//       allProjects = [];
//       for (let key in projects) {
//         if (projects[key].members) {
//           const members = projects[key].members;
//           const name = projects[key].name;
//           const color = projects[key].color;
//           if (members.includes(email)) {
//             allProjects.push({ name, key, color, members });
//           }
//         }
//         self.setState({
//           projects: allProjects,
//         });
//       }
//     });
//   }

//   deleteGroup(key) {
//     return firebase
//       .database()
//       .ref('projects')
//       .child(key)
//       .remove();
//   }

//   render() {
//     const projects = this.state.projects;
//     const user = this.state.user;
//     const nav = this.props.navigation;
//     return (
//       <ScrollView>
//         <Card containerStyle={{padding: 20, shadowOpacity: 0, shadowColor: 'white', borderWidth: 0}}>
//           <Text h4 style={{textAlign: 'center', fontFamily: 'Abril'}}>Profile</Text>
// 					<Divider style={{backgroundColor: '#c0c0c0', marginTop: 15}} />
//           {user ? (
// 						<Card containerStyle={{shadowOpacity: 0, shadowColor: 'white', borderWidth: 0}}>
//               <Text style={{fontFamily: 'Oxygen'}}>Name: {user.displayName}</Text>
//               <Text style={{fontFamily: 'Oxygen'}}>E-mail: {user.email}</Text>
// 						</Card>
//           ) : null}
//           <Text h4 style={{textAlign: 'center', fontFamily: 'Abril'}}>{`\nProjects`}</Text>
//           {projects ? (
//             <List>
//               {projects.map(project => (
//                 <ListItem
//                   key={project.key}
//                   title={project.name}
//                   rightIcon={{ name: 'delete', style: { marginRight: 10 } }}
//                   leftIcon={{ name: 'lens', color: '#' + project.color }}
//                   onPressRightIcon={() => this.deleteProject(project.key)}
//                   onPress={() =>
//                     nav.navigate('ProjectHome', {
//                       project: project,
//                     })
//                   }
//                   style={{
//                     marginLeft: 0,
// 										paddingLeft: 10,
//                   }}
//                   container={{
//                     flex: 1,
// 									}}
//                 >
//                   <Text style={{fontFamily: 'Oxygen'}}>{project.name}</Text>
//                 </ListItem>
// 							))}
// 							          <Button
//             title="CREATE PROJECT"
//             buttonStyle={{
//               width: '100%',
//               height: 45,
// 							marginTop: 10,
// 							backgroundColor: '#242424',
// 							alignContent: 'center'
//             }}
//             onPress={() => nav.navigate('Create')}
//           />
//             </List>
//           ) : null}
//         </Card>
//       </ScrollView>
//     );
//   }
// }
//a  group  that  only  displays  tweets  containing  thehashtag
// specified  by  the  group  name
// in  order  to  filter  tweets  by  topics  I'minterested  in.

//must be able to delte too.
// maybe delete button could be on single page display
//or it could be in settings.
//probably setting si better
//add note on single group view anyway
// tired of this topic? delete this group from your seetings page

//do basically a twitter search by hashtag

import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
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
// import Icon from "react-native-vector-icons/FontAwesome";

import { WebBrowser } from "expo";
import { LinearGradient } from "expo";
import axios from "axios";
import Header from "../secrets";

// static navigationOptions = {
//   header: null
// };

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userGroups: [], user: "" };
    this.deleteGroup = this.deleteGroup.bind(this);
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
  //     const group = this.props.navigation.state.params.group;

  // console.log("data is--------------------", res.data.statuses);
  // // console.log(
  // //   "data is--------------------",
  // //   res.data.statuses[0].user.id_str
  // // );
  // self.setState({ tweets: res.data.statuses });
  //   }

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

  render() {
    this.state ? console.log("theres state!") : null;
    const nav = this.props.navigation;
    const groups = this.props.navigation.state.params.userGroups;
    const displayName = this.state.user;
    // console.log("this props in the redner of group view----------", groups);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <LinearGradient
          // colors={["powderblue", "lightblue", "#64b5f6"]}
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
                  padding: 10,
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
                  //color: "rgba(96,100,109, 1)",
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
                  width: "90%",
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
                              //   textAlign: "center",
                              fontFamily: "abril"
                            }}
                          >
                            {msg.value}
                          </Text>
                        </Body>
                        <Right>
                          <Icon
                            raised
                            size={25}
                            name="delete"
                            type="material-icons"
                            color="black"
                            onPress={() => this.deleteGroup(msg.key)}
                            //onPress={() => nav.navigate("Home")}
                          />
                        </Right>
                      </ListItem>
                    ))
                  : null}
              </List>
              <Button
                title="ADD NEW GROUP"
                raised
                icon={{ name: "add" }}
                buttonStyle={{
                  padding: 10,
                  marginTop: 20,
                  borderWidth: 0,
                  borderRadius: 30,
                  alignSelf: "center",
                  width: "70%",
                  backgroundColor: "#242424"
                }}
                onPress={() => nav.navigate("CreateGroup", { groups })}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
