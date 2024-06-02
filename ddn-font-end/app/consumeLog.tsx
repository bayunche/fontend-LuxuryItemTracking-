import { StyleSheet } from "react-native";
import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import ConsumeDetail from "../components/user/consumeDetail";

export default function transactionLogScreen() {
    return (
        <View style={styles.container}>
            <ConsumeDetail></ConsumeDetail>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }
})