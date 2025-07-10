import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import ClassListScreen from '../../screens/Class/ClassList/ClassList';
import ClassFormScreen from '../../screens/Class/ClassForm/ClassForm';

import { createStackNavigator } from '@react-navigation/stack';
import { GlobalParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../global/Colors';
import { goBack } from '../../service/NavigationService';

const { Navigator, Screen } = createStackNavigator<GlobalParamList>();

export default function TeacherStack() {
  return (
    <Navigator>
      <Screen
        name="ClassList"
        component={ClassListScreen}
        options={{
          title: 'Turmas',
          headerTitleStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
      <Screen
        name="ClassForm" 
        component={ClassFormScreen}
        options={{
          title: 'Turmas',
          headerTitleStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => goBack()}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </Navigator>
  )
}
