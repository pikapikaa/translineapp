import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';

import LoginScreen from './src/components/pages/LoginScreen';
import RegistrationScreen from './src/components/pages/RegistrationScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Registration: {
      screen: RegistrationScreen,
      options: {
        title: 'регистрация',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return <Navigation />;
}

export default App;
