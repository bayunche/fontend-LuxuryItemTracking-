import React from "react";
// import { ScrollView } from 'react-native';
// import Banner from "./Banner";
import { View } from "./Themed";
import Banner from "./Banner";
// import { Appbar } from "react-native-paper";
import APPbars from "./AppBar";
const bannerData = [
  {
    title: "Banner 1",
    description: "Floor: 0.03 ETH",
    url: "https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/9e232f5ea1db3fbe4d3da3893a0d566ffc0647cb/ddn-font-end/assets/images/banner-1.webp?raw=true",
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

const HomeScreen = () => {
  return (
    <View>
      <APPbars />
      <Banner banners={bannerData} />
    </View>
  );
};

const styles = {
  Banner: {
    width: "100%",
    height: 200,
    //  resizeMode: 'cover',
    //  justifyContent: 'center',
  },
};

export default HomeScreen;
