import React, { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { palette } from '../theme/colors';
import { textStyles } from '../theme/textStyles';

interface ControlledOtpInputProps {
  name: string;

  control: Control<any>;
}

export const OtpInput: React.FC<ControlledOtpInputProps> = ({
  name,
  control,
}) => {
  const inputsRef = useRef<Array<TextInput | null>>([]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value } }) => {
        const codeArray = (value || '')
          .split('')
          .concat(['', '', '', ''])
          .slice(0, 4);

        const handleChangeText = (text: string, index: number) => {
          const cleanText = text.slice(-1);
          const newCodeArray = [...codeArray];
          newCodeArray[index] = cleanText;

          const updatedValue = newCodeArray.join('');
          onChange(updatedValue);

          if (cleanText && index < 3) {
            inputsRef.current[index + 1]?.focus();
          }
        };

        const handleKeyPress = (
          e: NativeSyntheticEvent<TextInputKeyPressEventData>,
          index: number,
        ) => {
          if (
            e.nativeEvent.key === 'Backspace' &&
            !codeArray[index] &&
            index > 0
          ) {
            const newCodeArray = [...codeArray];
            newCodeArray[index - 1] = '';
            onChange(newCodeArray.join(''));
            inputsRef.current[index - 1]?.focus();
          }
        };

        return (
          <View style={styles.container}>
            {codeArray.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputsRef.current[index] = ref)}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 232,
  },
  input: {
    ...textStyles.text_24bold,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: palette.GRAY_200,
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
});
