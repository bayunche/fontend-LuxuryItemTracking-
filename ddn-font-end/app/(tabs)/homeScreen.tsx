import { StyleSheet } from "react-native";

// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import HomeScreenList from "../../components/HomeScreen";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeScreenList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
