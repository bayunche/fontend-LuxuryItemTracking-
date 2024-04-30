import { HelperText, TextInput } from "react-native-paper"
import { View } from "../Themed"
import { StyleSheet } from "react-native"


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
const styles=StyleSheet.create({
    input:{
        marginBottom:10,
        backgroundColor: "#ECE9EC",
    }
})
export default CostomInput