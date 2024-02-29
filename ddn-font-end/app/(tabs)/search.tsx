import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
import {
  Text,
  View,
} from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/Themed";

import Swiper from "react-native-swiper";
import BlockchainLuxuryApp from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/SearchScreen";
import APPbars from "D:/fontend-LuxuryItemTracking-/ddn-font-end/components/AppBar";
import { ScrollView } from "react-native-gesture-handler";

export default function Search() {
  return (
    <View style={styles.container}>
      <APPbars />
      <ScrollView horizontal={false} keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps={'handled'} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true} iosalwaysBounceHorizontal={false} iosalwaysBounceVertical={false}  iosbounces= {true}     >
    <BlockchainLuxuryApp/>
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
