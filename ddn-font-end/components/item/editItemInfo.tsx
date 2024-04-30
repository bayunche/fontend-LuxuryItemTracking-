import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, Icon, Portal, Title } from "react-native-paper";
import { itemInfoType, useItemStore } from "../../zustand/store";
import CostomInput from "./costomInput";
import * as imagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Image } from "expo-image";
import Toast from "react-native-root-toast";
import { updateLuxuryItem } from "../../api/item";
const { width } = Dimensions.get("window");
const EditItemInfoForm = ({ itemId }: { itemId: string }) => {
    const { itemInfo, getItemInfo } = useItemStore((state) => {
        return {
            itemInfo: state.itemInfo,
            getItemInfo: state.getItemInfo
        }
    })
    const [dialogVisible, setDialogVisible] = useState(false);
    const [initalLoad, setInitalLoad] = useState(true);
    const [select, setSelect] = useState("0");

    const [itemName, setItemName] = useState(itemInfo.itemName)
    const [itemDate, setItemDate] = useState<DateType | undefined>(dayjs(itemInfo.itemDate))
    const [itemImage, setItemImage] = useState<string | null | undefined>(itemInfo.itemImage)
    const [loading, setLoading] = useState(false)
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [brand, setBrand] = useState(itemInfo.brand)
    const [brandErr, setBrandErr] = useState(false)
    const [model, setModel] = useState(itemInfo.model)
    const [modelErr, setModelErr] = useState(false)
    const [nameErr, setNameErr] = useState(false)
    const hideDialog = () => {
        setDialogVisible(false);
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try {
            setInitalLoad(false);
            setDialogVisible(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const openImagePickerAsync = async () => {
            try {
                if (dialogVisible === false && initalLoad === false) {
                    if (select === "1") {
                        let photo = await imagePicker.launchCameraAsync({
                            mediaTypes: imagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            // aspect: [4, 3],
                            base64: true,
                            quality: 1,
                        });

                        if (!photo.canceled) {
                            setItemImage(photo.assets[0].base64);
                        }
                    } else if (select === "2") {
                        const result = await imagePicker.launchImageLibraryAsync({
                            mediaTypes: imagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            // aspect: [4, 3],
                            base64: true,
                            quality: 1,
                        });
                        if (!result.canceled) {
                            setItemImage(result.assets[0].base64);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        openImagePickerAsync();
    }, [dialogVisible, select]);
    useFocusEffect(useCallback(() => {
        const params = {
            itemId: itemId
        }
        getItemInfo(params)
    }, []))
    const validate = () => {
        let err = false
        if (itemName == "") {
            setNameErr(true)
            err = true
        }
        if (model == '') {
            setModelErr(true)
            err = true
        }
        if (brand == "") {
            setBrandErr(true)
            err = true
        }
        return err
    }
    const handleEdit = async () => {
        if (validate()) {
            return Toast.show("请完整填写表单", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        }
        const data = {
            itemId,
            itemName, itemImage, itemDate, brand, model
        }
        setLoading(true)
        try {
            let res = await updateLuxuryItem(data)
            Toast.show("修改成功", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
            router.back()
        } catch (error) {
            console.log(error)
            Toast.show("修改失败", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
        } finally {
            setLoading(false)
        }

    }
    return (
        <View style={styles.form}>
            <Portal>
                <Dialog style={{ width: width * 0.5 }} visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Actions style={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            onPress={() => {
                                setSelect("2");
                                setDialogVisible(false);
                            }}
                        >
                            照片
                        </Button>
                        <Button
                            onPress={() => {
                                setSelect('1');
                                setDialogVisible(false);
                            }}
                        >
                            拍摄
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <ScrollView>
                <View style={styles.wrap}>
                    <Title style={{ textAlign: "center", marginBottom: 16 }}>
                        认证奢侈品
                    </Title>
                    <CostomInput label="奢侈品名称"
                        text={itemName}
                        Err={nameErr}
                        disabled={false}
                        validText="请输入正确的奢侈品名称"
                        onChangeText={(text) => setItemName(text)} />
                    <View style={{ backgroundColor: "#f7f5fa", borderRadius: 10 }}>
                        <Title style={{ textAlign: "center", marginBottom: 16 }}>物品购买时间</Title>
                        <DateTimePicker
                            mode="single"
                            locale={"zh-cn"}
                            date={itemDate}
                            onChange={(params) => setItemDate(params.date)}
                        />
                    </View>
                    <View >
                        <CostomInput validText="请输入正确的品牌" Err={brandErr} label="品牌" text={brand} onChangeText={(text) => {
                            //验证为空的情况
                            if (text === "") {
                                setBrandErr(true)
                                setBrand(text)

                            } else {
                                setBrand(text)
                            }
                        }} disabled={false} />
                        <CostomInput validText="请输入正确的型号" Err={modelErr} label="型号" text={model} onChangeText={(text) => {
                            //验证为空的情况
                            if (text === "") {
                                setModelErr(true)
                                setModel(text)

                            } else {
                                setModel(text)
                            }
                        }} disabled={false} />
                    </View>
                    <View style={{
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        backgroundColor: "#f7f7f6",
                        alignItems: "center"
                    }}>
                        <View style={styles.imageWrap}>
                            <Title>物品图片</Title>
                            <Image style={styles.image}
                                source={'data:image/jpeg;base64,' + itemImage}
                                placeholder={blurhash}
                                contentFit="contain"
                                transition={1000}></Image>
                        </View>

                        <View style={{ width: "60%", marginBottom: 16 }}>
                            <Button
                                mode="contained"
                                style={{
                                    height: 40,

                                }}
                                onPress={pickImage}
                            >
                                点击上传图片
                            </Button>
                        </View>
                    </View>
                    <View style={{
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f7f7f6",

                    }}>

                        <Button
                            mode="contained"
                            style={{ width: "35%" }}
                            onPress={handleEdit}
                            loading={loading}
                            disabled={loading}
                        >
                            提交认证
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default function EditItemInfoView() {
    const [initLoad, setInitLoad] = useState(false)
    const { itemInfo, getItemInfo, itemId } = useItemStore((state) => {
        return {
            itemInfo: state.itemInfo,
            getItemInfo: state.getItemInfo,
            itemId: state.itemId
        }
    })
    const hideDialog = () => {
        setInitLoad(false)
    }
    const handleCancel = () => {
        // 取消修改
        hideDialog()
        router.back()
    }

    useFocusEffect(useCallback(() => {
        setInitLoad(true)
    }, []))
    return (
        <View style={styles.container}>
            <Portal>
                <Dialog visible={initLoad} onDismiss={hideDialog}>
                    <Dialog.Title style={{ textAlign: "center" }}> <Icon source="alert-circle-outline" color="#D84315" size={20} /><Text>
                        警告：</Text></Dialog.Title>
                    <Dialog.Content>
                        <Text style={{ color: "#D84315" }}>修改该奢侈品信息会导致奢侈品成为不可信来源奢侈品</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>确认</Button>
                        <Button onPress={handleCancel}>取消</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <EditItemInfoForm itemId={itemId}></EditItemInfoForm>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        flex: 1,
        padding: 16,
        boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.123)",
        borderRadius: 16,
    },
    wrap: {
        padding: 10,
        textAlign: "center",
        backgroundColor: "#f7f7f6",
        borderRadius: 10,
    },
    imageWrap: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f7f7f6",

    },
    image: {
        marginTop: 16,
        height: 220,
        width: width * 0.8,
        borderRadius: 10,
    },
})