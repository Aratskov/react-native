import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Callout } from "react-native-maps";

const screenWidth = Dimensions.get("window").width;

export const CustomCallout = ({ photo, title }) => {
  return (
    <Callout tooltip>
      <View>
        <View style={styles.container}>
          <Image
            source={{
              uri: photo,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: 160 }}
          ></Image>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 18,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
        <View style={styles.triangle}></View>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: screenWidth * 0.5,
    flexDirection: "column",
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  triangle: {
    left: (screenWidth * 0.5) / 2 - 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "black",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});
