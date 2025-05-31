import { Text } from "react-native";
import { styles } from "./ListItemLabel.styles";

export default function ListItemLabel({ label }: { label: string }) {
  return (
    <Text style={styles.itemListLabel}>
      {label}
    </Text>
  );
}