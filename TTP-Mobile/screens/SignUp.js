import React, { Component } from 'react';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { View, Keyboard, Image, Alert } from 'react-native';
import firebase from '../firebase';
import { LinearGradient } from 'expo';

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
          Alert.alert(error);
        });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const uid = user.uid;
          firebase
            .database()
            .ref('users/' + uid)
            .set({
              displayName,
              email
            });
        }
      });
    }
    this.setState = { email: '', pass: '' };
    Keyboard.dismiss();
    nav.navigate('Login');
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <LinearGradient
          colors={['powderblue', 'lightblue', '#90caf9']}
          fill
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%'
          }}
        >
          <Card
            title="Sign up as a new user"
            fontFamily="abril"
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              fontFamily: 'abril'
            }}
          >
            <Image
              source={require('../assets/images/twitter.png')}
              style={{
                width: 70,
                height: 50,
                alignSelf: 'center'
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
                width: '100%',
                height: 45,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: '#2196F3'
              }}
              fontFamily="abril"
              onPress={() => this.handleSubmit(nav)}
            />
          </Card>
        </LinearGradient>
      </View>
    );
  }
}
