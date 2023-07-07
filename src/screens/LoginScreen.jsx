import { StyleSheet, View } from "react-native";
import { useState } from "react";

import { MainButton } from "../component/Button";
import { Input } from "../component/Input";
import { MainTitle } from "../component/Title";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Пароль"
          last={true}
          secureTextEntry={true}
        />
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
});
