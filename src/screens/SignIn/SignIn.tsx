import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Formik } from 'formik';

import * as Yup from 'yup';

import InputContainer from '../../components/Input/Input';

import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../global/Colors';
import { InputTextMemo } from '../../components/Input/InputText/InputText';
import { emailSchema, passwordSchema } from '../../utils/inputValidations';
import { useSignIn } from '../../hooks/useSignIn';

const signInSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
})

export default function SignIn() {
  const { signIn } = useSignIn();

  const refInput = useRef<TextInput | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordController = useCallback(() => {
    setShowPassword(prev => !prev);
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={60}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >

          <Text
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: Colors.PRIMARY,
              marginVertical: 10,
            }}
          >
            Login
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'normal',
              color: Colors.SECONDARY,
              marginVertical: 10,
            }}
          >
            Bem-vindo ao App Avante Voleibol - Admin
          </Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => signIn({ email: values.email, password: values.password})}
            validationSchema={signInSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <>
                <InputContainer
                  touched={touched.email}
                  error={errors.email}
                  leftIcon={<FontAwesome5 name="user-alt" size={20} color={Colors.PRIMARY} />}
                >
                  <InputTextMemo
                    inputValue={values.email}
                    inputName='email'
                    onTextChange={handleChange('email')}
                    placeholderColorText={Colors.PRIMARY}
                    placeholderText='Digite seu e-mail'
                    isPasswordField={false}
                    inputTextType='email-address'
                    inputRef={refInput}
                  />
                </InputContainer>

                <InputContainer
                  touched={touched.password}
                  error={errors.password}
                  leftIcon={<FontAwesome5 name="lock" size={20} color={Colors.PRIMARY} />}
                  rightIcon={showPassword ? 
                    <FontAwesome5 name="eye" size={20} color={Colors.PRIMARY} />
                    :
                    <FontAwesome5 name="eye-slash" size={20} color={Colors.PRIMARY} />
                  }
                  pressable={showPasswordController}
                >
                  <InputTextMemo
                    inputValue={values.password}
                    inputName='password'
                    onTextChange={handleChange('password')}
                    placeholderColorText={Colors.PRIMARY}
                    placeholderText='Digite sua senha'
                    isPasswordField={!showPassword}
                    inputTextType='default'
                    inputRef={refInput}
                  />
                </InputContainer>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                    borderRadius: 50,
                    marginVertical: 10,
                  }}
                  onPress={() => handleSubmit()}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.WHITE,
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Entrar
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
