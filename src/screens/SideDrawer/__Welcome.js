import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import { authAutoSignin } from  '../../store/actions/index';

class SideDrawerScreen extends Component {

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render() {
      return (
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Text>Sample SideDrawerScreen</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
  },
  buttonContainer: {
    padding: 7,
  }
});



export default SideDrawerScreen;
