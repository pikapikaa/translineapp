import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Registration_Step1 from './Registration_Step1';
import Registration_Step2 from './Registration_Step2';
import Registration_Step3 from './Registration_Step3';
import Registration_Step4 from './Registration_Step4';
import { palette } from '../../theme/colors';
import Header from '../../molecules/Header';
import Spacing from '../../atoms/Spacing';
import { useAppSelector } from '../../../store/hooks';

const Stack = createNativeStackNavigator();

const RegistrationScreen = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { draft } = useAppSelector(state => state.auth);

  const hasDraft = draft?.code !== '';

  const onBackPressHadler = (index: number) => {
    switch (index) {
      case 1:
        navigation.canGoBack()
          ? navigation.goBack()
          : navigation.navigate('SignIn');
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

  const { t } = useTranslation();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Header
        title={t('registration')}
        onClose={() => {
          navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate('SignIn');
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
              index + 1 <= currenPage && styles.active,
            ]}
          />
        ))}
      </View>

      <Stack.Navigator
        initialRouteName={
          hasDraft ? 'Registration_Step3' : 'Registration_Step_One'
        }
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
