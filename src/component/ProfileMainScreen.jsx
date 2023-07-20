import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSelect";

export const ProfileMainScreen = () => {
  const { avatar, email, login } = useSelector(selectUser);

  return (
    <View style={styles.userWrap}>
      <Image source={avatar ? { uri: avatar } : null} style={styles.avatar} />
      <View>
        <Text style={styles.textName}>{login}</Text>
        <Text style={styles.textEmail}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginVertical:32
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
  },
  textName: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto_700Bold",
  },
  textEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
  },
});
