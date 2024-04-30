import { Button, HelperText, Modal, Portal, SegmentedButtons, TextInput, Title } from "react-native-paper";
import { View } from "../Themed";
import { StyleSheet } from "react-native";
import { itemInfoType, useItemStore } from "../../zustand/store";
import { useCallback, useState } from "react";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import Toast from "react-native-root-toast";
import { updateLogistInfo } from "../../api/item";
import { router, useFocusEffect } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import APPbars from "../AppBar";
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
const EditLogistInfoForm = ({ itemInfo, itemId }: { itemInfo: itemInfoType, itemId: string }) => {
    const [startPoint, setStartPoint] = useState("")
    const [startPointErr, setStartPointErr] = useState(false)
    const [endPoint, setEndPoint] = useState('')
    const [endPointErr, setEndPointErr] = useState(false)
    const [TransportWay, setTransportWay] = useState('')
    const [TransportWayErr, setTransportWayErr] = useState(false)
    const [TransportCompany, setTransportCompany] = useState('')
    const [TransportCompanyErr, setTransportCompanyErr] = useState(false)
    const [TransportNumber, setTransportNumber] = useState('')
    const [TransportNumberErr, setTransportNumberErr] = useState(false)
    const [TransportDate, setTransportDate] = useState<DateType | undefined>(dayjs())
    const [errorMessage, setErrorMessage] = useState('')
    const [status, setStatus] = useState('')
    const [remark, setRemark] = useState('')
    const [loading, setLoading] = useState(false)
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
        if (startPoint === "") {
            setStartPointErr(true)
            err = true
        } else {
            setStartPointErr(false)
            err = false
        }
        if (endPoint === "") {
            setEndPointErr(true)
            err = true
        } else {
            setEndPointErr(false)
            err = false
        }
        if (TransportWay === "") {
            setTransportWayErr(true)
            err = true
        } else {
            setTransportWayErr(false)
            err = false
        }
        if (TransportCompany === "") {
            setTransportCompanyErr(true)
            err = true
        } else {
            setTransportCompanyErr(false)
            err = false
        }
        if (TransportNumber === "") {
            setTransportNumberErr(true)
            err = true
        } else {
            setTransportNumberErr(false)
            err = false
        }
        // if (TransportDate === "") {
        //     setTransportDateErr(true)
        //     err=true
        // }else{
        //     setTransportDateErr(false)
        //     err=false
        // }
        if (err) {
            return false
        } else {
            return true
        }
    }
    const handleSubmit = async () => {
        setLoading(true)
        if (validate()) {
            // 提交表单
            let submitData = {
                startPoint: startPoint,
                endPoint: endPoint,
                TransportWay: TransportWay,
                TransportCompany: TransportCompany,
                TransportNumber: TransportNumber,
                TransportDate: TransportDate,
                errorMessage: errorMessage,
                status: parseInt(status),
                remark: remark,
                itemId: itemId
            }
            console.log(submitData)

            try {
                let res = await updateLogistInfo(submitData)
                console.log(res)
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
            Toast.show("提交成功", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
            router.back()
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
        <View >
            <Portal>
                <Modal visible={dateTimePickerVisiable} onDismiss={setDateTimePickerVisiable} contentContainerStyle={containerStyle}>
                    <DateTimePicker
                        mode="single"
                        locale={"zh-cn"}
                        timePicker={true}
                        date={TransportDate}
                        onChange={(params) => {
                            setTransportDate(params.date)
                        }}
                    />
                </Modal>
            </Portal>
            <ScrollView scrollEnabled>
                <View style={styles.warp}>
                    <View style={{
                        backgroundColor: "#ECE9EC",
                        padding: 8,
                    }}>
                        <Title style={{ textAlign: "center" }}>物流信息修改</Title>
                        <CostomInput label="运输起点" text={startPoint} onChangeText={text => setStartPoint(text)} disabled={false} validText="请输入运输起点" Err={startPointErr} />
                        <CostomInput label="运输终点" text={endPoint} onChangeText={text => setEndPoint(text)} disabled={false} validText="请输入运输终点" Err={endPointErr} />
                        <CostomInput label="运输方式" text={TransportWay} onChangeText={text => setTransportWay(text)} disabled={false} validText="请输入运输方式" Err={TransportWayErr} />
                        <CostomInput label="运输公司" text={TransportCompany} onChangeText={text => setTransportCompany(text)} disabled={false} validText="请输入运输公司" Err={TransportCompanyErr} />
                        <CostomInput label="运输单号" text={TransportNumber} onChangeText={text => setTransportNumber(text)} disabled={false} validText="请输入运输单号" Err={TransportNumberErr} />
                        <CostomInput label="备注" text={remark} onChangeText={text => setRemark(text)} disabled={false} validText="请输入备注" Err={false} />
                    </View>
                    <View style={styles.dateTimePicker}>
                        <Title style={{ textAlign: "center", marginBottom: 16 }}>运输日期</Title>
                        <Button style={{ width: '45%' }} mode="contained" onPress={() => setDateTimpickerVisiable(true)}>点击添加日期</Button>
                    </View>
                    <View style={{
                        backgroundColor: "#ECE9EC",
                        padding: 8,
                        margin: 8
                    }}>
                        <Title style={{ textAlign: "center" }}>运输状态</Title>
                        <SegmentedButtons
                            style={{ marginBottom: 16 }}
                            value={status}
                            onValueChange={setStatus}
                            buttons={[
                                {
                                    value: '0',
                                    label: '已开始',
                                },
                                {
                                    value: '1',
                                    label: '运输中',
                                },
                                { value: '2', label: '已完成' },
                                { value: '3', label: '出错' },

                            ]}
                        />

                        {status == "3" ?
                            <CostomInput label="出错信息" text={errorMessage} onChangeText={text => setErrorMessage(text)} disabled={false} validText="请输入出错信息" Err={false} />
                            : ""}
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

export default function EditLogistInfoView() {
    const { itemInfo, getItemInfo, itemId } = useItemStore((state) => {
        return {
            itemInfo: state.itemInfo,
            getItemInfo: state.getItemInfo,
            itemId: state.itemId
        }
    })
    useFocusEffect(useCallback(() => {
        getItemInfo({ itemId })
    }, []))
    return (
        <View style={styles.container}>
            <EditLogistInfoForm itemInfo={itemInfo} itemId={itemId} />
        </View>
    )
}
const styles = StyleSheet.create({
    // ...
    container: {
        flex: 1
    },
    warp: {
        backgroundColor: "#ECE9EC",
        textAlign: "center",
        padding: 8,
        margin: 8,
        borderRadius: 16,
    },
    form: {
        backgroundColor: "#ECE9EC",
        textAlign: 'center',
    },
    dateTimePicker: {
        backgroundColor: "#ECE9EC",
        textAlign: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: "#ECE9EC",
        paddingBottom: 8,
    },
})