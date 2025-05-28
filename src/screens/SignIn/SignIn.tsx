import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from '../../hooks/useToast';
import { useSignIn } from '../../hooks/useSignIn';

export default function SignIn () {
  const { success } = useToast();
  const { signUp } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) return;

    await signUp({ email, name: 'Luan', password });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder='Senha'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={{ marginVertical: 10 }}
      />
      
      <TouchableOpacity onPress={() => handleSignUp()}>
        <Text>Toast sucesso</Text>
      </TouchableOpacity>
    </View>
  )
}
