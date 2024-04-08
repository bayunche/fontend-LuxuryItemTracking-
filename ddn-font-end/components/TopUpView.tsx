import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List, Modal, Portal, Title } from "react-native-paper";
import { useUserStore } from "../zustand/store";
import { Icon, IconElement } from '@ui-kitten/components';
const alipayIcon = (): IconElement => {

    return (
        <Icon name="alipay" />
    )
}
const TopUpView = ({ visible, setVisible }: { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const hideModal = () => setVisible(false);
    const containerStyle = { padding: 20 };
    const { money, getTopUpMoney } = useUserStore((state) => ({
        getTopUpMoney: state.getTopUpMoney,
        money: state.TopUpMoney
        ,
    }));
    useUserStore
    useFocusEffect(
        useCallback(() => {
            const getMoney = async () => {
                await getTopUpMoney({})
            }
            getMoney()
        }, [])
    )


    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                <ScrollView>
                    <Title style={{ textAlign: "center" }}>￥{money}</Title>
                    <List.Section>
                        <List.Item title="支付宝" left={() => <List.Icon icon="mdiCreditCardOutline" />} />
                        <List.Item title="微信" left={() => <List.Icon icon="wechat" />} />
                    </List.Section>
                </ScrollView>
            </Modal>
        </Portal>
    )
}

export default TopUpView;