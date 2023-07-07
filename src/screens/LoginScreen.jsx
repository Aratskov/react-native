import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, SetShowPassword] = useState(true);

  const onSignInPressed = () => {
    console.warn({ email, password });
  };

  const onLoginInPressed = () => {
    console.warn("Немає акаунту? Зареєструватися");
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

      <MainButton title="Увійти" onPress={onSignInPressed} />
      <MainButton
        title="Немає акаунту? Зареєструватися"
        type="SECOND"
        onPress={onLoginInPressed}
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
    color: "#1B4371",
  },
});
