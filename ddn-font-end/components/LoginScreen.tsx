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
const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

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
  const [error, setError] = useState(null);
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
    } catch (error:any) {
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
