import React from 'react';
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const { Navigator, Screen } = createBottomTabNavigator();

import HomeScreen from '../screens/Home/Home';

import HeadOfficeStack from './HeadOfficeStack/HeadOfficeStack';
import TeacherStack from './TeacherStack/TeacherStack';
import ClassStack from './ClassStack/ClassStack';

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

      <Screen
        name="TeacherNav"
        component={TeacherStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'TeacherList';

          const hideOnScreens = ['TeacherForm'];
          const shouldHideTabBar = hideOnScreens.includes(routeName);

          return {
            tabBarStyle: shouldHideTabBar ? { display: 'none' } : undefined,
            title: 'Professores',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="user-tie"
                size={size}
                color={color}
              />
            ),
          }
        }}
      />

      <Screen
        name="ClassNav"
        component={ClassStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'TeacherList';

          const hideOnScreens = ['ClassForm'];
          const shouldHideTabBar = hideOnScreens.includes(routeName);

          return {
            tabBarStyle: shouldHideTabBar ? { display: 'none' } : undefined,
            title: 'Turmas',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="google-classroom"
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
