import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ContainerImage } from "../component/ContainerImage";

export const PostsScreen = () => {
  const { params } = useRoute();
  const postData = params?.postData;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (postData) {
      setPosts((prevPosts) => [postData, ...prevPosts]);
    }
  }, [postData]);

  console.log(posts);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {posts.map(({ photo, title, location, geoLocation }, index) => (
            <View key={index} style={styles.wrap}>
              <ContainerImage
                photo={photo}
                title={title}
                location={location}
                geoLocation={geoLocation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FFF",
    // paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    marginTop: 32,
  },
});
