import { StyleSheet } from "react-native"
import { View } from "../Themed"
import { ScrollView } from "react-native-gesture-handler"
import { List, Title } from "react-native-paper"
import { useState } from "react"
import moment from "moment"

type consumeProps= {
    out_trade_no: string,
    balance: string | number | bigint | undefined | null,
    beforeBalance: string | number | bigint | undefined | null,
    tradeTime: Date | string | undefined | null,
    trueValue: string | number | bigint | undefined | null,
}

// 消费记录列表
export default function ConsumeList() {
    const [consumeList, setConsumelist] = useState([] as consumeProps[])
    const 
    return (
        <View style={styles.container}>
            <View style={{ margin: 8, borderRadius: 16, padding: 8, backgroundColor: "#ECE9EC" }}>
                <ScrollView style={{ borderRadius: 8 }}>
                    <Title style={{ textAlign: "center", backgroundColor: "#ECE9EC" }}>消费记录列表</Title>
                    <View style={styles.list}>
                        {consumeList.map((item, index) => {
                        return (
                        <List.Item 
                        key={index}
                        title={item.out_trade_no}
                        description={`${moment(item.tradeTime as string).format('YYYY-MM-DD HH:mm:ss')}`}
                        left={() => <List.Icon icon="receipt" />}
                        onPress={() => {
                        setTransactionLogId(item.id)
                        router.push('/transactionLog')
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