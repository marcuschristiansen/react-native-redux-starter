import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import { authAutoSignin } from  '../../store/actions/index';

class WelcomeScreen extends Component {

  componentDidMount() {
    this.props.onAutoSignIn();
  }

    goToScreen(screenName) {
      Navigation.push(this.props.componentId, {
        component: {
          name: screenName
        }
      });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around' }}>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={ require('../../assets/img/logo.png') }
                />
                <Text>Sample App</Text>
              </View>
          
              <View>
                <Button
                  title='Sign up' 
                  containerStyle={styles.buttonContainer}
                  onPress={() => this.goToScreen('goingout.SignupScreen')}
                />
                <View style={{ alignItems: 'center' }}>
                  <Text>Already a member? <Text onPress={() => this.goToScreen('goingout.SigninScreen')}>Login</Text></Text>
                </View>
              </View>

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

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(authAutoSignin())
  };
};

export default connect(null, mapDispatchToProps)(WelcomeScreen);
