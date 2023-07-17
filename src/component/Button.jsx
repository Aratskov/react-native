import { TouchableOpacity, StyleSheet, Text } from "react-native";

export const MainButton = ({ title = "", type = "PRIMARY", onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles[`button_${type}`]]}
    >
      <Text style={[styles.buttonText, styles[`buttonText_${type}`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  button_PRIMARY: {
    backgroundColor: "#FF6C00",
  },

  buttonText: {
    margin: 0,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    textAlign: "center",
  },
  buttonText_SECOND: {
    color: "#1B4371",
  },
});
