import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import OnBoradingScreen from "../components/OnboradingScreen";
export default function Onborading() {
  return <OnBoradingScreen></OnBoradingScreen>;
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
