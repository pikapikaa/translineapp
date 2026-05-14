import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PhoneInput } from '../../atoms/PhoneInput';
import { phoneSchema } from '../../../utils/schemas';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import { textStyles } from '../../theme/textStyles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateDraftForm } from '../../../store/slices/authSlice';
import Spacing from '../../atoms/Spacing';

const Registration_Step_1 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { bottom } = useSafeAreaInsets();

  const { draft } = useAppSelector(state => state.auth);

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(phoneSchema(true)), // true для +7
    defaultValues: { phone: draft?.phone || '' },
  });

  const onCodeSubmitHandler = () => {
    const currentPhone = getValues('phone');
    dispatch(updateDraftForm({ phone: currentPhone || '' }));
    navigation.navigate('Registration_Step2');
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <View style={styles.textContainer}>
        <Text style={textStyles.text_24b}>Подтверждение номера телефона</Text>
        <Text style={textStyles.text_16l}>
          Введите номер телефона для{'\n'}получения SMS с кодом
        </Text>
      </View>

      <Spacing height={24} />

      <PhoneInput name="phone" withCountryCode control={control} />

      <View style={styles.footer}>
        <TranslinePressable
          onPress={handleSubmit(onCodeSubmitHandler)}
          style={{
            backgroundColor: isValid ? palette.blue : palette.BLUE_LIGHT,
          }}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Отправить код</Text>
        </TranslinePressable>
      </View>
    </View>
  );
};

export default Registration_Step_1;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 24 },
  textContainer: { gap: 4 },
  buttonText: { ...textStyles.text_16r, color: 'white' },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});
