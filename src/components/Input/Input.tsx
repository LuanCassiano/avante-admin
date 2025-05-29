import React, { JSX, ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getInputContainerStyle, styles } from './Input.styles';

type TInputContainerProps = {
  children: ReactNode;
  leftIcon: JSX.Element;
  rightIcon?: JSX.Element;
  error?: string;
  touched?: boolean;
  pressable?: () => void;
}

export default function InputContainer({
  children,
  leftIcon,
  touched,
  error,
  pressable,
  rightIcon
}: TInputContainerProps) {
  return (
    <>
      <View style={getInputContainerStyle(error, touched)}>
        <View style={styles.inputContent}>
          {leftIcon}
          {children}
          {rightIcon && (
            <View style={styles.inputAlignment}>
              <TouchableOpacity hitSlop={20} onPress={pressable}>
                {rightIcon}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {error && touched && (
        <View style={styles.inputContainerError}>
          <Text style={styles.inputTextError}>{error}</Text>
        </View>
      )}
    </>
  )
}
