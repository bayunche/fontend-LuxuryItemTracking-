import request from "../util/request";

// 获取物品列表
export async function getListItem(params: object) {
   
    // console.log(request.post)
    return await request.get('/item/getItemList',params)

}
// 获取物品信息
export async function getItemDetail(params: object) {
     return await request.get('/item/getItemDetails',params)
}
// 注册奢侈品
export async function registerLuxuryUser(params: object) {
    return await request.get('/user/certifiedUser',params)
}

export async function registerLuxuryItem(data: object) {
    return await request.post('/certify/mintLuxuryItem', data)
}