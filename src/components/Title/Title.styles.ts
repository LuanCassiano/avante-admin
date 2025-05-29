import { TextStyle } from "react-native";

export const getTitleStyle = (textColor: string, textSize: number, fontStyle: TextStyle['fontWeight']): TextStyle => ({
  color: textColor,
  fontSize: textSize,
  fontWeight: fontStyle,
  marginVertical: 10,
})
