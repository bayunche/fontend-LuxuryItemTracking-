import * as React from "react";
import { Appbar, Divider, Menu } from "react-native-paper";
import { Platform } from "react-native";
import { Route, router } from "expo-router";
import { View } from "./Themed";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const APPbars = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const logOut = async () => {
    await AsyncStorage.clear();
    Toast.show("注销成功", {
      hideOnPress: true,
      duration: Toast.durations.SHORT,
      shadow: true,
      position: Toast.positions.BOTTOM,
      delay: 0,
      animation: true,
    });
    closeMenu();
    router.push("/login");
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="区块链溯源系统" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            // Do something
            router.push("/search");
          }}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={MORE_ICON}
              onPress={() => {
                openMenu();
              }}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="联系我们" />
          <Divider />
          <Menu.Item
            onPress={() => {
              logOut();
            }}
            title="退出登录"
          />
        </Menu>
      </Appbar.Header>
    </View>
  );
};

export default APPbars;
