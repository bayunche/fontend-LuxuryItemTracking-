import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import APPbars from "../components/AppBar";
import RegisterItemView from "../components/item/registerLuxuryItem";
export default function RegisterItemScreen() {

    return (
        <View style={styles.container}>
            <APPbars></APPbars>
            <RegisterItemView></RegisterItemView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})