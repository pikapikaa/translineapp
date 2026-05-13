import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TranslineButton from '../../atoms/TranslineButton';

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <TranslineButton screen="Registration">Login</TranslineButton>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
});
