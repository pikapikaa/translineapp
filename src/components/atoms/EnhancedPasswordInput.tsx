import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import Icon from '@react-native-vector-icons/ionicons';

import { palette } from '../theme/colors';
import { textStyles } from '../theme/textStyles';

interface EnhancedPasswordInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export const EnhancedPasswordInput: React.FC<EnhancedPasswordInputProps> = ({
  name,
  control,
  placeholder,
}) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View style={[styles.inputContainer, error && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={isSecure}
                placeholder={placeholder}
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Pressable
                onPress={() => setIsSecure(!isSecure)}
                style={styles.eyeButton}
              >
                <Icon
                  name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={palette.GRAY_800}
                />
              </Pressable>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15, width: '100%' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#fff',
    height: 48,
  },
  input: {
    ...textStyles.text_16l,
    flex: 1,
    paddingHorizontal: 12,
    color: palette.GRAY_800,
  },
  inputError: { borderColor: '#ff4d4f' },
  eyeButton: {
    paddingHorizontal: 14,
    height: '100%',
    justifyContent: 'center',
  },
  eyeText: { fontSize: 18 },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  requirementsBlock: { marginTop: 12, paddingHorizontal: 4 },
  reqRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  reqDot: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    width: 14,
    textAlign: 'center',
  },
  reqText: { fontSize: 13 },
  dotValid: { color: '#2e7d32' },
  textValid: { color: '#2e7d32', fontWeight: '500' },
  dotInvalid: { color: '#9e9e9e' },
  textInvalid: { color: '#757575' },
});
