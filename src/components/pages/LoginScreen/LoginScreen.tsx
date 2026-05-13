import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TranslineButton from '../../atoms/TranslineButton';
import { useAppDispatch } from '../../../store/hooks';
import { signIn } from '../../../store/slices/authSlice';

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <Button
          title="Войти (имитация)"
          onPress={() =>
            dispatch(signIn({ email: 'sdfsdf', token: 'sdfdsfds' }))
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
});
