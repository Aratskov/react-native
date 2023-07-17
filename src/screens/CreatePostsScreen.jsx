import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { MainButton } from "../component/Button";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../component/Input";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [visibleCamera, setCameraVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [locationPlace, setLocationPlace] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigation();

  // Дозвіл на місцезнаходження
  useEffect(() => {
    handlePermissions();
  }, []);

  const handlePermissions = async () => {
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();

    setHasPermission(cameraStatus === "granted");

    if (cameraStatus !== "granted" || locationStatus !== "granted") {
      alert("Permission to access camera or location was denied");
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permission to access location was denied");
  //     }
  //   })();
  // }, []);

  // // Дозвіл на камеру

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     // await MediaLibrary.requestPermissionsAsync();

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const handleSubmitLocation = async () => {
    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    setLocation({ latitude, longitude });

    // const data

    navigate.navigate("Posts");
  };

  console.log(location);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {visibleCamera ? (
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraType}
                >
                  <Ionicons name="md-camera-reverse-sharp" size={32} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      // await MediaLibrary.createAssetAsync(uri);
                      setCameraVisible(false);
                      setPhoto(uri);
                    }
                  }}
                >
                  <Ionicons name="camera" size={32} />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <ScrollView style={styles.container}>
              <View style={styles.wrapImage}>
                {photo ? (
                  <>
                    <Image
                      source={{ uri: photo }}
                      resizeMode="cover"
                      style={{ flex: 1, width: "100%", height: "100%" }}
                    />
                    <TouchableOpacity
                      style={[
                        styles.icon,
                        {
                          position: "absolute",
                          backgroundColor: "rgba(255, 255, 255, 0.30)",
                        },
                      ]}
                      onPress={() => setCameraVisible(true)}
                    >
                      <Ionicons name="md-camera-sharp" color="#FFF" size={30} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setCameraVisible(true)}
                  >
                    <Ionicons
                      name="md-camera-sharp"
                      color="#BDBDBD"
                      size={30}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={{
                  color: "#BDBDBD",
                  fontFamily: "Roboto_400Regular",
                  marginTop: 8,
                }}
              >
                {!photo ? "Завантажте фото" : "Редагувати фото"}
              </Text>
              <SafeAreaView style={{ marginVertical: 32 }}>
                <Input
                  placeholder="Назва..."
                  type="AddPost"
                  value={title}
                  setValue={setTitle}
                />
                <Input
                  placeholder="Місцевість..."
                  type="AddPost"
                  value={locationPlace}
                  setValue={setLocationPlace}
                  last={true}
                />
              </SafeAreaView>
              <MainButton title="Опубліковати" onPress={handleSubmitLocation} />
            </ScrollView>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFF",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  button: {
    width: 60,
    height: 60,

    marginBottom: 30,
    marginRight: 15,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
  wrapImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    maxWidth: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  icon: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
});