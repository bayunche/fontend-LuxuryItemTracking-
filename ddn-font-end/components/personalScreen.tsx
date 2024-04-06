import { View, Text } from "./Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StyleSheet } from "react-native";
import { Avatar, FAB, List, TouchableRipple } from "react-native-paper";
import { useUserStore } from "../zustand/store";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import DeviceInfo from "react-native-device-info";
// useState
// FAB
// Platform
// ScrollView
function UserAvatar() {
  const { userInfo, setUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));
  console.log(userInfo);
  if (userInfo.avatar == null) {
    // let label = userInfo.userName
    //   .split(" ")
    //   .map((x: string) => x.charAt(0).toUpperCase())
    //   .join("");
    let label = userInfo?.userName?.charAt(0).toUpperCase();

    return (
      <View style={styles.avatar}>
        <Avatar.Text size={128} label={label} />
      </View>
    );
  } else {
    let url = userInfo.avatar;
    return (
      <View style={styles.avatar}>
        <Avatar.Image size={128} source={url}></Avatar.Image>
      </View>
    );
  }
}

function Header() {
  const { userInfo, setUserInfo, getUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
    getUserInfo: state.getUserInfo,
  }));
  useFocusEffect(
    useCallback(() => {
      const params = {};
      getUserInfo(params);
    }, [])
  );
  console.log(userInfo);

  return (
    <View style={styles.header}>
      <View style={styles.fabContainer}>
        <FAB
          icon="share"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        />
        <FAB
          icon="more"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <View style={styles.headerText}>
        <UserAvatar />
        <Text style={styles.name}>{userInfo?.userName}</Text>
      </View>
    </View>
  );
}
function PersonalInfo() {
  const setting = [
    {
      title: "基本",
      children: [
        {
          label: "修改密码",
          description: "",
          leftIcon: "",
          onPress: () => router.push("/editPasswordScreen"),
        },
        {
          label: "编辑个人信息",
          description: "",
          leftIcon: "",
          onPress: () => router.push("/editInfo"),
        },
        {
          label: "重置额度",
          description: "",
          leftIcon: "",
          onPress: () => {
            // 支付逻辑

          },
        },
      ],
    },
    {
      title: "物品",
      children: [
        {
          label: "物品溯源",
          description: "",
          leftIcon: "",
          onPress: () => router.push("/TraceabilityScreen"),
        },
        {
          label: "",
          description: "",
          leftIcon: "",
          onPress: () => router.push("/editInfo"),
        },
        {
          label: "重置额度",
          description: "",
          leftIcon: "",
          onPress: () => {
            // 支付逻辑
          },
        },
      ],
    },
  ];
  return (
    <View style={styles.personalInfo}>
      {setting.map((group) => {
        return (
          <View
            key={group.title}
            style={{
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                marginLeft: 8,
                marginBottom: 4,
              }}
            >
              {group.title}
            </Text>
            {group.children.map((child, index) => {
              return (
                <TouchableRipple
                  key={child.label}
                  borderless
                  style={{
                    height: 44,
                    justifyContent: "center",
                    paddingLeft: 16,
                    backgroundColor: "#ECE9EC",
                    paddingRight: 12,
                    borderTopLeftRadius: index === 0 ? 12 : 0,
                    borderTopRightRadius: index === 0 ? 12 : 0,
                    borderBottomLeftRadius:
                      index === group.children.length - 1 ? 12 : 0,
                    borderBottomRightRadius:
                      index === group.children.length - 1 ? 12 : 0,
                  }}
                  onPress={child.onPress}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#ECE9EC",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        includeFontPadding: false,
                        backgroundColor: "#ECE9EC",
                      }}
                    >
                      {child.label}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#ECE9EC",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily:
                            Platform.OS === "ios" ? "courier" : "monospace",
                          fontSize: 12,
                          marginRight: 8,
                          backgroundColor: "#ECE9EC",
                          includeFontPadding: false,
                        }}
                      >
                        {child.description}
                      </Text>
                    </View>
                  </View>
                </TouchableRipple>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
function PersonalView() {
  return (
    <View style={styles.personalContainer}>
      <Header></Header>
      <ScrollView>
        <PersonalInfo></PersonalInfo>
      </ScrollView>
    </View>
  );
}
export default PersonalView;
const styles = StyleSheet.create({
  personalInfo: {
    display: "flex",
    padding: 10,
  },
  personalContainer: {
    flex: 1,
  },
  headerText: {
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcf8f7",
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fcf8f7",
  },
  name: {
    marginLeft: 30,
    fontSize: 30,
  },
  fab: {
    margin: 16,
    height: 56,
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 80,
    width: "100%",
    backgroundColor: "#fcf8f7",
  },
  header: {
    width: "100%",
    paddingTop: 30,
    paddingLeft: 30,
    paddingBottom: 30,
    height: 300,
    justifyContent: "flex-start",
    backgroundColor: "#fcf8f7",
    flexDirection: "column",
  },
});
