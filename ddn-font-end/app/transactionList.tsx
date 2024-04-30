import { StyleSheet } from "react-native";
import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import TransactionLogListView from "../components/user/transactionLogList";

export default function transactionLogListScreen() {
    return (
        <View style={styles.container}>
            <APPbars></APPbars>
            <TransactionLogListView></TransactionLogListView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})