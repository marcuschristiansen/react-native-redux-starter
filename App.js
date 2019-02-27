import React, { Component } from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import WelcomeScreen from './src/screens/Auth/Welcome';
import SignupScreen from './src/screens/Auth/Signup';
import SigninScreen from './src/screens/Auth/Signin';
import PasswordRecoveryScreen from './src/screens/Auth/PasswordRecovery';

import ListScreen from './src/screens/List/List';
import ProfileScreen from './src/screens/Profile/Profile';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

// Register screens
Navigation.registerComponentWithRedux("goingout.WelcomeScreen", () => WelcomeScreen, Provider, store);
Navigation.registerComponentWithRedux("goingout.SignupScreen", () => SignupScreen, Provider, store);
Navigation.registerComponentWithRedux("goingout.SigninScreen", () => SigninScreen, Provider, store);
Navigation.registerComponentWithRedux("goingout.PasswordRecoveryScreen", () => PasswordRecoveryScreen, Provider, store);

Navigation.registerComponentWithRedux("goingout.ListScreen", () => ListScreen, Provider, store);
Navigation.registerComponentWithRedux("goingout.ProfileScreen", () => ProfileScreen, Provider, store);

Navigation.registerComponentWithRedux("goingout.SideDrawerScreen", () => SideDrawerScreen, Provider, store);


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [
          {
            component: {
              name: 'goingout.WelcomeScreen',
              title: 'Welcome'
            }
          }
        ]
      }
    }
  });
});
