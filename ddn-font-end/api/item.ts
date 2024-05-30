import request from "../util/request";

// 获取物品列表
export async function getListItem(params: object) {

    // console.log(request.post)
    return await request.get('/item/getItemList', params)

}
// 获取物品信息
export async function getItemDetail(params: object) {
    return await request.get('/item/getItemDetails', { params })
}
// 注册奢侈品
export async function registerLuxuryUser(params: object) {
    return await request.get('/user/certifiedUser', params)
}

export async function registerLuxuryItem(data: object) {
    return (await request.post('/certify/mintLuxuryItem', data)).data
}
// 删除奢侈品信息
export async function deleteLuxuryItem(params: any) {
    let { itemId } = params
    return (await request.delete(`/item/deleteItem?itemId=${itemId}`)).data
}
// 更新奢侈品物流信息
export async function updateLogistInfo(data: object) {

    return (await request.post('/certify/updateLogistics', data)).data
}

// 更新奢侈品销售信息
export async function updateSaleInfo(data: object) {
    return (await request.post('/certify/updateSalesRecord', data)).data
}
//更新奢侈品信息
export async function updateLuxuryItem(data: object) {
    return (await request.put('/certify/updateItemInfo', data)).data
}

export async function refreshItemValuaction(data: object) {
    return (await request.post('/certify/setLuxuryItemValuation', data)).data
}
export async function getItembanner(params: object) {
    return (await request.get('/item/getItemBanner', {params})).data
}

//搜索物品
export async function searchItem(params: object) {
 return (await request.get("/item/searchItem",{params})).data   
}