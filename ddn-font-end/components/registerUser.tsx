import { useState } from "react";
import { Modal, Portal, Title, Button } from "react-native-paper";
import { View, Text } from "./Themed";
import { createUserKey } from "../api/user";
import Toast from "react-native-root-toast";
// import { styled } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function RegisterUserModal({
  visible,
  hideModal,
}: {
  visible: boolean;
  hideModal: () => void;
}) {
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    textAlign: "center",
  };
  const pay = async () => {
    //支付逻辑
    //支付成功执行注册用户逻辑
    try {
      let res = await createUserKey();
      Toast.show("已成功获取注册权限", { duration: Toast.durations.SHORT });
      hideModal();
    } catch (error) {
      console.log(error);
      Toast.show("获取注册权限失败，请联系", {
        duration: Toast.durations.SHORT,
      });
      hideModal();
    }
  };
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          style={styles.modal}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Title style={styles.title}>需要支付以获取注册权限</Title>

          <Text>请选择支付方式</Text>
          <Button mode="elevated" onPress={pay}>
            支付
          </Button>
          <Button mode="elevated" onPress={hideModal}>
            关闭
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  modal: {
    display: "flex",
    textAlign: "center",
  },
  button: {
    width: "35%",
    height: 30,
  },
});
