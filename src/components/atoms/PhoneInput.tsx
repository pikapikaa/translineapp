import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';

interface PhoneInputProps {
  name: string;
  control: Control<any>;
  withCountryCode: boolean;
  placeholder?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  control,
  withCountryCode,
  placeholder = '(000) 000-00-00',
}) => {
  const mask = withCountryCode ? '+7 (999) 999-99-99' : '(999) 999-99-99';

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    ...textStyles.text_16l,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#000',
    backgroundColor: '#fff',
  },
});
