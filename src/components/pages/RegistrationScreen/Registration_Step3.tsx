import React from 'react';
import { Text, View, StyleSheet, Switch, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { textStyles } from '../../theme/textStyles';
import { profileSchema } from '../../../utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '../../../store/hooks';
import { BaseInput } from '../../atoms/BaseInput';
import { DropdownInput } from '../../atoms/DropdownInput';
import { DateInput } from '../../atoms/DateInput';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';
import Spacing from '../../atoms/Spacing';

interface Registration_Step_3Props {}

const countries = [
  { label: 'Казахстан', value: 'KZ' },
  { label: 'Россия', value: 'RU' },
];
const Registration_Step_3 = (props: Registration_Step_3Props) => {
  const navigation = useNavigation();
  const { draft } = useAppSelector(state => state.auth);
  const { bottom } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      citizenship: '',
      phone: draft?.phone || '',
      iin: '',
      docNumber: '',
      docIssuedBy: '',
      isCarrier: false,
      driverLicense: '',
      driverCategory: '',
    },
    mode: 'onChange',
  });

  const isCarrier = watch('isCarrier');

  const onProfileSubmitHandler = () => {
    navigation.navigate('Registration_Step4');
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 16 }]}
    >
      <View style={styles.textContainer}>
        <Text style={textStyles.text_24b}>Данные пользователя</Text>
        <Text style={textStyles.text_16l}>Заполните Ваши личные данные</Text>
      </View>

      <Spacing height={24} />

      <View>
        <BaseInput name="fullName" control={control} placeholder="ФИО" />
        <DateInput
          name="birthDate"
          control={control}
          placeholder="Дата рождения"
        />
        <DropdownInput
          name="citizenship"
          control={control}
          placeholder="Гражданство"
          data={countries}
        />
        <BaseInput
          name="phone"
          control={control}
          placeholder="Телефон"
          editable={false}
        />

        <BaseInput name="iin" control={control} placeholder="ИИН (12 цифр)" />
        <BaseInput
          name="docNumber"
          control={control}
          placeholder="Серия и номер удостоверения"
        />
        <DateInput
          name="docIssueDate"
          control={control}
          placeholder="Дата выдачи документа"
        />
        <BaseInput
          name="docIssuedBy"
          control={control}
          placeholder="Кем выдано"
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Я являюсь перевозчиком</Text>
          <Controller
            control={control}
            name="isCarrier"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>

        {/* Дополнительные поля для перевозчика */}
        {isCarrier && (
          <View style={styles.carrierSection}>
            <Text style={styles.sectionTitle}>Водительское удостоверение</Text>
            <BaseInput
              name="driverLicense"
              control={control}
              placeholder="Номер водительского удостоверения"
            />
            <BaseInput
              name="driverCategory"
              control={control}
              placeholder="Категория (например, B, C)"
            />
            <DateInput
              name="driverLicenseDate"
              control={control}
              placeholder="Дата выдачи ВУ"
            />
          </View>
        )}
      </View>

      <TranslinePressable
        onPress={handleSubmit(onProfileSubmitHandler)}
        style={{
          backgroundColor: isValid ? palette.blue : palette.BLUE_LIGHT,
        }}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Продолжить</Text>
      </TranslinePressable>
    </ScrollView>
  );
};

export default Registration_Step_3;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 24 },
  textContainer: {
    gap: 8,
  },
  buttonText: { ...textStyles.text_16r, color: 'white' },
  sectionTitle: {
    ...textStyles.text_16b,
    marginVertical: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  switchLabel: { ...textStyles.text_16l },
  carrierSection: { width: '100%' },
  buttonWrapper: { marginTop: 24, marginBottom: 40 },
});
