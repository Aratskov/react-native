import {
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { RegistrationScreen } from "../screens/RegistrationScreen/";
import { LoginScreen } from "../screens/LoginScreen/";
import Background from "../../assets/bg.png";

import { useRoute } from "@react-navigation/native";

export const AuthForm = () => {
  const currentNavigate = useRoute().name;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-150}
        behavior="padding"
        style={styles.container}
      >
        <ImageBackground
          source={Background}
          resizeMode="stretch"
          style={styles.image}
        >
          <View style={styles.form}>
            {currentNavigate === "Registration" ? (
              <RegistrationScreen />
            ) : (
              <LoginScreen />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    // paddingTop: 160,
    paddingBottom: 45,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
});
