import React from 'react';

import HomeScreen from '../screens/Home/Home';

import { createStackNavigator } from '@react-navigation/stack';
import { GlobalParamList } from './types';

const { Navigator, Screen } = createStackNavigator<GlobalParamList>();

export default function AppStack() {
  return (
    <Navigator
      screenOptions={{
        header: () => <></>
      }}
    >
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  )
}
