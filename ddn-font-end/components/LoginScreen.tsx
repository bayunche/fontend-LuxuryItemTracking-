import { StyleSheet, Dimensions, ImageProps } from "react-native";
import { View, Text } from "./Themed";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Input,
  Button,
  Icon,
  IconElement,
  Layout,
  Spinner,
} from "@ui-kitten/components";

const { width, height } = Dimensions.get("window");
const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const LoginRoot = () => {
  const [userName, setUserName] = useState(""); // 初始化状态为空字符串
  const [password, setPassword] = useState(""); // 初始化状态为空字符串
  const [loginDisabled, setLoginDisabled] = useState(false); // 初始化状态为false，表示按钮不禁用
  const handleLogin = async () => {
    // 处理登录逻辑
    setLoginDisabled(true); // 禁用登录按钮
  };
  return (
    <>
      <Input
        placeholder="账号"
        value={userName}
        onChangeText={(nextValue) => setUserName(nextValue)}
      />
      <Input
        placeholder="密码"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button status="primary" disabled={loginDisabled} onPress={handleLogin}>
        PRIMARY
      </Button>
    </>
  );
};

export default LoginRoot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: "#fff",
    width: width,
    height: height,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
