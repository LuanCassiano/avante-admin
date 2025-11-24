import { StyleSheet } from "react-native";
import { Colors } from "../../../global/Colors";

export const styles = StyleSheet.create({
  itemListContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },

  itemListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemListActionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 120,
    gap: 10,
  },
});
