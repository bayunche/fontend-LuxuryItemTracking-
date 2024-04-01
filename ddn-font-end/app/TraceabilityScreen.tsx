import { StyleSheet } from "react-native";


import { View } from "../components/Themed";
import Traceability from "../components/Traceability";
import APPbars from "../components/AppBar";
export default function Personal() {
  
  return (
    <View style={styles.container}>
      <Traceability></Traceability>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
