import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

import { Formik } from 'formik';

import * as Yup from 'yup';

import InputContainer from '../../components/Input/Input';
import { InputTextMemo } from '../../components/Input/InputText/InputText';
import Title from '../../components/Title/Title';

import { FontAwesome5 } from '@expo/vector-icons';

import { Colors } from '../../global/Colors';

import { emailSchema, passwordSchema } from '../../utils/inputValidations';

import { useSignIn } from '../../hooks/useSignIn';

import { styles } from './SignIn.styles';
import CustomButton from '../../components/Button/CustomButton';


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
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Title
            fontStyle="bold"
            textColor={Colors.PRIMARY}
            textSize={48}
            title='Login'
          />

          <Title
            fontStyle="normal"
            textColor={Colors.SECONDARY}
            textSize={16}
            title='Bem-vindo ao App Avante Voleibol - Admin'
          />

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

                <CustomButton
                  title='Entrar'
                  buttonBgColor={Colors.PRIMARY}
                  buttonTitleColor={Colors.WHITE}
                  buttonTitleFontStyle="bold"
                  buttonTitleSize={16}
                  onButtonPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
