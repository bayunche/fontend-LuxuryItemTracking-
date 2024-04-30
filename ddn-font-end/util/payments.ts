import { getAliOrderInfo, getCharge } from "../api/user"
// import Alipay from '@uiw/react-native-alipay';
// const scheme = `alipay` + `9021000135698648`
// 沙箱环境
// Alipay.setAlipaySandbox(true)
// 非沙箱环境
// Alipay.setAlipayScheme(scheme)
import { Linking } from 'react-native';
interface AlipayParams {
    method: string;
    app_id: string;
    charset: string;
    version: string;
    sign_type: string;
    timestamp: string;
    biz_content: string;
    sign: string;
}
const getOrderStr = async (value: number, trueMoney: number) => {
    let data = { value, trueValue: trueMoney }
    try {
        let orderStr: any = await getAliOrderInfo(data)
        let dataStr: string = orderStr.data as string
        console.log(data)
        return dataStr

    } catch (error) {
        console.log(error)
        return ''
    }

}

// const getSchemeUrl = (orderStr: string): string => {
//     const paris = orderStr.split('&')
//     const params: Partial<AlipayParams> = {};
//     paris.forEach(pair => {
//         const [key, value] = pair.split('=');
//         params[key as keyof AlipayParams] = decodeURIComponent(value);
//     });
//     const queryString = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
//     return `alipay://platformapi/startapp?appId=20000056${queryString}`;

// }

const createAliOrder = async (value: number, trueMoney: number) => {
    try {
        const orderStr = await getOrderStr(value, trueMoney)
        //    const schemeUrl=  getSchemeUrl(orderStr as string)
        const schemeUrl = orderStr
        //    console.log(schemeUrl)
        const supported = await Linking.canOpenURL(schemeUrl)
        if (!supported) {
            console.log('无法处理该URL');
        } else {
            await Linking.openURL(schemeUrl);
        }
    } catch (error) {
        console.log(error)

    }
}
export default createAliOrder

// import * as pingpp from "pingpp-js"




// const createOrder= async (value: number) => {


//     pingpp.createPayment(

//         )
// }