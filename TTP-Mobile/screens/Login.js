import React, { Component } from "react";
import firebase from "../firebase";
import { View, Keyboard, Image } from "react-native";
import {
  Card,
  Button,
  FormLabel,
  FormInput,
  Icon
} from "react-native-elements";
// import FormControl from "@material-ui/core/FormControl";
// import FormGroup from "@material-ui/core/FormGroup";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
import { LinearGradient } from "expo";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(nav) {
    const email = this.state.email.toLowerCase();
    const pass = this.state.pass;
    //const pass = this.state.pass.toLowerCase();
    if (email && pass) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(function(user) {
          nav.navigate("Home");
        })
        .catch(function(error) {
          console.log(error.message);
          //alert(error);
        });
    }
    this.setState = { email: "", pass: "" };
    Keyboard.dismiss();
  }

  render() {
    const nav = this.props.navigation;
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
          <Card title="Login for the love" fontFamily="abril">
            <Image
              source={require("../assets/images/twitter.png")}
              style={{
                width: 70,
                height: 50,
                alignSelf: "center"
              }}
            />
            <FormLabel fontFamily="abril" textColor="black">
              E-mail
            </FormLabel>
            <FormInput
              onChangeText={email => this.setState({ email })}
              inputStyle={{ width: undefined }}
            />
            <FormLabel fontFamily="abril">Password</FormLabel>
            <FormInput
              inputStyle={{ width: undefined }}
              onChangeText={pass => this.setState({ pass })}
              secureTextEntry
            />
            <Button
              title="LOGIN"
              fontFamily="abril"
              buttonStyle={{
                width: "100%",
                height: 45,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: "#2196F3"
              }}
              onPress={() => this.loginSubmit(nav)}
            />
            <Button
              title="HOME"
              fontFamily="abril"
              // buttonStyle={{
              //   width: "100%",
              //   height: 45,
              //   paddingTop: 10,
              //   backgroundColor: "#242424"
              // }}
              buttonStyle={{
                backgroundColor: "rgb(66, 194, 244)",
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10,
                width: "33%"
              }}
              icon={{ name: "home", type: "font-awesome" }}
              onPress={() => nav.navigate("Home")}
            />
          </Card>
        </LinearGradient>
      </View>
    );
  }
}
