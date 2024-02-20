
import React from "react";

import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { View } from "./Themed";
import Banner from "./Banner";
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85); // 轮播项目的宽度

interface BannerData {
    title: string;
    subtitle: string;
    imageUrl: string;
    onPress: () => void; // 根据实际情况调整这里的类型
  }
  interface BannerCarouselProps {
    data: BannerData[];
  }
const BannerCarousel :React.FC<BannerCarouselProps>= ({ data }) => {
    // 渲染轮播的每一项
    const renderItem = ({ item, index }:{item: BannerData,index:number}) => {
      return (
        <Banner
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
          onPress={item.onPress}
        />
      );
    };
  
    return (
      <View>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          loop={true} // 如果需要无限循环
        />
      </View>
    );
  };
  
  export default BannerCarousel;