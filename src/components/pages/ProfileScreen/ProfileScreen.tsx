import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';

import { signOut, updateUserForm } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { textStyles } from '../../theme/textStyles';
import { BaseInput } from '../../atoms/BaseInput';
import { DateInput } from '../../atoms/DateInput';
import { DropdownInput } from '../../atoms/DropdownInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../../utils/schemas';
import { countries } from '../RegistrationScreen/Registration_Step3';
import { TranslinePressable } from '../../atoms/Pressables';
import { palette } from '../../theme/colors';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { top } = useSafeAreaInsets();

  const { user } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      citizenship: user?.citizenship || '',
      phone: user?.phone || '',
      iin: user?.iin || '',
      docNumber: user?.docNumber || '',
      docIssuedBy: user?.docIssuedBy || '',
      isCarrier: user?.isCarrier || false,
      driverLicense: user?.driverLicense || '',
      driverCategory: user?.driverCategory || '',
      docIssueDate: user?.docIssueDate || undefined,
      birthDate: user?.birthDate || undefined,
      driverLicenseDate: user?.driverLicenseDate || undefined,
    },
    mode: 'onChange',
  });

  const isCarrier = watch('isCarrier');
  const currentFullName = watch('fullName');
  const currentCitizenship = watch('citizenship');
  const currentIin = watch('iin');
  const currentDocNumber = watch('docNumber');
  const currentDocIssueDate = watch('docIssueDate');
  const currentDocIssuedBy = watch('docIssuedBy');
  const currentIsCarrier = watch('isCarrier');
  const currentDriverLicense = watch('driverLicense');
  const currentDriverCategory = watch('driverCategory');
  const currentBirthDate = watch('birthDate');
  const currentDriverLicenseDate = watch('driverLicenseDate');

  const onProfileSubmitHandler = () => {
    const data = {
      fullName: currentFullName,
      citizenship: currentCitizenship,
      iin: currentIin,
      docNumber: currentDocNumber,
      docIssuedBy: currentDocIssuedBy,
      isCarrier: currentIsCarrier,
      driverLicense: currentDriverLicense,
      driverCategory: currentDriverCategory,
      docIssueDate:
        currentDocIssueDate instanceof Date
          ? currentDocIssueDate.toISOString()
          : currentDocIssueDate,
      birthDate:
        currentBirthDate instanceof Date
          ? currentBirthDate.toISOString()
          : currentBirthDate,
      driverLicenseDate:
        currentDriverLicenseDate instanceof Date
          ? currentDriverLicenseDate.toISOString()
          : currentDriverLicenseDate,
    };
    dispatch(updateUserForm({ ...data }));

    if (Platform.OS === 'android') {
      ToastAndroid.show('Данные сохранены', ToastAndroid.SHORT);
    } else {
      Alert.alert('Данные сохранены');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={textStyles.text_24bold}>Profile</Text>

          <Pressable
            onPress={() => {
              dispatch(signOut());
            }}
            style={styles.exitButton}
          >
            <Text style={textStyles.text_12l}>Выйти</Text>
          </Pressable>
        </View>

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
              <Text style={styles.sectionTitle}>
                Водительское удостоверение
              </Text>
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

          <TranslinePressable
            onPress={handleSubmit(onProfileSubmitHandler)}
            style={{
              backgroundColor: isValid ? palette.blue : palette.BLUE_LIGHT,
            }}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Продолжить</Text>
          </TranslinePressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  contentContainer: { paddingBottom: 16 },
  header: { alignItems: 'center', marginBottom: 16 },
  exitButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: { marginRight: 10 },

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
  buttonText: { ...textStyles.text_16r, color: 'white' },
});
