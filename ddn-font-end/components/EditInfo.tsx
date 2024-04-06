import { ScrollView } from "react-native-gesture-handler";
import { View } from "./Themed";
import { Title } from "react-native-paper";
import { StyleSheet } from "react-native";

const EditInfoForm = () => {
    
}


export default function EditInfoView() {
  return (
    <ScrollView>
      <Title>修改个人信息</Title>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  images: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    textAlign: "center",
  },
});
