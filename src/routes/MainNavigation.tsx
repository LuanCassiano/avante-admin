import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const { Navigator, Screen } = createBottomTabNavigator();

import HomeScreen from '../screens/Home/Home';
import TeacherListScreen from '../screens/Teacher/TeacherList/TeacherList';

import HeadOfficeStack from './HeadOfficeStack/HeadOfficeStack';
import { Colors } from '../global/Colors';

export default function MainNavigation() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="HeadOfficeNav"
        component={HeadOfficeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HeadOfficeList';

          const hideOnScreens = ['HeadOfficeForm'];
          const shouldHideTabBar = hideOnScreens.includes(routeName);

          return {
            tabBarStyle: shouldHideTabBar ? { display: 'none' } : undefined,
            title: 'Locais de Treino',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="building"
                size={size}
                color={color}
              />
            ),
          }
        }}
      />
    </Navigator>
  );
}
