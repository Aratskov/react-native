import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import FastImageView from "react-native-fast-image";
import { CustomCallout } from "../component/CustomCallout";

export const MapScreen = () => {
  const {
    params: {
      markerOnMaps: { latitude, longitude, title, photo },
    },
  } = useRoute();

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType="standard"
      minZoomLevel={13}
      // onMapReady={() => console.log("Map is ready")}
      // onRegionChange={() => console.log("Region change")}
    >
      <Marker coordinate={{ latitude, longitude }}>
        <CustomCallout photo={photo} title={title} />
      </Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
