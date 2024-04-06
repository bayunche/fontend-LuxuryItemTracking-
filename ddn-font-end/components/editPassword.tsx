import { useState } from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  TextInput,
  Title,
} from "react-native-paper";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { editPassword } from "../api/user";

function EditPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(true);
  const [passwordOldErr, setpasswordOldErr] = useState(false);
  const handleSubmit = async () => {
    const regtest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,20}$/;
    // 获取验证信息
    const canSubmit =
      password != "" &&
      confirmPassword != "" &&
      password == confirmPassword &&
      passwordErr == false &&
      confirmPasswordErr === false &&
      password !== oldPassword &&
      regtest.test(password);

    if (canSubmit) {
      setSubmitting(true);
      try {
        await editPassword({ oldPassword, newPassword: password });
        Toast.show(`密码修改成功`, {
          hideOnPress: true,
          duration: Toast.durations.SHORT,
          shadow: true,
          position: Toast.positions.BOTTOM,
          delay: 0,
          animation: true,
        });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        Toast.show(`${error}`, {
          hideOnPress: true,
          duration: Toast.durations.SHORT,
          shadow: true,
          position: Toast.positions.BOTTOM,
          delay: 0,
          animation: true,
        });
      }
      setSubmitting(false);
    }
  };

  const handleVisible = () => {
    return (
      <View>
        <IconButton icon="eye" onPress={() => setVisible(!visible)} />
      </View>
    );
  };
  return (
    <View style={{ marginTop: 8 }}>
      <View style={styles.input}>
        <TextInput
          label="请输入旧密码"
          value={oldPassword}
          mode="outlined"
          secureTextEntry={visible}
          right={
            visible ? (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => setVisible(!visible)}
              />
            ) : (
              <TextInput.Icon icon="eye" onPress={() => setVisible(!visible)} />
            )
          }
          onChangeText={(text) => {
            const regtest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,20}$/;
            if (regtest.test(text) == false) {
              setpasswordOldErr(true);
              setOldPassword(text);
            } else {
              setpasswordOldErr(false);

              setOldPassword(text);
            }
          }}
        />
        <HelperText type="error" visible={passwordOldErr}>
          请输入正确的旧密码
        </HelperText>
      </View>
      <View style={styles.input}>
        <TextInput
          label="请输入密码"
          value={password}
          mode="outlined"
          secureTextEntry={visiblePassword}
          right={
            visiblePassword ? (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => setVisiblePassword(!visiblePassword)}
              />
            ) : (
              <TextInput.Icon
                icon="eye"
                onPress={() => setVisiblePassword(!visiblePassword)}
              />
            )
          }
          error={passwordErr}
          onChangeText={(text) => {
            const regtest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,20}$/;
            if (regtest.test(text)) {
              setPassword(text);
              setPasswordErr(false);
            } else {
              setPassword(text);
              setPasswordErr(true);
            }
          }}
        />
        <HelperText type="error" visible={passwordErr}>
          请输入正确格式的密码
        </HelperText>
      </View>

      <View style={styles.input}>
        <TextInput
          label="请重复输入密码"
          value={confirmPassword}
          mode="outlined"
          secureTextEntry={visibleConfirmPassword}
          right={
            visibleConfirmPassword ? (
              <TextInput.Icon
                icon="eye-off"
                onPress={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              />
            ) : (
              <TextInput.Icon
                icon="eye"
                onPress={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              />
            )
          }
          error={confirmPasswordErr}
          onChangeText={(text) => {
            if (text === password) {
              setConfirmPassword(text);
              setConfirmPasswordErr(false);
            } else {
              setConfirmPassword(text);

              setConfirmPasswordErr(true);
            }
          }}
        />
        <HelperText type="error" visible={confirmPasswordErr}>
          两次密码不一致
        </HelperText>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          style={{ marginRight: 8 }}
          mode="contained"
          disabled={submitting}
          loading={submitting}
          onPress={() => {
            handleSubmit();
          }}
        >
          提交
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          mode="contained"
          disabled={submitting}
          onPress={() => {
            router.back();
          }}
        >
          取消
        </Button>
      </View>
    </View>
  );
}
export default function EditPasswordView() {
  return (
    <View>
      <Title style={{ textAlign:"center" }}>修改密码</Title>
      <EditPasswordForm></EditPasswordForm>
    </View>
  );
}
const styles = StyleSheet.create({
  images: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    padding: 16,
    paddingBottom: 0,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    width: "25%",
  },
});
