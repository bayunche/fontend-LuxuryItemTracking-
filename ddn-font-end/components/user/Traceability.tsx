import { Dimensions, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { AnimatedFAB, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import ViewItem from "../item/itemDetail";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { useItemStore } from "../../zustand/store";
import { router } from "expo-router";

const { width: SCREEN_WIDTH, height } = Dimensions.get("window");


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

  const { setItemId, itemId, getItemInfo, itemInfo } = useItemStore(
    (state) => ({
      setItemId: state.setItemId,
      itemId: state.itemId,
      getItemInfo: state.getItemInfo,
      itemInfo: state.itemInfo,
    })
  );
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
    //验证二维码是否为物品二维码（内容为物品id）
    // 使用正则匹配该扫码结果是否为json和是否有itemid
    const jsonReg = /^\{.*\}/;
    const itemIdReg = /"itemId":\d+/;
    const isJson = jsonReg.test(data);
    const hasItemId = itemIdReg.test(data);
    if (!isJson || !hasItemId) {
      // 不是物品二维码
      return alert("不是物品二维码");
    }


    let dataObj = JSON.parse(data)
    setItemId(dataObj.itemId);
    router.push("/viewItems");
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    setScanned(true);

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
            {scanned && (
              <Button style={styles.button} onPress={() => setScanned(false)}>
                'Tap to Scan Again'
              </Button>
            )}
          </View>
        </Camera>
      </View>

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

  },
  cameraWrap: {
    height: height,
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
