import { StyleSheet } from "react-native";
import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import EditSalesInfoView from "../components/item/editSalesInfo";

// 销售信息编辑
export default function EditSalesInfoScreen() {
    return (
        <View style={styles.container}>

            <APPbars></APPbars>
            <EditSalesInfoView></EditSalesInfoView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})