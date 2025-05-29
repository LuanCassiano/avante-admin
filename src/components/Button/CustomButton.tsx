import React from 'react';
import { Text, TextStyle, TouchableOpacity } from 'react-native';
import { Colors } from '../../global/Colors';
import { getCustomButtonStyle, getCustomButtonTitleStyle } from './CustomButton.styles';

type TCustomButtonProps = {
  title?: string;
  buttonBgColor?: string;
  buttonTitleColor?: string;
  buttonTitleSize?: number;
  buttonTitleFontStyle?: TextStyle['fontWeight'];
  onButtonPress(): void;
}

export default function CustomButton({
  buttonBgColor = Colors.PRIMARY,
  buttonTitleColor = Colors.WHITE,
  buttonTitleFontStyle = 'normal',
  buttonTitleSize = 16,
  onButtonPress,
  title = "Default button"
}: TCustomButtonProps) {
  return (
    <TouchableOpacity 
      style={getCustomButtonStyle(buttonBgColor)}
      onPress={onButtonPress}
      testID='TouchableOpacity'
    >
      <Text 
        style={
          getCustomButtonTitleStyle(
            buttonTitleColor,
            buttonTitleSize,
            buttonTitleFontStyle
          )
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}