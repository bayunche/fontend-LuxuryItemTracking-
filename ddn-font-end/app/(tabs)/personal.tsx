import { StyleSheet } from "react-native";

import PersonalView from "../../components/personalScreen";
import { View } from "../../components/Themed";
export default function Personal() {
  return (
    <View style={styles.container}>
      <PersonalView></PersonalView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  
  },
});
