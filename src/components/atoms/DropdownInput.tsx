import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';

interface DropdownInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  data: { label: string; value: string }[];
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  name,
  control,
  placeholder,
  data,
}) => (
  <View style={styles.container}>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Dropdown
            style={[styles.dropdown, error && styles.inputError]}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.text}
            itemTextStyle={styles.text}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={typeof value === 'string' ? value : ''}
            onChange={item => onChange(item.value)}
          />
          {error && (
            <Text style={styles.errorText}>{error.message as string}</Text>
          )}
        </>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 12, width: '100%' },
  dropdown: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
    height: 48,
  },
  text: { ...textStyles.text_16l },
  placeholder: { ...textStyles.text_16l, color: palette.GRAY_500 },
  inputError: { borderColor: '#ff4d4f' },
  errorText: { color: '#ff4d4f', fontSize: 11, marginTop: 2 },
});
