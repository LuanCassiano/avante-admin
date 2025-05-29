import React from 'react';
import { Text, TextStyle } from "react-native";
import { Colors } from "../../global/Colors";
import { getTitleStyle } from "./Title.styles";

export type TTitleProps = {
  textColor?: string;
  textSize?: number;
  fontStyle?: TextStyle['fontWeight'];
  title?: string;
}

export default function Title({
  fontStyle = 'normal',
  textColor = Colors.PRIMARY,
  textSize = 16,
  title = 'Default Title'
}: TTitleProps) {
  return <Text style={getTitleStyle(textColor, textSize, fontStyle)}>{title}</Text>
}
