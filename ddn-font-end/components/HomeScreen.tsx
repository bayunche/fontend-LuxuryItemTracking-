import React from "react";
// import { ScrollView } from 'react-native';
// import Banner from "./Banner";
import { Text, View } from "./Themed";
import Banner from "./Banner";
// import { Appbar } from "react-native-paper";
import APPbars from "./AppBar";
import { Card } from "react-native-paper";
import { router } from "expo-router";
const bannerData = [
  {
    title: "Banner 1",
    description: "Floor: 0.03 ETH",
    url: "https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/dd873ecea3fdc15e3f13e851635b226e32b4ae10/ddn-font-end/assets/images/116752505_p0_master1200.jpg?raw=true",
    onPress: () => {
      // 处理点击事件
    },
  },
  {
    title: "Banner 2",
    description: "Floor: 0.05 ETH",
    url: "https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/2feb88bf37b963dd29c91c8b49987d7ae3b7d0e6/ddn-font-end/assets/images/114644639_p0_master1200.jpg?raw=true",
    onPress: () => {
      // 处理点击事件
    },
  },
  {
    title: "Banner 3",
    description: "Floor: 0.10 ETH",
    url: "https://img.zcool.cn/community/011aad554be56f000001bf72c38864.jpg@1280w_1l_2o_100sh.jpg",
    onPress: () => {
      // 处理点击事件
    },
  },
  // ...更多 banner 数据
];
const routerList = [
  {
    path: "/TraceabilityScreen",
    key: "Traceability"
    , name: "物品溯源",
    onPress: () => router.push("/TraceabilityScreen"),
  },
  {
    path: "/registerItemScreen",
    key: "registerItemScreen"
    , name: "物品注册"

    , onPress: () => router.push("/registerItemScreen"),

  },
  {
    path: "/(tabs)/personalItem",
    key: "personalItem"
    , name: "物品管理"
    , onPress: () => router.push("/(tabs)/personalItem"),
  },
  {
    path: "/personalTrade",
    key: "personalTrade"
    , name: "消费记录"
    , onPress: () => router.push("/personalTrade"),
  },

]
const RouterBar = () => {
  return (

    <View style={styles.routerBar}>
      {routerList.map((item, index) => {
        return (
          <Card key={index} style={styles.routerCard} onPress={item.onPress}>
          <Card.Content style={{ display: "flex", flexDirection: "column" }}>
            <Text >{item.name}</Text>
          </Card.Content>
        </Card>
        )
      })}
    </View>


  )

}
const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <APPbars />
      <Banner banners={bannerData} />
      <RouterBar />
    </View>
  );
};
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  Banner: {
    width: "100%",
    height: 200,
    //  resizeMode: 'cover',
    //  justifyContent: 'center',
  },
  routerBar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
    marginTop: 100,
    backgroundColor: "#ECE9EC",

    padding: 8,
    margin: 8,
    borderRadius: 16
  },
  routerCard: {
    margin: 10,
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
    width: "42.8%",
    // Additional styling
  },
})

export default HomeScreen;
