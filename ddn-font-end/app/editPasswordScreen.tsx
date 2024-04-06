import APPbars from "../components/AppBar";
import { View } from "../components/Themed";
import EditPasswordView from "../components/editPassword";

export default function EditPassword() {
  return (
    <View>
      <APPbars></APPbars>
      <EditPasswordView />
    </View>
  );
}
