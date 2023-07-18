import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";

import { useNavigation } from "@react-navigation/native";

import { FIREBASE_AUTH } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, SetShowPassword] = useState(true);

  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();

  const loginDB = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      alert("Success")
      return credentials.user;
    } catch (error) {
      alert(error);
      throw error;
    }
  };

  return (
    <View>
      <MainTitle title="Увійти" />
      <View style={styles.wrap}>
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

      {/* <MainButton title="Увійти" onPress={onSignInPressed} /> */}
      <MainButton title="Увійти" onPress={loginDB} />

      <MainButton
        title="Немає акаунту? Зареєструватися"
        type="SECOND"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
