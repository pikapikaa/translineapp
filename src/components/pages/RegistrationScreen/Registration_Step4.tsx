import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { textStyles } from '../../theme/textStyles';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import Spacing from '../../atoms/Spacing';
import { EnhancedPasswordInput } from '../../atoms/EnhancedPasswordInput';
import { passwordStepSchema } from '../../../utils/schemas';

const Registration_Step_4 = () => {
  const { bottom } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const passwordValue = useWatch({ control, name: 'password' }) || '';

  const requirements = [
    {
      id: 1,
      text: 'Минимальная длина: 8 символов',
      isValid: passwordValue.length >= 8,
    },
    {
      id: 2,
      text: 'Минимум 1 заглавная буква (A–Z)',
      isValid: /[A-Z]/.test(passwordValue),
    },
    {
      id: 3,
      text: 'Минимум 1 строчная буква (a–z)',
      isValid: /[a-z]/.test(passwordValue),
    },
    {
      id: 4,
      text: 'Минимум 1 цифра (0–9)',
      isValid: /[0-9]/.test(passwordValue),
    },
    {
      id: 5,
      text: `Минимум 1 специальный символ ${'\n'}(! @ # $ % и т.д.)`,
      isValid: /[!@#$%^&*(),.?":{}|<>_+\-[\]\\]/.test(passwordValue),
    },
  ];
  const onProfileSubmitHandler = () => {};

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 16 }]}
    >
      <View style={styles.textContainer}>
        <Text style={textStyles.text_24b}>Пароль</Text>
        <Text style={textStyles.text_16l}>Установите пароль для входа </Text>
      </View>

      <Spacing height={24} />

      <EnhancedPasswordInput
        name="password"
        control={control}
        placeholder="Пароль"
      />

      <EnhancedPasswordInput
        name="confirmPassword"
        control={control}
        placeholder="Повтор пароля"
      />

      <View style={styles.requirementsBlock}>
        <Text style={[textStyles.text_14m, { color: palette.GRAY_800 }]}>
          Требование к паролю
        </Text>
        {requirements.map(req => (
          <View key={req.id} style={styles.reqRow}>
            <Icon
              name="checkmark-circle-sharp"
              size={16}
              color={req.isValid ? palette.GREEN_500 : palette.GRAY_300}
            />

            <Text style={styles.reqText}>{req.text}</Text>
          </View>
        ))}
      </View>

      <Spacing height={32} />

      <TranslinePressable
        onPress={handleSubmit(onProfileSubmitHandler)}
        style={{
          backgroundColor: isValid ? palette.blue : palette.BLUE_LIGHT,
        }}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Готово</Text>
      </TranslinePressable>
    </ScrollView>
  );
};

export default Registration_Step_4;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 24 },
  textContainer: {
    gap: 8,
  },
  buttonText: { ...textStyles.text_16r, color: 'white' },
  requirementsBlock: {
    gap: 16,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqDot: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    width: 14,
    textAlign: 'center',
  },
  reqText: {
    ...textStyles.text_14l,
    color: palette.GRAY_800,
  },
  dotValid: { color: '#2e7d32' },
  textValid: { color: '#2e7d32', fontWeight: '500' },
  dotInvalid: { color: '#9e9e9e' },
  textInvalid: { color: '#757575' },
});
