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
import { LinearGradient } from "expo";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(nav) {
    const email = this.state.email.toLowerCase();
    const pass = this.state.pass.toLowerCase();
    if (email && pass) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(function(user) {
          nav.navigate("App");
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
          //   flexDirection: "column",
          //   padding: 20,
          flex: 1,
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <LinearGradient
          // colors={["#90CAF9", "#2196F3", "#1976D2"]}
          colors={["powderblue", "lightblue", "#2196F3"]}
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
            <FormLabel fontFamily="abril">E-mail</FormLabel>
            <FormInput
              // onChangeText={email => this.setState({ email })}
              inputStyle={{ width: undefined }}
            />
            <FormLabel fontFamily="abril">Password</FormLabel>
            <FormInput
              inputStyle={{ width: undefined }}
              // onChangeText={pass => this.setState({ pass })}
              // secureTextEntry
            />
            <Button
              title="LOGIN"
              fontFamily="abril"
              buttonStyle={{
                width: "100%",
                height: 45,
                marginTop: 10,
                backgroundColor: "#242424"
              }}
              // onPress={() => this.loginSubmit(nav)}
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
// import React, { Component } from "react";
// import firebase from "../firebase";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import FormControl from "@material-ui/core/FormControl";
// import FormGroup from "@material-ui/core/FormGroup";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Card from "@material-ui/core/Card";

// export default class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: ""
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
//     if (email !== "" && pass !== "") {
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(email, pass)
//         .catch(function(error) {
//           console.error(error);
//           window.alert(error);
//         });
//     }
//     const user = firebase.auth().currentUser;
//     this.props.handleLogin(user);
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
//                   <InputLabel>E-mail</InputLabel>
//                   <Input name="email" type="email" required />
//                 </FormControl>
//                 <FormControl>
//                   <InputLabel>Password</InputLabel>
//                   <Input name="password" type="password" required />
//                 </FormControl>
//                 <br />
//                 <Button onClick={this.handleSubmit} type="submit">
//                   <Link to="/" replace>
//                     LOGIN
//                   </Link>
//                 </Button>
//                 <Button>
//                   <Link style={{ textDecoration: "none" }} to="/signup" replace>
//                     Sign up as a new user
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
