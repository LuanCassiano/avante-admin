import { StyleProp, TextStyle, ViewStyle } from "react-native";

export const getCustomButtonStyle = (
  bgColor: string,
): StyleProp<ViewStyle> => ({
  backgroundColor: bgColor,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  borderRadius: 50,
  marginVertical: 10,
});

export const getCustomButtonTitleStyle = (
  textColor: string,
  textSize: number,
  fontStyle: TextStyle['fontWeight']
): TextStyle => ({
  color: textColor,
  fontSize: textSize,
  fontWeight: fontStyle,
});
