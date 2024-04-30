import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import EditItemInfoView from "../components/item/editItemInfo";
export default function EditItemScreen() {
    return (
        <View style={styles.container}>
            <APPbars></APPbars>
            <EditItemInfoView></EditItemInfoView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})