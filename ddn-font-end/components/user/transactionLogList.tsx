import { StyleSheet } from "react-native";
import { View } from "../Themed";
import { List, Title } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useTransactionStore } from "../../zustand/store";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import moment from "moment";
export default function TransactionLogListView() {
    const { getTransactionList, transactionList, setTransactionLogId } = useTransactionStore((state) => {
        return {
            getTransactionList: state.getTransactionList,
            transactionList: state.transactionList,
            setTransactionLogId: state.setTransactionLogId
        }
    })
    let transactionLists = []
    useFocusEffect(useCallback(() => {
        const getData = async () => {
            await getTransactionList()


        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []))
    return (
        <View style={styles.container}>
            <View style={{ margin: 8, borderRadius: 16, padding: 8, backgroundColor: "#ECE9EC" }}>
                <ScrollView style={{ borderRadius: 8 }}>
                    <Title style={{ textAlign: "center", backgroundColor: "#ECE9EC" }}>交易记录列表</Title>
                    <View style={styles.list}>
                        {!transactionList ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ECE9EC" }}>
                            <Title>暂无交易记录，立刻开始注册奢侈品吧</Title>
                        </View> : transactionList.map((item, index) => {
                            return (
                                <List.Item
                                    key={index}
                                    title={item.itemName}
                                    description={`${item.description}  ${moment(item.createTime as string).format('YYYY-MM-DD HH:mm:ss')}`}
                                    left={() => <List.Icon icon="receipt" />}
                                    onPress={() => {
                                        setTransactionLogId(item.id)
                                        router.push('/transactionLog')
                                    }}
                                />
                            )
                        })}

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    list: {
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#ECE9EC",
        padding: 8,
        margin: 8,

    }
})