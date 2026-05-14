import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { bootstrapAsync } from '../store/slices/authSlice';

// Импорт страниц из слоя Pages (Atomic Design)
import LoginScreen from '../components/pages/LoginScreen';
import RegistrationScreen from '../components/pages/RegistrationScreen';
import MainScreen from '../components/pages/MainScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const { isLoading, userToken } = useAppSelector(state => state.auth);

  // Проверяем токен при первом запуске приложения
  useEffect(() => {
    dispatch(bootstrapAsync());
  }, [dispatch]);

  // Заглушка (Splash Screen) пока идет проверка токена
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <>
            <Stack.Screen name="SignIn" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          // Экран доступен ТОЛЬКО авторизованным пользователям
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
