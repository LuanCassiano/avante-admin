import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./FAB.styles";
import { TFABProps } from "./FAB.types";

function RoundedButton ({ onPressButton }: TFABProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPressButton}
      style={styles.fab}
    >
      <MaterialIcons name="add" size={24} color="white" />
    </TouchableOpacity>
  )
}

export const FAB = memo(RoundedButton);
