import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
import {
  Text,
  View,
} from "../../components/Themed";

import Swiper from "react-native-swiper";

import { ScrollView } from "react-native-gesture-handler";
import BlockchainLuxuryApp from "../../components/SearchScreen";
import APPbars from "../../components/AppBar";

export default function Search() {
  return (
    <View style={styles.container}>
      <APPbars />
      <ScrollView horizontal={false} keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps={'handled'} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}       >
        <BlockchainLuxuryApp />
      </ScrollView>

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
