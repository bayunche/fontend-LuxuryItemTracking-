import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import EditLogistInfoView from "../components/item/editLogistInfo";

export default function EditLogistInfoScreen() {
    return (
        <View style={styles.container}>
            <APPbars />
            <EditLogistInfoView></EditLogistInfoView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})