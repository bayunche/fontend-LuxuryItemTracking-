import {
  StyleSheet,
  Dimensions,
  ImageProps,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "./Themed";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Button, Box, Input, Icon, Pressable, FormControl } from "native-base";
import { login } from "../api/login";
import Toast from "react-native-root-toast";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Animation = () => {
  return (
    <LottieView
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/animation/AnimationBanner.json")}
      autoPlay
      loop
    />
  );
};

const LoginRoot = () => {
  const [userName, setUserName] = useState(""); // 初始化状态为空字符串
  const [password, setPassword] = useState(""); // 初始化状态为空字符串
  const [loginDisabled, setLoginDisabled] = useState(false); // 初始化状态为false，表示按钮不禁用
  const [show, setShow] = React.useState(false);
  const [invalid, setInvalid] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    // 验证表单
    if (userName === "" || password === "") {
      return;
    }

    // 处理登录逻辑
    setLoginDisabled(true); // 禁用登录按钮

    try {
      // 发起登录请求
      let res = await login({ userName, password });

      // 登录成功后的处理
      // 可以执行导航、更新用户界面等操作
      console.log("Login successful:", res);

      // 这里可以添加导航逻辑或其他成功后的操作
    } catch (error: any) {
      console.error("Login failed:", error);

      // 使用 react-native-root-toast 显示错误信息
      Toast.show(`Error: ${error.message}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } finally {
      setLoginDisabled(false);
    }
  };
  const onResign = () => {
    router.replace("/signUp");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width * 0.3,
          height: width * 0.4,
          alignItems: "center",
        }}
      >
        <Animation></Animation>
      </View>
      <View style={styles.form}>
        <FormControl isRequired w="75%" maxW="300px">
          <FormControl.Label>账号</FormControl.Label>

          <Input
            style={styles.userName}
            placeholder="请输入用户名"
            variant="rounded"
            value={userName}
            size="large"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            onChangeText={(nextValue) => setUserName(nextValue)}
          />
        </FormControl>
        <FormControl isRequired isInvalid={invalid} w="75%" maxW="300px">
          <FormControl.Label>密码</FormControl.Label>
          <Input
            variant="rounded"
            style={styles.userName}
            size="large"
            value={password}
            onChangeText={(nextValue) => {
              if (nextValue.length < 6) {
                setInvalid(true);
              } else {
                setPassword(nextValue);
              }
            }}
            type={show ? "text" : "password"}
            InputLeftElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="请输入密码"
          />
        </FormControl>
        <Box alignItems="center">
          <Button
            variant="subtle"
            spinnerPlacement="end"
            isLoadingText="登录中"
            isLoading={loginDisabled}
            onPress={handleLogin}
          >
            登录
          </Button>
        </Box>
        ;
      </View>
    </View>
  );
};

export default LoginRoot;

const styles = StyleSheet.create({
  container: {
    flex: undefined,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: width,
    height: height,
  },
  userName: {
    marginButton: width * 0.05,
    width: width * 0.8,
    borderRadius: 15,
  },
  input: {
    marginButton: width * 0.05,
    width: width * 0.8,
    borderRadius: 15,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginTop: width * 0.1,
    width: width * 0.8,
    borderRadius: 20,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  },
});
