import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProfileScreen } from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen/";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { MapScreen } from "./MapScreen";

import { BackButton } from "../component/ButtonHeader";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: "grey",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ size }) => (
            <Ionicons name="grid-outline" color="#212121" size={size} />
          ),
          headerRight: () => <BackButton icon="md-log-out-outline" />,
        }}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ size }) => (
            <View style={styles.wrap}>
              <Ionicons name="add" color="white" size={size} />
            </View>
          ),
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => <BackButton icon="arrow-back" />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Ionicons name="person-outline" color="#212121" size={size} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          tabBarIcon: null,
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => <BackButton icon="arrow-back" />,
        }}
      /> */}
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    color: "white",

    width: 70,
    height: 40,

    backgroundColor: "#FF6C00",
    borderRadius: "50%",
  },
});
