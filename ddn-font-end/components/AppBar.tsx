import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";
import { Route, router } from "expo-router";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const APPbars = () => (
  <Appbar.Header>
    <Appbar.Content title="区块链溯源系统" />
    <Appbar.Action
      icon="magnify"
      onPress={() => {
        // Do something
        router.push("/search");
      }}
    />
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

export default APPbars;
