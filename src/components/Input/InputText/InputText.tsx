import React, { memo } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { Colors } from '../../../global/Colors';

type TKeyboardType = KeyboardTypeOptions;

export type TInputTextProps = {
  placeholderText?: string;
  placeholderColorText?: string;
  inputValue?: string;
  inputRef?: React.RefObject<TextInput | null>;
  inputTextType?: TKeyboardType;
  onTextChange(value: string): void;
  isPasswordField?: boolean;
  inputName?: string;
}

function InputText({
  inputRef,
  inputTextType,
  inputValue,
  isPasswordField,
  onTextChange,
  placeholderColorText,
  placeholderText,
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
