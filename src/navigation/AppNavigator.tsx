import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { bootstrapAsync } from '../store/slices/authSlice';

import LoginScreen from '../components/pages/LoginScreen';
import RegistrationScreen from '../components/pages/RegistrationScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const { isLoading, userToken, draft } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(bootstrapAsync());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  const hasDraft = draft?.code !== '';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <>
            {hasDraft ? (
              <>
                <Stack.Screen
                  name="Registration"
                  component={RegistrationScreen}
                />
                <Stack.Screen name="SignIn" component={LoginScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={LoginScreen} />
                <Stack.Screen
                  name="Registration"
                  component={RegistrationScreen}
                />
              </>
            )}
          </>
        ) : (
          // Экран доступен only авторизованным пользователям
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
