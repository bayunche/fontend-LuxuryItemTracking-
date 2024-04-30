import { useCallback, useState } from "react";
import { Modal, Portal, Title, Button, List } from "react-native-paper";
import { View, Text } from "./Themed";
import { createUserKey } from "../api/user";
import Toast from "react-native-root-toast";
// import { styled } from "@ui-kitten/components";
import { Linking, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { getTopUp } from "../api/login";
import { useUserStore } from "../zustand/store";
import { ScrollView } from "react-native-gesture-handler";
import createAliOrder from "../util/payments";
import { registerLuxuryUser } from "../api/item";

export type createUserPrivateKeyParams = {
  value: number,
  trueValue: number
}

export function RegisterUserModal({
  visible,
  hideModal,
}: {
  visible: boolean;
  hideModal: () => void;
}) {
  const { money, getTopUpMoney } = useUserStore((state) => ({
    getTopUpMoney: state.getTopUpMoney,
    money: state.TopUpMoney,
  }));
  const [selectType, setSelectType] = useState<string>("");
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    textAlign: "center",
  };

  const pay = async () => {
    //支付逻辑
    //支付成功执行注册用户逻辑
    const data: createUserPrivateKeyParams = {
      value: 100,
      trueValue: 100 * money

    }
    try {
      let res: any = await createUserKey(data);
      let orderStr: string = res.data as string;
      const supported = await Linking.canOpenURL(orderStr)
      if (!supported) {
        console.log('无法处理该URL');
        return
      } else {
        await Linking.openURL(orderStr);
      }
      setTimeout(
        async () => {
          try {
            await registerLuxuryUser({ })
            Toast.show("已成功获取注册权限", { duration: Toast.durations.SHORT });
          } catch (error) {
            if (error === "用户未注册区块链账户") {
              await registerLuxuryUser({})
            }
          }
        }, 10000
      )

      hideModal();
    } catch (error) {
      console.log(error);
      Toast.show("获取注册权限失败，请联系", {
        duration: Toast.durations.SHORT,
      });
      hideModal();
    }
  };

  useFocusEffect(useCallback(() => {
    const getMoney = async () => {
      await getTopUpMoney({});
    }
    getMoney()
  }, []))

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          style={styles.modal}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Title style={styles.title}>需要支付以获取注册权限</Title>

            <Text>请选择支付方式</Text>

            <View style={{ padding: 16 }}>
              <List.Section>
                <List.Item
                  title="支付宝"
                  left={() => <List.Icon icon="credit-card-fast-outline" />}
                  onPress={() => {
                    setSelectType('支付宝')
                  }}
                />
                <List.Item title="微信" left={() => <List.Icon icon="wechat" />} onPress={() => {
                  setSelectType('微信')
                }} />
              </List.Section>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button mode="elevated" onPress={pay}>
                支付
              </Button>
              <Button mode="elevated" onPress={hideModal}>
                关闭
              </Button>
            </View>
          </ScrollView>
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
    borderRadius: 16,
  },
  button: {
    width: "35%",
    height: 30,
  },
});
