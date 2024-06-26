import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewItem from "../components/item/itemDetail";
import APPbars from "../components/AppBar";
// import SignUpScreen from "../components/signUpScreen";

export default function viewItemScreen() {
  return (
    <View style={styles.container}>
      <APPbars></APPbars>

      <ViewItem></ViewItem>
      {/* <SignUpScreen></SignUpScreen> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
