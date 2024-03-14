import { View } from "./Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Avatar, FAB } from "react-native-paper";
import { useUserStore } from "../zustand/store";
// FAB

function UserAvatar() {
  const { userInfo, setUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));
  console.log(userInfo)
  if (userInfo.avatar == null) {
    // let label = userInfo.userName
    //   .split(" ")
    //   .map((x: string) => x.charAt(0).toUpperCase())
    //   .join("");
    let label="RN"
    return <Avatar.Text size={24} label={label} />;
  } else {
    let url = userInfo.avatar;
    return <Avatar.Image size={24} source={url}></Avatar.Image>;
  }
}

function Header() {
  return (
    <View style={styles.header}>
      <UserAvatar></UserAvatar>
      <FAB
        icon="share"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
      <FAB
        icon="more"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
      <UserAvatar/>
    </View>
  );
}

function PersonalView() {
  return (
    <View>
      <Header></Header>
    </View>
  );
}
export default PersonalView;
const styles = StyleSheet.create({
  fab: {
    margin: 16,
    height: 56,
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    backgroundColor: "#fcf8f7",
    flexDirection: "row",
  },
});
