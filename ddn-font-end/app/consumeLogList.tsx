import { StyleSheet } from "react-native";
import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import ConsumeList from "../components/user/consumeList";
export default function transactionLogListScreen() {
    return (
        <View style={styles.container}>
            <APPbars></APPbars>
            <ConsumeList></ConsumeList>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})