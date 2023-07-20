import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { ContainerImage } from "../component/ContainerImage";
import { FIREBASE_DB } from "../../config";
import { collection, onSnapshot } from "firebase/firestore";

import { ProfileMainScreen } from "../component/ProfileMainScreen";

import { useSelector } from "react-redux";
import { selectUID } from "../redux/Auth/authSelect";

export const PostsScreen = () => {
  const uid = useSelector(selectUID);
  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(
        collection(FIREBASE_DB, `user/${uid}/posts`),
        (post) => {
          const postsData = post.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setPosts(postsData);
        }
      );
      return unsubscribe;
    }
  }, [uid]);

  console.log(posts)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 16 }}>
          <ProfileMainScreen />
        </View>
        <View style={styles.content}>
          {posts.map(({ photo, title, location, geoLocation, id }) => (
            <ContainerImage
              key={id}
              photo={photo}
              title={title}
              location={location}
              geoLocation={geoLocation}
              id={id}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
