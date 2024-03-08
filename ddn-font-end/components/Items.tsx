import { View } from "./Themed";

import { Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Card,
  Paragraph,
  Portal,
  Title,
  Modal,
  TextInput,
} from "react-native-paper";
import APPbars from "./AppBar";
import LottieView from "lottie-react-native";
import { router, useFocusEffect } from "expo-router";
import { useItemStore } from "../zustand/store";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { registerLuxuryUser } from "../api/item";
import RegisterUserModal from "./registerUser";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
const { width, height } = Dimensions.get("window");

// Title
// Avatar
// Paragraph
// Card

// const shoesData = [
//   {
//     id: 1,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri:
//       "https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/c203917aea23a2072907d25367260ae32825eebe/ddn-font-end/assets/images/115907691_p0_master1200.jpg?raw=true",
//     value: 123,
//   },
//   {
//     id: 2,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   {
//     id: 3,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   {
//     id: 4,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   {
//     id: 5,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   {
//     id: 6,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   {
//     id: 7,
//     name: "hasuneMiku",
//     auctionDate: "2024.03.03",
//     imageUri: "your_shoe_image_url_2",
//     value: 123,
//   },
//   // 添加更多鞋子数据
// ];

function Views() {
  const [visible, setVisible] = useState(false);
  const [visiblePay, setVisiblePay] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPayModal = () => setVisiblePay(true);
  const hidePayModal = () => setVisiblePay(false);
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState<DateType | undefined>(dayjs());

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const { itemList, getItemList } = useItemStore((state) => ({
    itemList: state.itemList,
    getItemList: state.getItemList,
  }));

  let value = 0;
  if (itemList.length > 0) {
    value = itemList.reduce((acc: any, shoe: any) => acc + shoe.value, 0);
  }
  let itemsList = [];
  if (itemList.length > 0) {
    itemsList = itemList.reduce((acc: any, shoe: any) => acc + shoe.value, 0);
  }
  const handleView = () => {
    router.push("/viewItems");
  };

  useFocusEffect(
    useCallback(() => {
      const params = {
        /* 你的参数 */
      };
      getItemList(params);
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
          <Title>认证奢侈品</Title>

          <TextInput
            label="Email"
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />
          <DateTimePicker
            mode="single"
            locale={"zh-cn"}
            date={date}
            onChange={(params) => setDate(params.date)}
          />
        </Modal>
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
          {itemsList.map((shoe: any) => (
            <Card key={shoe.id} style={styles.shoeCard} onPress={handleView}>
              <Card.Cover source={{ uri: shoe.imageUri }} />
              <Card.Content>
                <Paragraph>品名 {shoe.name}</Paragraph>
                <Paragraph>注册时间 {shoe.auctionDate}</Paragraph>
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
    borderBlockColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
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
});
