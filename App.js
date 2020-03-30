import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './app/navigation/mainStack'
import * as firebase from 'firebase';
import config from './config';

firebase.initializeApp(config.firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
