import { Dimensions, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { AnimatedFAB, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import ViewItem from "./itemDetail";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";

const { width: SCREEN_WIDTH } = Dimensions.get("window");


// useEffect
function Scanner() {
  const [isExtended, setIsExtended] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null || false);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermission] =
    BarCodeScanner.usePermissions();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: any;
  }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>"grant permission"</Button>
      </View>
    );
  }
  if (hasPermission === null) {
    requestPermission();
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> */}
      <View style={styles.cameraWrap}>
        <Camera
          style={styles.camera}
          type={type}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {scanned && (
        <Button style={styles.button} onPress={() => setScanned(false)}>
          'Tap to Scan Again'
        </Button>
      )}
    </View>
  );
}

function Traceability() {
  const isIOS = Platform.OS === "ios";
  const [itemDetailVisible, setItemDetailVisible] = useState(false);
  return (
    <View style={styles.container}>
      {itemDetailVisible && <ViewItem></ViewItem>}
      <Scanner></Scanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    height: 300,
  },
  cameraWrap:{
    height: SCREEN_WIDTH,
  },
  buttonContainer: {
    padding: 30,
    float: "right",
  },
  button: {
    width: "40%",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

export default Traceability;
