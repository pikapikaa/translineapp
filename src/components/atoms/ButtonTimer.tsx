import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';

import { palette } from '../theme/colors';
import { textStyles } from '../theme/textStyles';

export default function ButtonTimer() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const timerRef = useRef(null);

  const startTimer = () => {
    setSecondsLeft(60);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Код отправлен повторно', ToastAndroid.SHORT);
    } else {
      Alert.alert('Данные сохранены');
    }

    startTimer();
  };

  const isButtonActive = secondsLeft === 0;

  return (
    <View style={styles.container}>
      {isButtonActive ? (
        <TouchableOpacity style={styles.activeButton} onPress={handleResend}>
          <Text style={styles.activeButtonText}>Отправить код повторно</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.noactive}>
          <Text style={styles.timerText}>
            Отправить код повторно через{' '}
            <Text style={styles.timeDigits}>{formatTime(secondsLeft)}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timerText: {
    ...textStyles.text_16l,
    color: palette.GRAY_300,
  },
  timeDigits: {
    ...textStyles.text_16l,
    color: palette.GRAY_300,
  },
  activeButton: {
    borderWidth: 1,
    borderColor: palette.GRAY_300,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  activeButtonText: {
    ...textStyles.text_16l,
    color: palette.GRAY_800,
  },
  noactive: {
    borderWidth: 1,
    borderColor: palette.GRAY_300,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
});
