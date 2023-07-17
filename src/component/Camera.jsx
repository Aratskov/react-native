export const Camera = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="md-camera-reverse-sharp" size={32} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setPhoto(uri);
              }
            }}
          >
            <Ionicons name="camera" size={32} />
          </TouchableOpacity>
        </View>
      </Camera>
      {/* <View style={styles.wrapImage}>
        <View style={styles.icon}>
          <Ionicons name="md-camera-sharp" color="#BDBDBD" size={30} />
        </View>
      </View>
      <Text>Завантажте фото</Text>
      <MainButton
        title="Опубліковати"
        onPress={() => navigate.navigate("Posts")}
      /> */}
    </View>
  );
};
