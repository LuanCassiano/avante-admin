import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import HeadOfficeListScreen from '../../screens/HeadOffice/HeadOfficeList/HeadOfficeList';
import HeadOfficeFormScreen from '../../screens/HeadOffice/HeadOfficeForm/HeadOfficeForm';
import HeadOfficeDetailScreen from '../../screens/HeadOffice/HeadOfficeDetail/HeadOfficeDetail';

import { createStackNavigator } from '@react-navigation/stack';
import { GlobalParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../global/Colors';
import { goBack } from '../../service/NavigationService';

const { Navigator, Screen } = createStackNavigator<GlobalParamList>();

export default function HeadOfficeStack() {
  return (
    <Navigator>
      <Screen
        name="HeadOfficeList"
        component={HeadOfficeListScreen}
        options={{
          title: 'Locais de Treino',
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
        name="HeadOfficeForm" 
        component={HeadOfficeFormScreen}
        options={{
          title: 'Cadastro de Locais de Treino',
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
        name="HeadOfficeDetail" 
        component={HeadOfficeDetailScreen}
        options={{
          title: 'Informações Locais de Treino',
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
