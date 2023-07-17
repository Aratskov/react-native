import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({
  value,
  setValue,
  placeholder,
  last,
  secureTextEntry,
  type="PRIMARY"
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = [styles.input,styles[`input_${type}`],isFocused && styles.inputFocus];
  if (last) {
    inputStyle.push(styles.lastInput);
  }

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    marginBottom: 16,

    fontSize: 16,
    color: "#212121",
    
    borderColor: "#E8E8E8",
  },
  input_PRIMARY: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1, 
    borderRadius: 10,
  },
  inputFocus: {
    backgroundColor: "#FFF",
    borderColor: "#FF6C00",
  },
  lastInput: {
    marginBottom: 0,
  },
  input_AddPost: {
    backgroundColor: "#FFF",
  borderBottomWidth:1,
  }
});
