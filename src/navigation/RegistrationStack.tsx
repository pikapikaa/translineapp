import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from '../components/pages/RegistrationScreen';

const Stack = createNativeStackNavigator();
const RegistrationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Registration_Step_1'}
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen name="Registration_Step_1" component={RegistrationScreen} />
      <Stack.Screen name="Registration_Step_2" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default RegistrationStack;
