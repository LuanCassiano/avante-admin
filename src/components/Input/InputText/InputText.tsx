import React, { memo } from 'react';
import { TextInput, View } from 'react-native';
import { Colors } from '../../../global/Colors';

type TKeyboardType = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';

type TInputTextProps = {
  placeholderText: string;
  placeholderColorText: string;
  inputValue: string;
  inputRef: React.RefObject<TextInput | null>;
  inputTextType: TKeyboardType;
  onTextChange(value: string): void;
  inputName: string;
  fieldTouched?: (field: string) => void;
  touched?: boolean;
  error?: string;
  isPasswordField: boolean;
}

function InputText({
  inputName,
  inputRef,
  inputTextType,
  inputValue,
  isPasswordField,
  onTextChange,
  placeholderColorText,
  placeholderText,
  error,
  fieldTouched,
  touched
}: TInputTextProps) {
  return (
    <>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={placeholderColorText}
        autoCapitalize='none'
        autoCorrect={false}
        value={inputValue}
        ref={inputRef}
        returnKeyType='next'
        keyboardType={inputTextType}
        secureTextEntry={isPasswordField}
        onChangeText={(text: string) => {
          onTextChange(text)
        }}
        style={{
          padding: 20,
          color: Colors.PRIMARY,
          fontSize: 16,
          fontFamily: 'System',
          flexGrow: 1,
          minWidth: 0,
        }}
      />
    </>
  )
}

export const InputTextMemo = memo(InputText)
