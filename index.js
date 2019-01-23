/** @format */
import React from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import App from './App';

const store = configureStore();

const RNRedux = () => (
    <Provider store={ store }>
        <App />
    </Provider>
);

// Register screens
Navigation.registerComponent("goingout.AuthScreen", () => RNRedux);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'goingout.AuthScreen',
        title: "Login"
      }
    }
  });
});