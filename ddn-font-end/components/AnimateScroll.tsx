import React from "react";
import { Image, ScrollView, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { View } from "./Themed";

const { width } = Dimensions.get("window");

const ZoomableImage = ({ uri }: { uri: string }) => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 200],
      [1, 1.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Animated.Image
          // source={{ uri: `data:image/jpeg;base64,${uri}` }}
          source={{
            uri: `https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/6f20269b885c4d5430c20bb58b32e2c56b950c80/ddn-font-end/assets/images/116503726_p0_master1200.jpg`,
          }}
          style={[{ width, height: 300 }, animatedStyle]}
          resizeMode="cover"
        />
      </Animated.ScrollView>
    </View>
  );
};

export default ZoomableImage;
