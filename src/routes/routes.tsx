import React from 'react';

import SignInScreen from '../screens/SignIn/SignIn';
import SignUpScreen from '../screens/SignUp/SignUp';

import { createStackNavigator } from '@react-navigation/stack';
import { GlobalParamList } from './types';

const { Navigator, Screen } = createStackNavigator<GlobalParamList>();

export default function RootNavigator() {
  return (
    <Navigator
      screenOptions={{
        header: () => <></>
      }}
    >
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  )
}
