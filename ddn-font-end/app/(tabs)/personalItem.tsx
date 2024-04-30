import { StyleSheet } from "react-native";

// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import ItemsView from "../../components/item/Items";
import APPbars from "../../components/AppBar";
// import HomeScreenList from "../../components/HomeScreen";
export default function PersonalItem() {
  return (
    <View style={styles.container}>
      <ItemsView></ItemsView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
