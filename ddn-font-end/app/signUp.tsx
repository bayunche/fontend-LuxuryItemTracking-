import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpScreen from "../components/signUpScreen";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <SignUpScreen></SignUpScreen>
    </SafeAreaView>
  );
}
