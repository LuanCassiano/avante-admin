import React from 'react';

import SignInScreen from '../screens/SignIn/SignIn';

import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
}

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Navigator
      screenOptions={{
        header: () => <></>
      }}
    >
      <Screen name="SignIn" component={SignInScreen} />
    </Navigator>
  )
}
