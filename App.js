import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts,Roboto_500Medium,Roboto_400Regular} from "@expo-google-fonts/roboto";


import { AuthForm } from "./src/component/AuthFormUni";
import { Home } from "./src/screens/Home";
import { MapScreen } from "./src/screens/MapScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,Roboto_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {/* Аналог Routes */}
        <MainStack.Screen name="Registration" component={AuthForm} options={{headerShown:false}} />
        {/* Аналог Route */}
        <MainStack.Screen name="Login" component={AuthForm} options={{headerShown:false}}/>
        <MainStack.Screen name="Home" component={Home}  options={{headerShown:false,title:" "}}/>
        <MainStack.Screen name="Map" component={MapScreen} options={{ title: "Карта" }} />
        <MainStack.Screen name="Comment" component={CommentsScreen} options={{title:"Коментарі"}} />
        
      
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
