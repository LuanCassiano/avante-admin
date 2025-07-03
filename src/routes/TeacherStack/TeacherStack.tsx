import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import TeacherListScreen from '../../screens/Teacher/TeacherList/TeacherList';
import TeacherFormScreen from '../../screens/Teacher/TeacherForm/TeacherForm';
import TeacherDetailScreen from '../../screens/Teacher/TeacherDetail/TeacherDetail';

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
        name="TeacherList"
        component={TeacherListScreen}
        options={{
          title: 'Professores',
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
        name="TeacherForm" 
        component={TeacherFormScreen}
        options={{
          title: 'Professores',
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

      <Screen
        name="TeacherDetail" 
        component={TeacherDetailScreen}
        options={{
          title: 'Professores',
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
