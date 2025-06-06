import { Text } from "react-native";
import { styles } from "./ListItemTitle.styles";

export default function ListItemTitle({ title }: { title: string }) {
  return (
    <Text style={styles.listItemTitle}>
      {title}
    </Text>
  );
}