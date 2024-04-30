import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List, Modal, Portal, Title } from "react-native-paper";
import { useUserStore } from "../../zustand/store";
import createAliOrder from "../../util/payments";
import Toast from "react-native-root-toast";
const TopUpView = ({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const hideModal = () => setVisible(false);
    const [trueMoney, setTrueMoney] = useState(0);
    const [selectValue, setSelectValue] = useState(0)
    const containerStyle = {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        marginLeft: 16,
        marginRight: 16,
        
    };
    const { money, getTopUpMoney } = useUserStore((state) => ({
        getTopUpMoney: state.getTopUpMoney,
        money: state.TopUpMoney,
    }));
    useFocusEffect(
        useCallback(() => {
            const getMoney = async () => {
                await getTopUpMoney({});
            };
            getMoney();
        }, [])
    );
    const createOrder = async () => {
        const value = selectValue
        if (trueMoney === 0) {
            return Toast.show("请选择充值金额", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            })
        }
        try {
            await createAliOrder(value, trueMoney)
        } catch (error) {
            console.error(error)
        }
    }
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
                                setSelectValue(200)
                            }}
                        />
                        <List.Item
                            title="￥ 100"
                            left={() => <List.Icon icon="credit-card" />}
                            onPress={() => {
                                setTrueMoney(100 * money);
                                setSelectValue(100)
                            }}
                        />
                        <List.Item
                            title="￥ 50"
                            left={() => <List.Icon icon="credit-card" />}
                            onPress={() => {
                                setTrueMoney(50 * money);
                                setSelectValue(50)

                            }}
                        />
                        <List.Item
                            title="￥ 30"
                            left={() => <List.Icon icon="credit-card" />}
                            onPress={() => {
                                setTrueMoney(30 * money);
                                setSelectValue(30)

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
                            onPress={() => {
                                createOrder()
                            }}
                        />
                        <List.Item title="微信" left={() => <List.Icon icon="wechat" />} />
                    </List.Section>
                </ScrollView>
            </Modal>
        </Portal>
    );
};

export default TopUpView;
