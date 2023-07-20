import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/Auth/authOperation";

export const BackButton = ({ icon }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Ionicons
      name={icon}
      color="#212121"
      size={24}
      style={styles.backButton}
      onPress={handlePress}
    />
  );
};

export const LogOutButton = ({ icon }) => {
  const dispatch = useDispatch();

  return (
    <Ionicons
      name={icon}
      color="#212121"
      size={24}
      style={styles.backButton}
      onPress={() => dispatch(logoutUser())}
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    // flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,

    opacity: 0.8,
  },
});
