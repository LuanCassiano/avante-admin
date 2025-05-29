import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useToast } from '../../hooks/useToast';

export default function SignUp() {
  const { success } = useToast();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => success('Sucesso')}>
        <Text>Toast sucesso</Text>
      </TouchableOpacity>
    </View>
  )
}
