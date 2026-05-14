import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { palette } from '../theme/colors';
import { textStyles } from '../theme/textStyles';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  placeholder?: string;
  showErrors?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  onValidationChange,
  style,
  inputStyle,
  errorStyle,
  placeholder = 'Пароль',
  showErrors = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Validation rules
  const validatePassword = (password: string) => {
    const validationErrors = [];

    if (password.length < 8) {
      validationErrors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      validationErrors.push('At least 1 uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      validationErrors.push('At least 1 lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      validationErrors.push('At least 1 digit');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      validationErrors.push('At least 1 special character');
    }

    setErrors(validationErrors);
    const isValid = validationErrors.length === 0;

    if (onValidationChange) {
      onValidationChange(isValid);
    }

    return isValid;
  };

  const handleTextChange = (text: string) => {
    onChangeText(text);
    validatePassword(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Show label when focused or when there's text
  const showLabel = isFocused || value.length > 0;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={!showLabel ? placeholder : ''}
          placeholderTextColor={palette.GRAY_500}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeButton}
          activeOpacity={0.7}
        >
          <Icon
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={palette.GRAY_800}
          />
        </TouchableOpacity>
      </View>
      {errors.length > 0 && showErrors ? (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={[styles.errorText, errorStyle]}>
              • {error}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    ...textStyles.text_16r,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 16,
    color: '#000',
  },
  eyeButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 2,
  },
});

export default PasswordInput;
