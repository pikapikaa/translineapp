import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Registration_Step1 from './Registration_Step1';
import Registration_Step2 from './Registration_Step2';
import Registration_Step3 from './Registration_Step3';
import Registration_Step4 from './Registration_Step4';
import { palette } from '../../theme/colors';
import Header from '../../molecules/Header';
import Spacing from '../../atoms/Spacing';

const Stack = createNativeStackNavigator();

const RegistrationScreen = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const onBackPressHadler = (index: number) => {
    switch (index) {
      case 1:
        navigation?.goBack();
        break;
      case 2:
        navigation.navigate('Registration', {
          screen: 'Registration_Step_One',
        });
        break;
      case 3:
        navigation.navigate('Registration', {
          screen: 'Registration_Step2',
        });
        break;
      case 4:
        navigation.navigate('Registration', {
          screen: 'Registration_Step3',
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Header
        title="Регистрация"
        onClose={() => {
          navigation?.goBack();
        }}
        style={{ paddingHorizontal: 16 }}
        onPrevious={() => {
          onBackPressHadler(currenPage);
        }}
      />
      <Spacing height={40} />
      <View style={styles.slider}>
        {[1, 2, 3, 4].map((item, index) => (
          <View
            key={`${item}`}
            style={[
              styles.sliderItem,
              index + 1 === currenPage && styles.active,
            ]}
          />
        ))}
      </View>

      <Stack.Navigator
        initialRouteName="Registration_Step_One"
        screenOptions={{
          animation: 'none',
          headerShown: false,
        }}
      >
        <Stack.Screen
          listeners={{
            focus: () => {
              setCurrentPage(1);
            },
          }}
          name="Registration_Step_One"
          component={Registration_Step1}
        />
        <Stack.Screen
          listeners={{
            focus: () => {
              setCurrentPage(2);
            },
          }}
          name="Registration_Step2"
          component={Registration_Step2}
        />
        <Stack.Screen
          listeners={{
            focus: () => {
              setCurrentPage(3);
            },
          }}
          name="Registration_Step3"
          component={Registration_Step3}
        />
        <Stack.Screen
          listeners={{
            focus: () => {
              setCurrentPage(4);
            },
          }}
          name="Registration_Step4"
          component={Registration_Step4}
        />
      </Stack.Navigator>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  slider: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  sliderItem: {
    width: 80,
    height: 4,
    borderRadius: 100,
    backgroundColor: palette.GRAY_LIGHT,
  },
  active: {
    backgroundColor: palette.blue,
  },
});
