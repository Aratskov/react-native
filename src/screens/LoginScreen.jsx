import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";

import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, SetShowPassword] = useState(true);

  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn({ email, password });
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
      <MainButton title="Увійти" onPress={() => navigation.navigate("Home")} />

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
