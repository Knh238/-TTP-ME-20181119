import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { Icon } from 'expo';
import { WebBrowser } from 'expo';
import { LinearGradient } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
          <View
            style={{
              alignItems: 'center'
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                textAlign: 'center',
                fontFamily: 'abril'
              }}
            >
              Kristin's Mobile App / Twitter Api Build
            </Text>

            <LottieView
              source={require('../assets/images/twitter_icon.json')}
              autoPlay
              loop
              style={{
                alignContent: 'center',
                position: 'relative'
              }}
            />

            <Button
              buttonStyle={{
                backgroundColor: 'white',
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: 'center',
                width: '33%'
              }}
              center
              title="Login-in"
              textStyle={{ fontFamily: 'abril', color: 'rgb(66, 194, 244)' }}
              onPress={() => nav.navigate('Login')}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
                borderWidth: 0,
                borderRadius: 30,
                alignSelf: 'center',
                width: '33%',
                marginTop: 10
              }}
              center
              title="Sign-up"
              textStyle={{ fontFamily: 'abril', color: 'rgb(66, 194, 244)' }}
              onPress={() => nav.navigate('SignUp')}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
