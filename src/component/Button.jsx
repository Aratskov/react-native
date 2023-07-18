import { TouchableOpacity, StyleSheet, Text } from "react-native";

export const MainButton = ({ title = "", type = "PRIMARY", onPress, disabled }) => {
  const buttonStyle = disabled ? styles.button_DISABLED : styles[`button_${type}`];
  const textColor = disabled ? styles.buttonText_DISABLED : styles[`buttonText_${type}`];
  

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textColor ]}>
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
  button_DISABLED: {
  backgroundColor:"#F6F6F6"
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
  buttonText_DISABLED: {
  color:"#BDBDBD"
  }
  
});
