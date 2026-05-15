import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';

interface BaseInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  editable?: boolean;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  name,
  control,
  placeholder,
  editable = true,
}) => (
  <View style={styles.container}>
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={[
              styles.input,
              !editable && styles.disabledInput,
              error && styles.inputError,
            ]}
            value={typeof value === 'boolean' ? '' : (value as string)}
            onChangeText={onChange}
            onBlur={onBlur}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={palette.GRAY_500}
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
  input: {
    ...textStyles.text_16l,
    borderRadius: 16,
    padding: 12,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
    borderColor: palette.GRAY_LIGHT,
    borderWidth: 1,
  },
  inputError: { borderColor: '#ff4d4f' },
  errorText: {
    ...textStyles.text_10l,
    color: '#ff4d4f',
    fontSize: 11,
    marginTop: 2,
  },
});
