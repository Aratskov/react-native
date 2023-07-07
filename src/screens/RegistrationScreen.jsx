import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";
import { ButtonForImage } from "../component/ButtonForImage";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const onSignInPressed = () => {
    console.warn({ login, email, password });
  };

  const onLoginInPressed = () => {
    console.warn("Вже є акаунт? Увійти");
  };

  const selectDoc = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Gallery permission denied");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  console.log(image);

  return (
    <View style={styles.innerContainer}>
      <View style={styles.imageContainer}>
        {image ? (
          <>
            <Image
              source={{ uri: image }}
              style={{
                width: 120,
                height: 120,
                position: "absolute",
                borderRadius: 16,
              }}
            />
            <ButtonForImage
              onPress={() => setImage(false)}
              symbol="x"
              type="SECOND"
            />
          </>
        ) : (
          <ButtonForImage onPress={selectDoc} symbol="+" />
        )}
      </View>
      <MainTitle title="Реєстрація" padding={true} />
      {/* <ActivityIndicator size="large" /> */}
      <View style={styles.wrap}>
        <Input value={login} setValue={setLogin} placeholder="Логін" />
        <Input
          value={email}
          setValue={setEmail}
          placeholder="Адреса електронної пошти"
        />
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Пароль"
          last={true}
        />
      </View>

      <MainButton title="Зареєстуватися" onPress={onSignInPressed} />
      <MainButton
        title="Вже є акаунт? Увійти"
        type="SECOND"
        onPress={onLoginInPressed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E8E8E8",
    borderRadius: 16,
    padding: 20,
  },
  wrap: {
    marginBottom: 40,
  },
});
