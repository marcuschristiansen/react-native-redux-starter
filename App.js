import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// Register screens
Navigation.registerComponent("goingout.AuthScreen", () => AuthScreen);

// Start App
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: "goingout.AuthScreen",
    
//   } 
// });

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