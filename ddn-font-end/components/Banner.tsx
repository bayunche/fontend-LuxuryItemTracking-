import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ViewPager } from "@ui-kitten/components";
import { Card } from "react-native-paper";
import { View } from "./Themed";
import { Image } from "expo-image";
type BannerProps = {
  banners: Array<{
    title: string;
    description: string;
    url: string;
    onPress: () => void;
  }>;
};

const Banner = ({ banners }: BannerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 15000); // 自动播放间隔时间为 3000 毫秒

    return () => clearInterval(intervalId); // 清除定时器
  }, [banners.length]);

  return (
    <ViewPager
      style={styles.viewPager}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {banners.map((banner, index) => (
        <View key={index} style={styles.page}>
          <Card onPress={banner.onPress}>
            <Card.Title title={banner.title} subtitle={banner.description} />
            <Card.Cover source={{ uri: banner.url }} />
          </Card>
        </View>
      ))}
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  viewPager: {
  
    height: 200, // 根据需要调整
  },
  page: {
    height: 200, // 根据需要调整
    width: "100%", // 确保卡片填充整个视图宽度
  },
});

export default Banner;
