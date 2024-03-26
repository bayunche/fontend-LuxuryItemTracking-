import { View } from "./Themed";

import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Card,
  Paragraph,
  Portal,
  Title,
  Modal,
  TextInput,
  Dialog,
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import APPbars from "./AppBar";
import LottieView from "lottie-react-native";
import { router, useFocusEffect } from "expo-router";
import { useItemStore } from "../zustand/store";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { registerLuxuryItem, registerLuxuryUser } from "../api/item";
import RegisterUserModal from "./registerUser";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
const { width, height } = Dimensions.get("window");
import * as imagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import { base64ToBlob } from "../util/util";

function Views() {
  const [visible, setVisible] = useState(false);
  const [visiblePay, setVisiblePay] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPayModal = () => setVisiblePay(true);
  const hidePayModal = () => setVisiblePay(false);
  const [itemName, setItemName] = useState("");
  const [itemDate, setItemDate] = useState<DateType | undefined>(dayjs());
  const [itemImage, setItemImage] = useState(String || null || undefined);
  const [dialogVisible, setDialogVisible] = useState(false);
  const hideDialog = () => setDialogVisible(false);
  const [select, setSelect] = useState(Boolean);
  const [initalLoad, setInitalLoad] = useState(true);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [loading, setLoading] = useState(false);
  const { itemList, getItemList, setItemId, itemId } = useItemStore(
    (state) => ({
      itemList: state.itemList,
      getItemList: state.getItemList,
      setItemId: state.setItemId,
      itemId: state.itemId,
    })
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      setInitalLoad(false);
      setDialogVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  let value = 0;
  if (itemList.length > 0) {
    value = itemList.reduce((acc: any, shoe: any) => acc + shoe.value, 0);
  }
  let itemsList = [];
  if (itemList.length > 0) {
    // itemsList = itemList.reduce(
    //   (acc: any, shoe: any) => acc + parseInt(shoe.value),
    //   0
    // );
  }
  const base64ToGallery = async (base64String: any) => {};
  const handleView = (itemId: string) => {
    // router.push("/viewItems");
    setItemId(itemId);

    router.push("/viewItems");
  };

  const handleResign = async () => {
    let data = { itemName, itemImage, itemDate };

    if (itemName == "" || itemImage == "" || itemDate == "") {
      return Toast.show("请完整填写表单", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }

    try {
      setLoading(true);
      let res: any = await registerLuxuryItem(data);
      console.log(res);
      Toast.show(`${res.msg}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    } catch (error: any) {
      console.log(error);
      Toast.show(`${error.msg}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    const openImagePickerAsync = async () => {
      try {
        if (dialogVisible == false && initalLoad == false) {
          if (select == false) {
            let photo = await imagePicker.launchCameraAsync({
              mediaTypes: imagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              // aspect: [4, 3],
              base64: true,
              quality: 1,
            });

            if (!photo.canceled) {
              setItemImage(photo.assets[0].base64);
            }
          } else {
            const result = await imagePicker.launchImageLibraryAsync({
              mediaTypes: imagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              // aspect: [4, 3],
              base64: true,
              quality: 1,
            });
            if (!result.canceled) {
              setItemImage(result.assets[0].base64);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    openImagePickerAsync();
  }, [dialogVisible, select]);
  useFocusEffect(
    useCallback(() => {
      const params = {
        /* 你的参数 */
      };
      itemsList = getItemList(params);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView style={styles.resignModel}>
            <View style={styles.wrap}>
              <Title style={{ textAlign: "center", marginBottom: 16 }}>
                认证奢侈品
              </Title>
              <TextInput
                label="奢侈品名称"
                value={itemName}
                style={{ marginBottom: 16 }}
                onChangeText={(text) => setItemName(text)}
              />
              <View style={{ backgroundColor: "#f7f5fa", borderRadius: 10 }}>
                <DateTimePicker
                  mode="single"
                  locale={"zh-cn"}
                  date={itemDate}
                  onChange={(params) => setItemDate(params.date)}
                />
              </View>

              <Button
                mode="contained"
                style={{
                  marginTop: 16,
                  backgroundColor: "#b19cd9",
                  marginBottom: 16,
                }}
                onPress={pickImage}
              >
                点击上传图片
              </Button>
              <Button
                mode="contained"
                style={{ backgroundColor: "#b19cd9" }}
                onPress={handleResign}
              >
                提交认证
              </Button>
            </View>
            <ActivityIndicator animating={loading} color={MD2Colors.red800} />
          </ScrollView>
        </Modal>
      </Portal>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setSelect(true);
                setDialogVisible(false);
              }}
            >
              照片
            </Button>
            <Button
              onPress={() => {
                setSelect(false);
                setDialogVisible(false);
              }}
            >
              拍摄
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <RegisterUserModal
        visible={visiblePay}
        hideModal={hidePayModal}
      ></RegisterUserModal>
      <ScrollView style={styles.container}>
        <Title style={styles.title}>我的物品</Title>
        <View style={styles.card}>
          <LottieView
            style={{
              width: width * 0.4,
              alignSelf: "flex-end",
            }}
            source={require("../assets/animation/AnimationItems.json")}
            autoPlay
            loop
          />
          <View>
            <Paragraph style={styles.paragraph}>
              已注册{itemList.length || 0}件奢侈品！
            </Paragraph>
            <Paragraph style={styles.paragraph}>总价值约￥{value}</Paragraph>
            <Button
              mode="elevated"
              onPress={async () => {
                try {
                  let res = await registerLuxuryUser({});
                } catch (error: any) {
                  if (error === "用户未注册区块链账户") {
                    showPayModal();
                    return;
                  }
                  console.log(error);
                }
                showModal();
              }}
            >
              去注册
            </Button>
          </View>
        </View>

        <View style={styles.shoesContainer}>
          {itemList.map((shoe: any) => (
            <Card
              key={shoe.id}
              style={styles.shoeCard}
              onPress={() => {
                let { itemId, ...data } = shoe;
                handleView(itemId);
              }}
            >
              <Card.Cover
                source={{ uri: "data:image/jpeg;base64," + shoe.itemImage }}
              />
              <Card.Content>
                <Paragraph>品名 {shoe.itemName}</Paragraph>
                <Paragraph>注册时间 {shoe.itemDate}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
export default function ItemsView() {
  return (
    <View style={styles.container}>
      <APPbars></APPbars>
      <Views></Views>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // backgroundColor: "#fffccc",
  },
  card: {
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#fffccc",
    justifyContent: "space-between",
    padding: 10,
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
    margin: 10,
    flexDirection: "row-reverse",
    flexWrap: "nowrap",
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    // Adjust your styling as needed
  },
  paragraph: {
    backgroundColor: "#fffccc",
  },
  giftIcon: {
    alignSelf: "center",
    backgroundColor: "#6200ee", // Customize your color
    marginVertical: 10,
  },
  shoesContainer: {
    // Container for shoes
    // backgroundColor: "#fffccc",

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // flexFlow:"row wrap"11
  },
  shoeCard: {
    margin: 10,
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
    width: "44.8%",
    // Additional styling
  },
  resignModel: {
    // flex: 1,
    height: "30%",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.123)",
    borderRadius: 10,
  },
  wrap: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#f7f7f6",
    borderRadius: 10,
  },
});
