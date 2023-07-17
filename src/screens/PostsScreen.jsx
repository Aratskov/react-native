import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProfileScreen } from "../screens/ProfileScreen";
import { useRoute } from "@react-navigation/native";


function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function PostScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Posts!</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();

export const NavigateBottom = () => {
return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "grey",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({size }) => (
            <Ionicons name="grid-outline" color="#212121" size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({size }) => (
            <View style={styles.wrap}>
              <Ionicons name="add" color="white" size={size} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
         tabBarIcon: ({size }) => (
            <Ionicons name="person-outline" color="#212121" size={size} />
          )}}
      />
    </Tabs.Navigator>
  );

}


export const PostsScreen = () => {

  return (
    // <View style={styles.form}>
    //         {currentNavigate === "Posts" ? (
    //           <NavigateBottom />
    //         ) : null}
    //       </View>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Posts!</Text>
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
    color:"white",
    
    width: 70,
    height: 40,

    backgroundColor: "#FF6C00",
    borderRadius:"50%"
  }
});
