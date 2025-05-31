import { ActivityIndicator } from "react-native";
import { Colors } from "../../global/Colors";

export default function Loading() {
  return (
    <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ flex: 1 }} />
  );
}