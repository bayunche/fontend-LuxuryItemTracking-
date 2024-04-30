import { StyleSheet } from "react-native";
import { View } from "../Themed";
import { Button, Modal, Portal, SegmentedButtons, Title } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import CostomInput from "./costomInput";
import { useState } from "react";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useItemStore } from "../../zustand/store";
import { updateSaleInfo } from "../../api/item";
import Toast from "react-native-root-toast";
import { router } from "expo-router";

const EditSalesInfoForm = ({ itemId }: { itemId: string | null }) => {
    const [salesPrice, setSalesPrice] = useState("")
    const [salesPriceErr, setSalesPriceErr] = useState(false)
    const [distributionChannel, setDistributionChannel] = useState("")
    const [distributionChannelErr, setDistributionChannelErr] = useState(false)
    const [salesOutlet, setSalesOutlet] = useState("")
    const [salesOutletErr, setSalesOutletErr] = useState(false)
    const [salesStatus, setSalesStatus] = useState("")
    const [salesTime, setSalesTime] = useState<DateType | undefined>(dayjs())
    const [remark, setRemark] = useState("")
    const [loading, setLoading] = useState(false)
    const [buyer, setBuyer] = useState("")
    const [buyerErr, setBuyerErr] = useState(false)
    const [dateTimePickerVisiable, setDateTimpickerVisiable] = useState(false)
    const setDateTimePickerVisiable = () => {
        setDateTimpickerVisiable(false)
    }

    const containerStyle = {
        backgroundColor: "white",
        padding: 30,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 16,
        textAlign: "center",
    };
    const validate = () => {
        let err = false
        if (salesPrice === "") {
            setSalesPriceErr(true)
            err = true
        } else {
            setSalesPriceErr(false)
        }
        if (distributionChannel === "") {
            setDistributionChannelErr(true)
            err = true
        }
        else {
            setDistributionChannelErr(false)
        }
        if (salesOutlet === "") {
            setSalesOutletErr(true)
            err = true
        }
        else {
            setSalesOutletErr(false)
        }
        if (salesStatus === "") {
            // setSalesStatusErr(true)
            err = true
            Toast.show("请选择销售状态", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            })

        }
        if (salesTime === undefined) {
            // setSalesTimeErr(true)
            err = true
            Toast.show("请选择销售日期", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            })
        }
        if (buyer === "") {
            setBuyerErr(true)
            err = true
            Toast.show("请输入购买人", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            })
        }
        else {
            setBuyerErr(false)
        }

        return !err
    }
    const handleSubmit = async () => {
        setLoading(true)
        if (validate()) {
            let submitData = {
                itemId: itemId,
                salesPrice: salesPrice,
                distributionChannel: distributionChannel,
                salesOutlet: salesOutlet,
                salesStatus: salesStatus,
                salesTime: salesTime,
                remark: remark,
               buyer: buyer
            }
            console.log(submitData)
            try {
                let res = await updateSaleInfo(submitData)
                console.log(res)
                Toast.show("提交成功", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                })
                router.back()
            } catch (error) {
                console.log(error)
                Toast.show("提交失败", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                })
            } finally {
                setLoading(false)
            }

        } else {
            setLoading(false)
            console.log("请检查输入")
            Toast.show("请检查输入", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
        }
    }
    return (
        <View style={styles.form}>
            <Portal>
                <Modal visible={dateTimePickerVisiable} onDismiss={setDateTimePickerVisiable} contentContainerStyle={containerStyle}>
                    <DateTimePicker
                        mode="single"
                        locale={"zh-cn"}
                        timePicker={true}
                        date={salesTime}
                        onChange={(params) => {
                            setSalesTime(params.date)
                        }}
                    />
                </Modal>
            </Portal>
            <ScrollView>
                <View style={styles.wrap}>
                    <Title style={{ textAlign: "center" }}>销售信息修改</Title>
                    <CostomInput label="销售价格" text={salesPrice} disabled={false} validText="请输入正确的销售价格" onChangeText={setSalesPrice} Err={salesPriceErr}></CostomInput>
                    <CostomInput label="分销渠道" text={distributionChannel} disabled={false} validText="请输入正确的分销渠道" onChangeText={setDistributionChannel} Err={distributionChannelErr}></CostomInput>
                    <CostomInput label="销售网点" text={salesOutlet} disabled={false} validText="请输入正确的销售网点" onChangeText={setSalesOutlet} Err={salesOutletErr}></CostomInput>
                    <CostomInput label="购买人" text={buyer} disabled={false} validText="请输入正确的购买人" onChangeText={setBuyer} Err={buyerErr}></CostomInput>
                    <CostomInput label="备注" text={remark} disabled={false} validText="请输入正确的备注" onChangeText={setRemark} Err={false}></CostomInput>
                    <View style={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#ECE9EC" }}>
                        <SegmentedButtons
                            value={salesStatus}
                            onValueChange={setSalesStatus}
                            buttons={[
                                { value: '0', label: '在售中' },

                                {
                                    value: '1',
                                    label: '已售出',
                                },
                                {
                                    value: '2',
                                    label: '已退回',
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.dateTimepicker}>
                        <Title style={{ textAlign: "center", marginBottom: 16 }}>销售日期</Title>
                        <Button style={{ width: '60%' }} mode="contained" onPress={() => setDateTimpickerVisiable(true)}>点击选择日期与时间</Button>
                    </View>

                    <View style={{
                        marginTop: 16,
                        marginBottom: 16
                        , backgroundColor: "#ECE9EC",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button style={{ width: "60%", }} loading={loading} mode="contained" onPress={handleSubmit}>更新运输记录</Button>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default function EditSalesInfoView() {
    const { itemId } = useItemStore((state) => {
        return {
            itemId: state.itemId
        }
    })

    return (
        <View style={styles.container}>
            <EditSalesInfoForm itemId={itemId}></EditSalesInfoForm>
        </View>
    )     
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    form: {
        flex: 1,
        justifyContent: "center",

    },
    wrap: {
        backgroundColor: "#ECE9EC",
        textAlign: "center",
        padding: 16,
        margin: 8,
        borderRadius: 16,
    },
    dateTimepicker: {
        backgroundColor: "#ECE9EC",
        textAlign: 'center',
        alignItems: 'center',
    }
})