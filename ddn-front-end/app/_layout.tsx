import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 异步存取的三方工具
import { router } from "expo-router";

import { NativeBaseProvider, Box } from "native-base";
import { RootSiblingParent } from "react-native-root-siblings";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const chooseScreen = async () => {
    const TOKEN_KEY = "authToken";

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
      chooseScreen()
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </RootSiblingParent>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
