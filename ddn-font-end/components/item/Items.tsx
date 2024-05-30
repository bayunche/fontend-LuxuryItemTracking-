import { View } from "../Themed";

import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
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
  Menu,
  Divider,
} from "react-native-paper";
import APPbars from "../AppBar";
import LottieView from "lottie-react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { useItemStore, useUserStore } from "../../zustand/store";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { deleteLuxuryItem, registerLuxuryItem, registerLuxuryUser } from "../../api/item";
import { RegisterUserModal } from "../registerUser";
const { width, height } = Dimensions.get("window");
import Toast from "react-native-root-toast";
import { base64ToBlob } from "../../util/util";
import moment from "moment";

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CostomCard = ({ item, handleView }: any) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)
  const { userInfo, setUserInfo } = useUserStore((state) => {
    return {
      userInfo: state.userInfo,
      setUserInfo: state.setUserInfo
    }
  })
  const { setItemId } = useItemStore((state) => {
    return {
      setItemId: state.setItemId
    }
  })
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
  const hideConfirmDialog = () => setConfirmDialogVisible(false)
  const showConfirmDialog = () => setConfirmDialogVisible(true)
  const permissionCheck = () => {
    const { permissions } = userInfo
    console.log(permissions)
    if (permissions) {
      return false
    }
    if (permissions != 0) {
      return true
    }
  }
  const onDelete = async (itemId: string) => {
    try {
      let res = await deleteLuxuryItem({ itemId });
      Toast.show("删除成功", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      })
    } catch (error) {
      if (error) {
        console.log(error)
        Toast.show("删除失败", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        })
      }
    } finally {
      closeMenu()
      hideConfirmDialog()
      router.replace("/personalItem")
    }

  }
  const handleEditLogistInfo = (itemId: string) => {
    closeMenu()
    setItemId(itemId)
    router.push("/editLogistInfoScreen")
  }

  return (
    <View style={{ width: "49%" }}>
      <Portal>
        <Dialog visible={confirmDialogVisible} onDismiss={hideConfirmDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text >你确认需要删除该物品吗？</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              onDelete(item.itemId)
            }}>确认</Button>
            <Button onPress={hideConfirmDialog}>取消</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Menu
        key={item.id}
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Card
            style={styles.shoeCard}
            onPress={() => {
              let { itemId, ...data } = item;
              handleView(itemId);
            }}
            onLongPress={openMenu}
          >
            <Card.Cover
              source={{ uri: item.itemImage }}
            />
            <Card.Content>
              <Paragraph>品名 {item.itemName}</Paragraph>
              <Paragraph>
                注册时间{" "}
                {moment(item.itemDate).format("YYYY-MM-DD HH:mm:ss")}
              </Paragraph>
            </Card.Content>
          </Card>
        }>
        <Menu.Item onPress={() => {
          setItemId(item.itemId)
          closeMenu()
          router.push("/editItem")
        }} title="修改物品信息" />
        <Divider />
        <Menu.Item onPress={() => {
          setMenuVisible(false)
          showConfirmDialog()
        }} title="删除物品" />
        <Divider />
        <Menu.Item onPress={() => { }} title="获取物品估值" />


        <Divider />
        {userInfo?.permissions != '0' ? <Menu.Item onPress={() => {
          setItemId(item.itemId)
          console.log(item.itemId)
          closeMenu()
          router.push('/editLogistInfo')
        }} title="修改物品物流信息" /> : ''}
        <Divider />
        {userInfo?.permissions != "0" ? <Menu.Item onPress={() => {
          setItemId(item.itemId)
          closeMenu()
          router.push('/editSalesInfo')
        }} title="修改物品销售信息" /> : ''}

      </Menu>
    </View>


  )
}
function Views() {
  const [visiblePay, setVisiblePay] = useState(false);

  const showPayModal = () => setVisiblePay(true);
  const hidePayModal = () => setVisiblePay(false);
  const [refreshing, setRefreshing] = useState(false);

  let itemsList = [];
  const { itemList, getItemList, setItemId, itemId } = useItemStore(
    (state) => ({
      itemList: state.itemList,
      getItemList: state.getItemList,
      setItemId: state.setItemId,
      itemId: state.itemId,
    })
  );
  const { userInfo, getUserInfo } = useUserStore((state) => {
    return {
      userInfo: state.userInfo,
      getUserInfo: state.getUserInfo,
    }
  })
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getItemList({});
    console.log(itemList.length);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let value = 0;
  if (itemList.length > 0) {
    value = itemList.reduce((acc: any, shoe: any) => acc + parseInt(shoe.value)||0, 0);
  }

  if (itemList.length > 0) {
    // itemsList = itemList.reduce(
    //   (acc: any, shoe: any) => acc + parseInt(shoe.value),
    //   0
    // );
  }
  const handleView = (itemId: string) => {
    // router.push("/viewItems");
    setItemId(itemId);
    router.push("/viewItems");
  };

  const handleRegister = async () => {
    try {
      let res = await registerLuxuryUser({});
    } catch (error: any) {
      if (error === "用户未注册区块链账户") {
        showPayModal();
        return;
      }
      console.log(error);
    }
    router.push("/registerItemScreen");
  }
  useFocusEffect(
    useCallback(() => {
      const params = {
        /* 你的参数 */
      };
      itemsList = getItemList(params);
      getUserInfo({})
    }, [])
  );
  // RefreshControl
  return (
    <View style={styles.container}>
      <RegisterUserModal
        visible={visiblePay}
        hideModal={hidePayModal}
      ></RegisterUserModal>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title style={styles.title}>我的物品</Title>
        <View style={styles.card}>
          <LottieView
            style={{
              width: width * 0.4,
              alignSelf: "flex-end",
            }}
            source={require("../../assets/animation/AnimationItems.json")}
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
              onPress={() => {
                handleRegister()
              }}
            >
              去注册
            </Button>
          </View>
        </View>
        <View style={styles.shoesContainer}>
          {itemList.map((shoe: any) => (
            <CostomCard key={shoe.id} item={shoe} handleView={handleView}></CostomCard>
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

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",


  },
  shoeCard: {
    margin: 10,
    marginRight: 0,
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
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
