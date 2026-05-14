import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import { useAppDispatch } from '../../../store/hooks';
import { signIn } from '../../../store/slices/authSlice';
import { textStyles } from '../../theme/textStyles';
import DashedLine from '../../../assets/icons/DashedLine';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const onLoginHandler = () => {
    dispatch(signIn({ email: 'sdfsdf', token: 'sdfdsfds' }));
  };

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

        <View style={styles.spacing}>
          <DashedLine />
        </View>

        <View style={styles.inputContainer}>
          <TranslinePressable
            onPress={onLoginHandler}
            style={{ backgroundColor: palette.BLUE_LIGHT }}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TranslinePressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  titleContainer: { gap: 12, paddingHorizontal: 16 },
  image: { width: 72, height: 72, marginLeft: 16, marginTop: 8 },
  title: { ...textStyles.text_24b, textTransform: 'uppercase' },
  spacing: { marginVertical: 20 },
  buttonText: { ...textStyles.text_16r, color: 'white' },
  inputContainer: { paddingHorizontal: 16 },
});
