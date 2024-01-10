import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 异步存取的三方工具
import { router } from "expo-router";
import * as eva from "@eva-design/eva";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/onBoardingScreen",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const TOKEN_KEY = "authToken";
  const chooseScreen = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const firstTime = await AsyncStorage.getItem("firstTime");
    if (!firstTime || firstTime === "true") {
      router.replace("/onBoardingScreen");
    } else {
      if (token && token.length > 0) {
        getUserInfo();
      } else {
        router.replace("/onBoardingScreen");
      }
    }
  };
  const getUserInfo = () => {
    // customerInfo()
    //   .then((res) => {
    //     setRoot('Tab'); // 主页
    //   })
    //   .catch(() => {
    //     setRoot('LaunchScreen'); // 登录页
    //   })
    //   .finally(() => {
    //     setAppIsReady(true);
    //   });
  };
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      chooseScreen();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
// const HomeScreen = () => {
//   return (
//     <Layout
//       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//     ></Layout>
//   );
// };
const StackNav = createNativeStackNavigator();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen
              name="onBoardingScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </RootSiblingParent>
      </ApplicationProvider>
    </ThemeProvider>
  );
}
