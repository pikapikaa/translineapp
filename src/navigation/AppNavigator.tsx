import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { bootstrapAsync, setLanguage } from '../store/slices/authSlice';

import LoginScreen from '../components/pages/LoginScreen';
import RegistrationScreen from '../components/pages/RegistrationScreen';
import { TabNavigator } from './TabNavigator';
import i18n from '../localization/i118n';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const { isLoading, userToken, draft } = useAppSelector(state => state.auth);
  const [isLangReady, setIsLangReady] = useState(false);

  useEffect(() => {
    dispatch(bootstrapAsync());
  }, [dispatch]);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('app_lang');
        const finalLang = savedLang || 'ru';
        await i18n.changeLanguage(finalLang);
        dispatch(setLanguage(finalLang));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLangReady(true);
      }
    };

    prepareApp();
  }, [dispatch]);

  if (isLoading || !isLangReady) {
    return (
      <View style={styles.indicator}>
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

const styles = StyleSheet.create({
  indicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
