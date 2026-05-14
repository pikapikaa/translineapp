import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import { useAppDispatch } from '../../../store/hooks';
import { signIn } from '../../../store/slices/authSlice';
import { textStyles } from '../../theme/textStyles';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <FastImage
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={{ height: 28 }} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Личный кабинет Transline</Text>
          <Text style={textStyles.text_16r}>
            Для входа в личный кабинет введите свой номер телефона, на него
            будет отправлено SMS с проверочным кодом
          </Text>
        </View>

        <Button
          title="Войти (имитация)"
          onPress={() =>
            dispatch(signIn({ email: 'sdfsdf', token: 'sdfdsfds' }))
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 16, flex: 1, paddingTop: 8 },
  titleContainer: { gap: 12 },
  image: { width: 72, height: 72 },
  title: { ...textStyles.text_24b, textTransform: 'uppercase' },
});
