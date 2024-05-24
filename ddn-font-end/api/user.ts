import { createUserPrivateKeyParams } from "../components/registerUser";
import request from "../util/request";



export async function createUserKey(data: createUserPrivateKeyParams) {
    return (await request.post("/user/signupUser", data)).data
}

export async function editUserInfo(data: any) {
    return request.post("/user/editUserInfo", data);
}
export async function editPassword(data: object) {
    return request.post('/user/editPassword', data)
}
export async function getUserInfos() {
    return await request.get('/user/getUserInfo')
}
export async function getAliOrderInfo(data: object) {
    return (await request.post('/user/getAliOrderInfo', data)).data
}
export async function getCharge(data: object) {
    return (await request.post('/user/getCharge', data)).data
}
export async function getTransactionListByUserId() {
    return (await request.get('/user/getTransactionLogList')).data
}
export async function getTransactionInfo(params: any) {
    let { transactionLogId } = params
    return (await request.get(`/user/getTransactionLog?transactionLogId=${transactionLogId}`)).data
}
export async function fetchBannerData() {
    return (await request.get('/item/getBanner')).data
}