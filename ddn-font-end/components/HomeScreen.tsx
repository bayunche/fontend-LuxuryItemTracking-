import React from "react";
// import { ScrollView } from 'react-native';
// import Banner from "./Banner";
import { View } from "./Themed";
import BannerCarousel from '../components/BannerCarousel'; // 引入 BannerCarousel 组件

const bannerData = [
  {
    title: "Banner 1",
    subtitle: "Floor: 0.03 ETH",
    imageUrl: 'https://i.pximg.net/c/250x250_80_a2/img-master/img/2024/02/15/22/18/30/116092861_p0_square1200.jpg',
    onPress: () => {
      // 处理点击事件
    },
  },
  {
    title: "Banner 2",
    subtitle: "Floor: 0.05 ETH",
    imageUrl: "https://www.pixiv.net/artworks/116091979",
    onPress: () => {
      // 处理点击事件
    },
  },
  // ...更多 banner 数据
];
const HomeScreen: React.FC = () => {
  return (
    <View>
     <BannerCarousel data={bannerData} />
    
    </View>
  );
};

export default HomeScreen;
