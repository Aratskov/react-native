import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/roboto";

import { ProfileScreen } from "../screens/ProfileScreen";

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

export const PostsScreen = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarShowLabel: false,
      }}
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === "Posts") {
      //       iconName = focused ? "grid-sharp" : "grid-outline";
      //     } else if (route.name === "Settings") {
      //       iconName = focused ? "add-circle" : "ios-add-circle-outline";
      //     } else if (route.name === "Profile") {
      //       iconName = focused ? "person" : "person-outline";
      //     }
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      // })}
      // tabBarOptions={{
      //   tabBarShowLabel:false,
      //   activeTintColor: "tomato",
      //   tabBarInactiveTintColor: "gray",
      // }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-sharp" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.wrap}>
              <Ionicons name="add" color={color} size={size} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
         tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )}}
      />
    </Tabs.Navigator>
  );
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
