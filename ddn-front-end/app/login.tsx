import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import LoginScreens from "../components/LoginScreen";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <LoginScreens></LoginScreens>
    </SafeAreaView>
  );
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
