import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./config";

import { AuthForm } from "./src/component/AuthFormUni";
import { Home } from "./src/screens/Home";
import { MapScreen } from "./src/screens/MapScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

const HomeStack = createStackNavigator();

const HomeLayout = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: " " }}
      />
      <HomeStack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
      <HomeStack.Screen
        name="Comment"
        component={CommentsScreen}
        options={{ title: "Коментарі" }}
      />
    </HomeStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged(FIREBASE_AUTH, (user) => setUser(user));
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {/* Аналог Routes */}
        {user ? (
          <MainStack.Screen
            name="HomeLayout"
            component={HomeLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <MainStack.Screen
              name="Registration"
              component={AuthForm}
              options={{ headerShown: false }}
            />
            {/* Аналог Route */}
            <MainStack.Screen
              name="Login"
              component={AuthForm}
              options={{ headerShown: false }}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
