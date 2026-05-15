import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import Ionicons from '@react-native-vector-icons/ionicons';

import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';
import CountriesModal, { COUNTRIES } from '../pages/modals/CountriesModal';

interface PhoneInputProps {
  name: string;
  control: Control<any>;
  withCountryCode: boolean;
  placeholder?: string;
}

export const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  name,
  control,
  withCountryCode,
  placeholder = '(000) 000-00-00',
}) => {
  const mask = withCountryCode ? '+7 (999) 999-99-99' : '(999) 999-99-99';
  const [isVisible, setIsVisible] = React.useState(false);
  const [country, setCountry] = React.useState(COUNTRIES[0]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text style={styles.flag}>{country.flag}</Text>
          <Text style={styles.countryCode}>{country.code}</Text>
          <Ionicons name="chevron-down" size={15} color={palette.BLACK} />
        </TouchableOpacity>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedTextInput
              mask={mask}
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              keyboardType="phone-pad"
              style={[styles.input]}
              placeholder={placeholder || mask}
              placeholderTextColor={palette.GRAY_500}
            />
          )}
        />
      </View>
      <CountriesModal
        isVisible={isVisible}
        onSelect={country => {
          setCountry(country);
          setIsVisible(false);
        }}
        onClose={() => {
          setIsVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    ...textStyles.text_16l,
    flex: 1,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    alignSelf: 'stretch',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  countryCode: {
    ...textStyles.text_16l,
    marginRight: 10,
    color: palette.BLACK,
  },
  flag: { marginRight: 4 },
});
