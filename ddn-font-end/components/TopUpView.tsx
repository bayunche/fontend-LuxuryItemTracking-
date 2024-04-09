import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List, Modal, Portal, Title } from "react-native-paper";
import { useUserStore } from "../zustand/store";

const TopUpView = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const hideModal = () => setVisible(false);
  const [trueMoney, setTrueMoney] = useState(0);
  const containerStyle = {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  };
  const { money, getTopUpMoney } = useUserStore((state) => ({
    getTopUpMoney: state.getTopUpMoney,
    money: state.TopUpMoney,
  }));
  useUserStore;
  useFocusEffect(
    useCallback(() => {
      const getMoney = async () => {
        await getTopUpMoney({});
      };
      getMoney();
    }, [])
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ScrollView>
          <List.Section>
          <List.Item
              title="￥ 200"
              left={() => <List.Icon icon="credit-card" />}
              onPress={() => {
                setTrueMoney(200 * money);
              }}
            />
            <List.Item
              title="￥ 100"
              left={() => <List.Icon icon="credit-card" />}
              onPress={() => {
                setTrueMoney(100 * money);
              }}
            />
             <List.Item
              title="￥ 50"
              left={() => <List.Icon icon="credit-card" />}
              onPress={() => {
                setTrueMoney(100 * money);
              }}
            />
             <List.Item
              title="￥ 30"
              left={() => <List.Icon icon="credit-card" />}
              onPress={() => {
                setTrueMoney(30 * money);
              }}
              
            />
          </List.Section>
          <Title style={{ textAlign: "center", backgroundColor: "#fff" }}>
            到账币数 {trueMoney}
          </Title>
          <List.Section>
            <List.Item
              title="支付宝"
              left={() => <List.Icon icon="credit-card-fast-outline" />}
            />
            <List.Item title="微信" left={() => <List.Icon icon="wechat" />} />
          </List.Section>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default TopUpView;
