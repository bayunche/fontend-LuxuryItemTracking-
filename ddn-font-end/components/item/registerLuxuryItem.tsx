import { ActivityIndicator, Button, Dialog, HelperText, MD2Colors, Portal, TextInput, Title } from "react-native-paper";
import { View } from "../Themed";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import * as imagePicker from "expo-image-picker";
import { useItemStore } from "../../zustand/store";
import Toast from "react-native-root-toast";
import { registerLuxuryItem } from "../../api/item";
import { Image } from 'expo-image';
import { router } from "expo-router";
const { width } = Dimensions.get("window");

const CostomInput = ({ label, text, onChangeText, disabled, validText, Err }: { label: string, text: string, onChangeText: (text: string) => void, disabled: boolean, validText: string, Err: boolean }) => {
    return (
        <View style={styles.input}>
            <TextInput
                label={label}
                value={text}
                mode="outlined"
                error={Err}
                disabled={disabled}
                onChangeText={text => onChangeText(text)}
            />
            <HelperText type="error" visible={Err}>
                {validText}
            </HelperText>
        </View>
    )
}

export default function RegisterItemView() {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const hideDialog = () => setDialogVisible(false);
    const [select, setSelect] = useState("0");
    const [initalLoad, setInitalLoad] = useState(true);
    const [itemName, setItemName] = useState("");
    const [itemDate, setItemDate] = useState<DateType | undefined>(dayjs());
    const [itemImage, setItemImage] = useState<String | undefined | null>(null);
    const [loading, setLoading] = useState(false);
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const { itemList, getItemList, setItemId, itemId } = useItemStore(
        (state) => ({
            itemList: state.itemList,
            getItemList: state.getItemList,
            setItemId: state.setItemId,
            itemId: state.itemId,
        })
    );
    const [brand, setBrand] = useState("")
    const [brandErr, setBrandErr] = useState(false)
    const [model, setModel] = useState("")
    const [modelErr, setModelErr] = useState(false)
    const [nameErr, setNameErr] = useState(false)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try {
            setInitalLoad(false);
            setDialogVisible(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleResign = async () => {
        let data = { itemName, itemImage, itemDate, brand, model };
        if (itemName == "" || itemImage == "" || itemDate == "" || brand == "" || model == "") {

            //循环遍历获取哪个为空设置err
            if (itemName == "") {
                setNameErr(true)
            }
            if (model == '') {
                setModelErr(true)
            }
            if (brand == "") {
                setBrandErr(true)
            }



            return Toast.show("请完整填写表单", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        }

        try {
            setLoading(true);
            let res: any = await registerLuxuryItem(data);
            console.log(res.data);
            Toast.show(`奢侈品注册成功`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            setLoading(false);
            router.push("/(tabs)/personalItem");


        } catch (error: any) {
            console.log(error);
            Toast.show(`${error.msg}`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        } finally {
            setLoading(false);
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
    return (
        <View style={styles.resignModel}>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
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
                    <View style={styles.form}>
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
                            onPress={handleResign}
                            loading={loading}
                            disabled={loading}
                        >
                            提交认证
                        </Button>
                    </View>
                </View>
                {/* <ActivityIndicator animating={loading} color={MD2Colors.red800} /> */}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        // backgroundColor: "#fffccc",
    },

    title: {
        textAlign: "center",
        marginVertical: 10,
        // Adjust your styling as needed
    },

    giftIcon: {
        alignSelf: "center",
        backgroundColor: "#6200ee", // Customize your color
        marginVertical: 10,
    },
    shoesContainer: {
        // Container for shoes
        // backgroundColor: "#fffccc",

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // flexFlow:"row wrap"11
    },
    shoeCard: {
        margin: 10,
        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.123)",
        width: "44.8%",
        // Additional styling
    },
    resignModel: {
        flex: 1,
        padding: 16,
        boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.123)",
        borderRadius: 16,
    },
    form: {

    },
    imageWrap: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f7f7f6",

    },
    input: {
        backgroundColor: "#f7f7f6",
        paddingBottom: 16,
    },
    image: {
        marginTop: 16,
        height: 220,
        width: width * 0.8,
        borderRadius: 10,
    },
    wrap: {
        padding: 10,
        textAlign: "center",
        backgroundColor: "#f7f7f6",
        borderRadius: 10,
    },
});