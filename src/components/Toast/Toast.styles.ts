import { StyleSheet } from 'react-native';
import { Colors } from '../../global/Colors';

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },

  toastMessage: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default styles;
