import { StyleSheet } from "react-native";
import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import TransactionLogDetailView from "../components/user/transactionLog";
export default function transactionLogScreen() {
    return (
        <View style={styles.container}>
            <APPbars></APPbars>
            <TransactionLogDetailView></TransactionLogDetailView>
        </View>
    )
}

const styles = StyleSheet.create({
  
    container:{
        flex:1
    }
})