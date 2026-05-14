import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from '../components/pages/MainScreen';
import OrdersScreen from '../components/pages/OrdersScreen';
import NotificationsScreen from '../components/pages/NotificationsScreen';
import ProfileScreen from '../components/pages/ProfileScreen';
import OrderCreateScreen from '../components/pages/OrderCreateScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import { palette } from '../components/theme/colors';

// Инициализируем без передачи объекта конфигурации
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: palette.GRAY_800,
        tabBarInactiveTintColor: palette.GRAY_400,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Geologica-Light',
          padding: 0,
          lineHeight: 10 * 1.4,
        },
        tabBarStyle: { height: 90, backgroundColor: '#fff', paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Заказы',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="OrderCreate"
        component={OrderCreateScreen}
        options={{
          title: 'Создать заказ',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Уведомления',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
