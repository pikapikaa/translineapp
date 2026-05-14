import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { textStyles } from '../theme/textStyles';
import { palette } from '../theme/colors';

interface DateInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  name,
  control,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const dateValue = value instanceof Date ? value : null;
          return (
            <>
              <TouchableOpacity
                style={[styles.pickerTrigger, error && styles.inputError]}
                onPress={() => setIsOpen(true)}
              >
                <Text style={dateValue ? styles.text : styles.placeholder}>
                  {dateValue
                    ? dateValue.toLocaleDateString('ru-RU')
                    : placeholder}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isOpen}
                mode="date"
                date={dateValue || new Date()}
                onConfirm={date => {
                  onChange(date);
                  setIsOpen(false);
                }}
                onCancel={() => setIsOpen(false)}
              />
              {error && (
                <Text style={styles.errorText}>{error.message as string}</Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12, width: '100%' },
  pickerTrigger: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
  },
  text: { ...textStyles.text_16l },
  placeholder: { ...textStyles.text_16l, color: palette.GRAY_500 },
  inputError: { borderColor: '#ff4d4f' },
  errorText: { color: '#ff4d4f', fontSize: 11, marginTop: 2 },
});
