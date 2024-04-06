import { ScrollView } from "react-native-gesture-handler";
import { View } from "./Themed";
import { Avatar, Button, TextInput, Title, TouchableRipple } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { useUserStore } from "../zustand/store";
import { router, useFocusEffect } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-root-toast";
import { editUserInfo } from "../api/user";

const CostomInput = ({ label, text, onChangeText, disabled }: { label: string, text: string, onChangeText: (text: string) => void, disabled: boolean }) => {
  return (
    <TextInput
      label={label}
      value={text}
      mode="outlined"
      disabled={disabled}
      onChangeText={text => onChangeText(text)}
    />
  )
}

const EditInfoForm = () => {
  const { userInfo, getUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    getUserInfo: state.getUserInfo,
  }));
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name)
  const [userName, setUserName] = useState(userInfo.userName)
  const [avatar, setAvatar] = useState<string|null|undefined>(userInfo.avatar)
  const [phone, setPhone] = useState(userInfo.phone)
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    setSubmitting(true);
    let data = {
      name: name,
      email: email,
      phone: phone,
      avatar: avatar
    }
    //对比data和userInfo，如果一样就不提交
    if (JSON.stringify(data) == JSON.stringify(userInfo)) {
      setSubmitting(false);
      Toast.show("未修改信息");
      return;

    }
    // 提交
    try {
      let res = await editUserInfo(data)
      Toast.show("修改成功");
    } catch (error) {

      Toast.show("修改失败");
      console.log(error)
    }

  }
  return (
    <View style={styles.Form}>
      <UseAvatar avatar={avatar} setAvatar={setAvatar} />
      <View >
        <CostomInput label="用户名" text={userName} disabled={true} onChangeText={setUserName} />
        <CostomInput label="邮箱" text={email} disabled={false} onChangeText={setEmail} />
        <CostomInput label="姓名" text={name} disabled={false} onChangeText={setName} />
        <CostomInput label="手机" text={phone} disabled={false} onChangeText={setPhone} />

      </View>
      <View style={styles.buttonGroup}>
        <Button
          style={{ marginRight: 8 }}
          mode="contained"
          disabled={submitting}
          loading={submitting}
          onPress={() => {
            handleSubmit();
          }}
        >
          提交
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          mode="contained"
          disabled={submitting}
          onPress={() => {
            router.back();
          }}
        >
          取消
        </Button>
      </View>

    </View>
  )
}

const UseAvatar = ({ avatar, setAvatar }: { avatar: string|undefined|null, setAvatar:any }) => {
  const [image, setImage] = useState<string|null|undefined>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,

    });


    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setAvatar(result.assets[0].base64)
    }
  };
  return (
    <View style={styles.Form}>
      <TouchableRipple
        style={{ width: 80 }}
        onPress={pickImage
        }
      >
        <Avatar.Image size={80} source={{ uri: "data:image/jpeg;base64," + avatar }} />
      </TouchableRipple>

    </View>
  )
}
export default function EditInfoView() {
  const { userInfo, getUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    getUserInfo: state.getUserInfo,
  }));
  useFocusEffect(
    useCallback(() => {
      getUserInfo({});
    }, [])
  )
  return (
    <ScrollView>
      <Title style={{ textAlign: "center", marginTop: 16 }}>修改个人信息</Title>
      <EditInfoForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  images: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "25%",
  },
  input: {
    padding: 16,
    paddingBottom: 0,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  Form: {
    padding: 16
  },
  container: {
    flex: 1,
    textAlign: "center",
  },
});
