import {
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";

import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen/";
import Background from "./assets/bg.png";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={-150}
        style={styles.container}
      >
        <ImageBackground
          source={Background}
          resizeMode="stretch"
          style={styles.image}
        >
          <View style={styles.form}>
            <RegistrationScreen />
            {/* <LoginScreen /> */}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

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


// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   TouchableWithoutFeedback, // імпорт компонента обгортки
//   Keyboard, // імпорт компонента клавіатури
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// export default function App() {
//   const [text, setText] = useState("");
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS == "ios" ? "padding" : "height"}
//         >
//           <TextInput
//             placeholder="Type text"
//             value={text}
//             onChangeText={setText}
//           />
//         </KeyboardAvoidingView>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     paddingBottom: 30,
//   },
// });
