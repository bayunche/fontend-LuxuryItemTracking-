
import { StyleSheet } from "react-native";

import { Text, View } from "../Themed";
import { ScrollView } from "react-native-gesture-handler";
import { Title, TouchableRipple } from "react-native-paper";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useConsumeListStore } from "../../zustand/store";
import { getConsumeById } from "../../api/user";
import moment from "moment";

type consumeProps = {
    out_trade_no?: string,
    beforeBalance?: string | number | bigint | undefined | null,
    afterBalance?: string | number | bigint | undefined | null,
    tradeTime?: Date | string | undefined | null,
    trueValue?: string | number | bigint | undefined | null,
}


export default function ConsumeDetail() {
    const { consumeId } = useConsumeListStore((state) => ({
        consumeId: state.consumeId
    }))
    const [ConsumeDetail, setConsumeDetail] = useState<consumeProps>({})
    useFocusEffect(
        useCallback(() => {
            const getConsumeDetail = async () => {
                console.log(consumeId)
                const res: any = await getConsumeById({ consumeId })
                console.log(res)
                if (res.data != null) {
                    setConsumeDetail(res.data)
                } else {
                    // 没有数据
                }
            }
            getConsumeDetail()
        }, [])
    )
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
                                    交易单号：{ConsumeDetail?.out_trade_no}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, }}
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
                                    交易前剩余余额：{ConsumeDetail?.beforeBalance as string}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, }}
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
                                    交易后余额：{ConsumeDetail?.afterBalance as string}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, }}
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
                                    交易时间：{moment(ConsumeDetail?.tradeTime as string).format("YYYY-MM-DD HH:mm:ss")}
                                </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#F4F3F4", padding: 8, borderBottomEndRadius: 16, borderBottomStartRadius: 16 }}
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
                                    实际价值：{ConsumeDetail?.trueValue as string}
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