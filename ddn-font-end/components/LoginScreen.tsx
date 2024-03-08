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
import {
  Input,
  Button,
  Icon,
  IconElement,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { login } from "../api/login";
import Toast from "react-native-root-toast";

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
const AlertIcon = (props: any): IconElement => (
  <Icon {...props} name="alert-circle-outline" />
);
const LoginRoot = () => {
  const [userName, setUserName] = useState(""); // 初始化状态为空字符串
  const [password, setPassword] = useState(""); // 初始化状态为空字符串
  const [loginDisabled, setLoginDisabled] = useState(false); // 初始化状态为false，表示按钮不禁用
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const handleLogin = async () => {
    try {
      // 验证表单
      if (userName === "" || password === "") {
        return;
      }

      setLoginDisabled(true); // 禁用登录按钮
      // 处理登录逻辑
      let res = await login({ userName, password });
      Toast.show("登录成功", {
        hideOnPress: true,
        duration: Toast.durations.SHORT,
        shadow: true,
        position: Toast.positions.BOTTOM,
        delay: 0,
        animation: true,
      });
      // console.log(res)
      router.push("/(tabs)/homeScreen"); // 登录成功后跳转到主页
      // console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoginDisabled(false); // 启用登录按钮
    }
  };
  const onResign = () => {
    router.replace("/signUp");
  };
  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };
  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
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
        <Input
          style={styles.userName}
          placeholder="用户名"
          value={userName}
          label="用户名"
          size="large"
          onChangeText={(nextValue) => setUserName(nextValue)}
        />
        <Input
          style={styles.input}
          placeholder="密码"
          label="密码"
          size="large"
          caption={renderCaption}
          accessoryRight={renderIcon}
          value={password}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />
        <Button
          style={{ width: width * 0.8, borderRadius: 20, marginTop: 20 }}
          status="primary"
          disabled={loginDisabled}
          onPress={handleLogin}
        >
          登录
        </Button>
        <Button
          style={{ width: width * 0.8, borderRadius: 20, marginTop: 20 }}
          status="primary"
          onPress={onResign}
        >
          注册
        </Button>
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
