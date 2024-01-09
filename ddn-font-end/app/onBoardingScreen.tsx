import { StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 异步存取的三方工具
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import React, { useEffect, useState } from "react";
import OnboradingScreen from "../components/OnboradingScreen";
export default function Onborading() {
  const [appIsReady, setAppIsReady] = useState<boolean | undefined>(false);
  return <OnboradingScreen></OnboradingScreen>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
