import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { codeSchema } from '../../../utils/schemas';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import { textStyles } from '../../theme/textStyles';
import { useAppSelector } from '../../../store/hooks';
import Spacing from '../../atoms/Spacing';
import { OtpInput } from '../../molecules/OtpInput';

const Registration_Step_2 = () => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const { draft } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(codeSchema),
  });

  const onCodeSubmitHandler = () => {
    navigation.navigate('Registration_Step3');
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <View style={styles.textContainer}>
        <Text style={textStyles.text_24b}>Подтверждение номера телефона</Text>
        <Text style={textStyles.text_16l}>
          Введите код из SMS, отправленный{'\n'}на номер {draft?.phone || ''}
        </Text>
      </View>

      <Spacing height={24} />

      <View>
        <OtpInput name="code" control={control} />
      </View>

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

export default Registration_Step_2;

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
