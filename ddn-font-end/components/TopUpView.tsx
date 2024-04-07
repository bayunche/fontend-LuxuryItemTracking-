import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List, Modal, Portal, Title } from "react-native-paper";

const TopUpView = () => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { padding: 20 };
    useFocusEffect(
        useCallback(() => {
            
        },[])
    )


    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                <ScrollView>
                    <Title style={{ textAlign: "center" }}>￥{money}</Title>
                    <List.Section>
                        <List.Item title="支付宝" left={() => <List.Icon icon="alipay" />} />
                        <List.Item title="微信" left={() => <List.Icon icon="wechat" />} />
                    </List.Section>
                </ScrollView>
            </Modal>
        </Portal>
    )
}

export default TopUpView;