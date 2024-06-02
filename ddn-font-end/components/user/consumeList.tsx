import { StyleSheet } from "react-native"
import { View } from "../Themed"
import { ScrollView } from "react-native-gesture-handler"
import { List, Title } from "react-native-paper"
import { useCallback, useState } from "react"
import moment from "moment"
import { useConsumeListStore } from "../../zustand/store"
import { router, useFocusEffect } from "expo-router"
import { getConsumeListByUserId } from "../../api/user"

type consumeProps = {
    out_trade_no: string,
    balance: string | number | bigint | undefined | null,
    beforeBalance: string | number | bigint | undefined | null,
    tradeTime: Date | string | undefined | null,
    trueValue: string | number | bigint | undefined | null,
}
// 消费记录列表
export default function ConsumeList() {
    const { consumeList, consumeId, setConsumeId, getConsumeList } = useConsumeListStore((state) => ({
        consumeList: state.consumeList,
        consumeId: state.consumeId,
        setConsumeId: state.setConsumeId,
        getConsumeList: state.getConsumeList,
    }))
    const [consumeLists, setConsumeLists] = useState<consumeProps[]>([])
    useFocusEffect(useCallback(() => {
        const getConsumeList = async () => {
            let res: any = await getConsumeListByUserId()
            let listData = res.data as consumeProps[]
            console.log(res.data)
            setConsumeLists(listData)
        }
        getConsumeList()
    }, []))
    return (
        <View style={styles.container}>
            <View style={{ margin: 8, borderRadius: 16, padding: 8, backgroundColor: "#ECE9EC" }}>
                <ScrollView style={{ borderRadius: 8 }}>
                    <Title style={{ textAlign: "center", backgroundColor: "#ECE9EC" }}>消费记录列表</Title>
                    <View style={styles.list}>
                        {consumeLists.length === 0 ? <View >
                            <Title style={{ textAlign: "center" }}>暂无消费记录</Title>
                            <Title style={{ textAlign: "center" }}>快去消费吧</Title>

                        </View> : consumeLists.map((item, index) => {
                            return (
                                <List.Item
                                    key={index}
                                    title={item.out_trade_no}
                                    description={`${moment(item.tradeTime as string).format('YYYY-MM-DD HH:mm:ss')}`}
                                    left={() => <List.Icon icon="receipt" />}
                                    onPress={() => {
                                        setConsumeId(item.out_trade_no)
                                        router.push('/consumeLog')
                                    }
                                    }

                                />

                            )
                        })

                        }


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