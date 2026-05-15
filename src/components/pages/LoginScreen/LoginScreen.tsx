import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Pressable,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import CheckBox from '@react-native-community/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../store/hooks';
import { signIn } from '../../../store/slices/authSlice';
import { textStyles } from '../../theme/textStyles';
import DashedLine from '../../../assets/icons/DashedLine';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import PasswordInput from '../../atoms/PasswordInput';
import Spacing from '../../atoms/Spacing';
import { PhoneInput } from '../../atoms/PhoneInput';
import { phoneSchema } from '../../../utils/schemas';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { t } = useTranslation();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(phoneSchema(false)), // true для +7
    defaultValues: { phone: '' },
  });

  const dispatch = useAppDispatch();

  const onLoginHandler = () => {
    dispatch(signIn({ email: 'sdfsdf', token: 'sdfdsfds' }));
  };

  const onRegisterHandler = () => {
    navigation.navigate('Registration');
  };

  const onOpenPrivacyPolicyHandler = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Переход к политике конфиденциальности.',
        ToastAndroid.SHORT,
      );
    } else {
      Alert.alert('Переход к политике конфиденциальности.');
    }
  };

  const onForgetPasswordHandler = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Переход к восстановлению пароля.', ToastAndroid.SHORT);
    } else {
      Alert.alert('Переход к восстановлению пароля!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />

        <Spacing height={28} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('personal_account')}</Text>
          <Text style={textStyles.text_16r}>
            Для входа в личный кабинет введите свой номер телефона, на него
            будет отправлено SMS с проверочным кодом
          </Text>
        </View>

        <View style={styles.spacing}>
          <DashedLine />
        </View>

        <View style={styles.inputContainer}>
          <PhoneInput name="phone" withCountryCode={false} control={control} />
          <PasswordInput value={password} onChangeText={setPassword} />

          <View style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{
                true: palette.blue,
                false: palette.GRAY_LIGHT,
              }}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <View style={styles.privacyContainer}>
              <Pressable onPress={() => setToggleCheckBox(!toggleCheckBox)}>
                <Text style={textStyles.text_14m}>Согласен с </Text>
              </Pressable>
              <Pressable onPress={onOpenPrivacyPolicyHandler}>
                <Text style={styles.underline}>
                  политикой конфиденциальности
                </Text>
              </Pressable>
            </View>
          </View>

          <TranslinePressable
            onPress={handleSubmit(onLoginHandler)}
            style={{
              backgroundColor: isValid ? palette.blue : palette.BLUE_LIGHT,
            }}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TranslinePressable>

          <View style={styles.register}>
            <Text style={textStyles.text_16l}>Нет аккаунта? </Text>
            <Pressable onPress={onRegisterHandler}>
              <Text style={{ ...textStyles.text_16l, color: palette.blue }}>
                Зарегистрируйтесь
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Pressable onPress={onForgetPasswordHandler}>
            <Text style={{ ...textStyles.text_16l, color: palette.blue }}>
              Забыли пароль
            </Text>
          </Pressable>
          <View style={styles.support}>
            <Text style={textStyles.text_16l}> Появились вопросы?</Text>
            <Text style={textStyles.text_16b}>
              телефон поддержки: +7 (999) 999-99-99
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.BG },
  container: { flex: 1 },
  titleContainer: { gap: 12, paddingHorizontal: 16 },
  image: { width: 72, height: 72, marginLeft: 16, marginTop: 8 },
  title: { ...textStyles.text_24b, textTransform: 'uppercase' },
  spacing: { marginVertical: 20 },
  buttonText: { ...textStyles.text_16r, color: 'white' },
  inputContainer: { paddingHorizontal: 16, gap: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  underline: { ...textStyles.text_14l, textDecorationLine: 'underline' },
  register: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  privacyContainer: { flexDirection: 'row', alignItems: 'center' },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 16,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  support: { alignItems: 'center' },
});
