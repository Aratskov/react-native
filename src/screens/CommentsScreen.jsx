import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export const CommentsScreen = () => {
  const { params: photo } = useRoute();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: photo.photo }} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FFF",
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginVertical:32
  },
});
