import { StyleSheet } from "react-native";
import { Colors } from "../../global/Colors";

export const styles = StyleSheet.create({
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputAlignment: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },

  inputContainerError: {
    marginTop: -5,
    marginRight: 0,
    marginBottom: 15,
    marginLeft: 0,
  },

  inputTextError: {
    fontSize: 16,
    color: Colors.ERROR,
    fontWeight: 'bold',
  }
});

export const getInputContainerStyle = (error?: string, touched?: boolean) => ({
  backgroundColor: Colors.WHITE,
  borderWidth: 1,
  borderColor: error && touched ? Colors.ERROR : Colors.PRIMARY,
  borderRadius: 5,
  marginVertical: 10,
  height: 60
});
