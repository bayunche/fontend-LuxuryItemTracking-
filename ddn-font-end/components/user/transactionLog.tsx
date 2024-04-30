import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { ScrollView } from "react-native-gesture-handler";
import { Title, TouchableRipple } from "react-native-paper";
import { useTransactionStore } from "../../zustand/store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import moment from "moment";

export default function TransactionLogDetailView() {
    const { getTransactionLogs, transactionLog, transactionLogId } = useTransactionStore((state) => {
        return {
            getTransactionLogs: state.getTransactionLogs,
            transactionLog: state.transactionLogs,
            transactionLogId: state.transactionLogId

        }
    })
    useFocusEffect(useCallback(() => {
       
        getTransactionLogs(transactionLogId)

    }, []))
    return (
        <View style={styles.container}>
            <View style={{ margin: 8, borderRadius: 16, padding: 8, backgroundColor: "#ECE9EC" }}>

                <ScrollView>
                    <Title style={{ textAlign: "center", backgroundColor: "#ECE9EC" }}>交易记录列表</Title>
                    <View style={{ margin: 8, borderRadius: 16, padding: 8, backgroundColor: "#ECE9EC" }}>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, borderTopEndRadius: 16, borderTopStartRadius: 16 }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    本次交易影响的奢侈品名称：{transactionLog?.itemName}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    该次交易哈希值：{transactionLog?.transactionHash}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    该次交易所在区块链位置：{transactionLog?.blockNumber?.toString()}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    该次交易的创建者：{transactionLog?.creater}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    该次交易的创建时间：{moment(transactionLog?.createTime as string).format("YYYY-MM-DD HH:mm:ss")}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",

                                    }}
                                >
                                    该次交易的描述：{transactionLog?.description}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8,borderBottomEndRadius: 16, borderBottomStartRadius: 16  }}
                            borderless
                            onPress={() => console.log("Pressed")}
                        >
                            <View style={{ justifyContent: "center", }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: "#F4F3F4",
                                    }}
                                >
                                    该次交易的创建时间：{moment(transactionLog?.createTime as string).format("YYYY-MM-DD HH:mm:ss")}
                                </Text>
                            </View>
                        </TouchableRipple>
                   
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})