import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Right,
  Badge,
  Thumbnail,
  Body,
  Text,
  Card
} from 'native-base';
import { Button } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { Icon } from 'expo';

import { WebBrowser } from 'expo';
import { LinearGradient } from 'expo';
import axios from 'axios';
import AuthInfo from '../secrets';

export default class TweetsNearMeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  componentWillMount() {
    const self = this;
    const lat = this.props.navigation.state.params.lat;
    const long = this.props.navigation.state.params.long;
    return axios
      .get(
        `https://api.twitter.com/1.1/search/tweets.json?geocode=${lat},${long},5mi`,
        {
          headers: AuthInfo
        }
      )
      .then(function(res) {
        self.setState({ tweets: res.data.statuses });
      });
  }

  render() {
    const nav = this.props.navigation;
    this.state ? console.log('theres state!') : null;
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
          <ScrollView>
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/twitter.png')
                    : require('../assets/images/twitter.png')
                }
                style={{
                  width: 80,
                  height: 60,
                  resizeMode: 'contain',
                  marginTop: 3,
                  marginLeft: -10
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'abril'
                }}
              >
                Tweets Near Me
              </Text>
              <View style={{ marginBottom: 20 }}>
                <Button
                  buttonStyle={{
                    backgroundColor: 'rgb(66, 194, 244)',
                    borderWidth: 0,
                    borderRadius: 30,
                    alignSelf: 'center',
                    width: '60%',
                    marginTop: 10
                  }}
                  center
                  icon={{
                    name: 'refresh',
                    type: 'font-awesome',
                    color: '#1DA1F2'
                  }}
                  title="check for new posts"
                  textStyle={{ fontFamily: 'abril', color: 'white' }}
                  onPress={() => this.componentWillMount()}
                />
              </View>
              <List>
                {this.state.tweets
                  ? this.state.tweets.map(msg => (
                      <Card
                        key={msg.id}
                        style={{
                          padding: 20,
                          width: '85%',
                          alignSelf: 'center'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            nav.navigate('AuthorInfo', { user: msg.user })
                          }
                        >
                          <Left>
                            <Thumbnail
                              source={{
                                uri: `${msg.user.profile_image_url}`
                              }}
                            />
                          </Left>
                        </TouchableOpacity>
                        <Body>
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'rgba(96,100,109, 1)',
                              textAlign: 'center',
                              fontFamily: 'abril'
                            }}
                          >
                            {msg.user.name}@{msg.user.screen_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'rgba(96,100,109, 1)',
                              textAlign: 'center',
                              fontFamily: 'oxygen'
                            }}
                          >
                            {msg.text}
                          </Text>
                        </Body>
                        <Right>
                          <Text note fontFamily="sedgwick">
                            {msg.created_at.slice(0, 16)}{' '}
                          </Text>
                        </Right>
                      </Card>
                    ))
                  : null}
              </List>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}
