import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ContainerImage = ({
  photo,
  title,
  location,
  geoLocation: { latitude, longitude },
  id
}) => {
  const navigate = useNavigation();
  return (
    <View style={{ marginBottom: 32 }}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.secondTitle}>
        <TouchableOpacity
          style={styles.wrap}
          onPress={() => navigate.navigate("Comment", { photo,id})}
        >
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrap}
          onPress={() =>
            navigate.navigate("Map", {
              markerOnMaps: { title, latitude, longitude, photo },
            })
          }
        >
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={24}
            color="#BDBDBD"
          />
          <Text style={styles.textLocation}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    fontWeight: 500,
    marginTop: 4,
    marginBottom: 8,
  },
  secondTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textLocation: {
    textDecorationLine: "underline",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#212121",
  },
});
