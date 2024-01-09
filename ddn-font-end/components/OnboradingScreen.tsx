import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function OnboradingScreen() {
  const handleDone = () => {
    AsyncStorage.setItem("firstTime", "false"); // 将onboarding标记为true
    router.replace("/login");
  };
  const handleSkip = () => {
    AsyncStorage.setItem("firstTime", "false"); // 将onboarding标记为true
    router.replace("/login"); // 跳转到登录页面
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleSkip}
        containerStyles={{ paddingHorizontal: 15 }}
        imageContainerStyles={{ flex: "none" as any }}
        pages={[
          {
            backgroundColor: "#66ccff",
            image: (
              <LottieView
                style={styles.LottieView}
                source={require("../assets/animation/AnimationFirst.json")}
                autoPlay
                loop
              />
            ),
            title: "ETH侧链",
            subtitle: "基于ETH 2.0与POS共识算法对奢侈品信息进行保障",
          },
          {
            backgroundColor: "#66ffcc",
            image: (
              <LottieView
                style={styles.LottieView}
                source={require("../assets/animation/AnimationSecond.json")}
                autoPlay
                loop
              />
            ),
            title: "透明度和可追溯性",
            subtitle: "用户以及消费者能直观的通过应用查看产品的信息",
          },
          {
            backgroundColor: "#00ffcc",
            image: (
              <LottieView
                style={styles.LottieView}
                source={require("../assets/animation/AnimationThird.json")}
                autoPlay
                loop
              />
            ),
            title: "自动化管理",
            subtitle: "通过基于智能合约的执行，实现供应链自动化管理",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: height,
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  LottieView: {
    alignSelf: "baseline",
    width: width * 0.8,
    height: width,
    alignItems: "center",
  },
});
