import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
import {
  Text,
  View,
} from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/Themed";

import Swiper from "react-native-swiper";
import BlockchainLuxuryApp from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/SearchScreen";
import APPbars from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/AppBar";

export default function Search() {
  return (
    <View style={styles.container}>
      <APPbars />
      <BlockchainLuxuryApp></BlockchainLuxuryApp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
