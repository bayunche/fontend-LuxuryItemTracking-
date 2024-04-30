import { Modal, Portal } from "react-native-paper"

import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
export default function DateTimeSelecter({ visible, onDismiss, date, onChange }: { visible: boolean, onDismiss: () => void, date: Date, onChange: (date: DateType) => void }) {

    const containerStyle = {
        backgroundColor: "white",
        padding: 30,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 16,
        textAlign: "center",
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
                <DateTimePicker
                    mode="single"
                    locale={"zh-cn"}
                    timePicker={true}
                    date={date}
                    onChange={(params) => {
                        onChange(params.date)
                    }}
                />
            </Modal>
        </Portal>
    )
}