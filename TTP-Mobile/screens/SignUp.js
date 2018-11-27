import React, { Component } from "react";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { View, Keyboard, Image } from "react-native";
import firebase from "../firebase";
import { LinearGradient } from "expo";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(nav) {
    const email = this.state.email.toLowerCase();
    const pass = this.state.pass;
    const displayName = this.state.name;
    if (email && pass) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .catch(function(error) {
          console.error(error);
          // alert(error);
        });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const uid = user.uid;
          firebase
            .database()
            .ref("users/" + uid)
            .set({
              displayName,
              email
            });
        }
      });
    }
    this.setState = { email: "", pass: "" };
    Keyboard.dismiss();
    nav.navigate("Login");
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
          <Card
            title="Sign up as a new user"
            fontFamily="abril"
            style={{
              justifyContent: "center",
              alignContent: "center",
              fontFamily: "abril"
            }}
          >
            <Image
              source={require("../assets/images/twitter.png")}
              style={{
                width: 70,
                height: 50,
                alignSelf: "center"
              }}
            />
            <FormLabel fontFamily="abril">Name</FormLabel>
            <FormInput
              onChangeText={name => this.setState({ name })}
              inputStyle={{ width: undefined }}
            />

            <FormLabel fontFamily="abril">E-mail</FormLabel>
            <FormInput onChangeText={email => this.setState({ email })} />

            <FormLabel fontFamily="abril">Password</FormLabel>
            <FormInput
              onChangeText={pass => this.setState({ pass })}
              inputStyle={{ width: undefined }}
              secureTextEntry
            />

            <Button
              title="SIGN UP"
              buttonStyle={{
                width: "100%",
                height: 45,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: "#2196F3"
              }}
              fontFamily="abril"
              onPress={() => this.handleSubmit(nav)}
            />
            {/* <Button
              title="BACK TO LOGIN"
              buttonStyle={{
                width: "100%",
                height: 45,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: "#2196F3"
              }}
              fontFamily="abril"
              onPress={() => nav.navigate("Login")}
            /> */}
          </Card>
        </LinearGradient>
      </View>
    );
  }
}

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import firebase from "../firebase";
// import Button from "@material-ui/core/Button";
// import FormControl from "@material-ui/core/FormControl";
// import FormGroup from "@material-ui/core/FormGroup";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Card from "@material-ui/core/Card";

// export default class SignUpForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       name: ""
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const email = this.state.email;
//     const pass = this.state.password;
//     const displayName = this.state.name;
//     const portfolio = [];
//     const transactions = [];
//     const balance = 500000;
//     // sign up the user
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, pass)
//       .catch(function(error) {
//         console.error(error);
//         window.alert(error);
//       });
//     //add user to db
//     firebase.auth().onAuthStateChanged(function(user) {
//       let n = 0;
//       if (user && n === 0) {
//         n++;
//         const uid = user.uid;
//         firebase
//           .database()
//           .ref("users/" + uid)
//           .set({
//             displayName,
//             email,
//             portfolio,
//             transactions,
//             balance
//           });
//       }
//     });
//   }

//   render() {
//     return (
//       <div style={{ position: "relative" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, 50%)"
//           }}
//         >
//           <Card>
//             <form onChange={this.handleChange}>
//               <FormGroup style={{ margin: "1em" }}>
//                 <FormControl>
//                   <InputLabel>Name</InputLabel>
//                   <Input name="name" type="text" required />
//                 </FormControl>
//                 <FormControl>
//                   <InputLabel>E-mail</InputLabel>
//                   <Input name="email" type="email" required />
//                 </FormControl>
//                 <FormControl>
//                   <InputLabel>Password</InputLabel>
//                   <Input name="password" type="password" required />
//                 </FormControl>
//                 <br />
//                 <Button onClick={this.handleSubmit} type="submit">
//                   <Link to="/login" replace>
//                     SIGNUP
//                   </Link>
//                 </Button>
//                 <Button>
//                   <Link to="/login" replace>
//                     Back to Login
//                   </Link>
//                 </Button>
//               </FormGroup>
//             </form>
//           </Card>
//         </div>
//       </div>
//     );
//   }
// }
