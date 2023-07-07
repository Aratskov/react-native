import { StyleSheet, View, Text } from "react-native";

export const MainTitle = ({ title,padding}) => {
  return (
    <View>
      <Text style={[styles.title,padding && {paddingTop:92}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical:32,
    // paddingTop: 92,
    // paddingBottom: 32,

    color: "#212121",

    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
});
