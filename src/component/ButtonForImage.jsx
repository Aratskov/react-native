import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export const ButtonForImage = ({ onPress, symbol, type = "PRIMARY" }) => {
  return (
    <TouchableHighlight
      style={[styles.button, styles[`button_${type}`]]}
      onPress={onPress}
    >
      <View style={styles.wrapText}>
        <Text style={[styles.buttonText,styles[`buttonText_${type}`]]}>{symbol}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    // position: "absolute",
    bottom: 55,
    right: -55,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: "25%",
  },
  button_SECOND: {
    borderColor: "#BDBDBD",
    backgroundColor: "#E8E8E8",
  },
  button_PRIMARY: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
  },
  wrapText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FF6C00",
    fontSize: 15,
  },
  buttonText_SECOND: {
    color: "#BDBDBD",
  },
  buttonText_PRIMARY: {
    color: "#FF6C00",
  },
});