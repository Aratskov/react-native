import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";
import { ButtonForImage } from "../component/ButtonForImage";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Auth/authOperation";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, SetShowPassword] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigation();

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
      setAvatar(pickerResult.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSubmit = () => {
    const userData = {
      avatar,
      password,
      login,
      email,
    };

    dispatch(registerUser(userData));
  };

  return (
    <SafeAreaView style={styles.innerContainer}>
      <View style={styles.imageContainer}>
        {avatar ? (
          <>
            <Image
              source={{ uri: avatar }}
              style={{
                width: 120,
                height: 120,
                position: "absolute",
                borderRadius: 16,
              }}
            />
            <ButtonForImage
              onPress={() => setAvatar(false)}
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
        <View>
          <Input
            value={password}
            setValue={setPassword}
            placeholder="Пароль"
            last={true}
            secureTextEntry={showPassword}
          />
          <Text
            onPress={() => SetShowPassword(!showPassword)}
            style={styles.securityText}
          >
            {showPassword ? "Показати" : "Cховати"}
          </Text>
        </View>
      </View>

      <MainButton title="Зареєстуватися" onPress={handleSubmit} />

      <MainButton
        title="Вже є акаунт? Увійти"
        type="SECOND"
        onPress={() => navigate.navigate("Login")}
      />
    </SafeAreaView>
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

    zIndex: 999,
  },
  wrap: {
    marginBottom: 40,
  },
  securityText: {
    position: "absolute",
    right: 16,
    top: 16,
    fontFamily: "Roboto_400Regular",
    color: "#1B4371",
  },
});
