import { create } from 'zustand'
import { getItemDetail, getListItem } from '../api/item';
// import { login } from "../api/login";

interface useUserState {
    userId: string,
    setUserId: (by: string) => void,
    authToken: string,
    setAuthToken: (by: string) => void,
    removeAuthToken: () => void,
    removeUserId: () => void,
    userInfo: any,
    setUserInfo: (by: any) => void,
    removeUserInfo: (by: any) => void
}

interface useItemInfoState {
    setItemId: (by: string) => void,
    itemId: string,
    setItemInfo: (by: object) => void,
    itemInfo: object,
    removeItemInfo: (by: object) => void,
    getItemInfo: (by: object) => object,
    itemList: any[],
    getItemList: (by: object) => any,
}

const useUserStore = create<useUserState>((set) => ({
    userId: "",
    setUserId: (id: string) => set(() => ({ userId: id })),
    authToken: "",
    setAuthToken: (token: string) => set(() => ({ authToken: token })),
    removeUserId: () => set(() => ({ userId: "" })),
    removeAuthToken: () => set(() => ({ authToken: "" })),
    userInfo: {},
    setUserInfo: (info: any) => set(() => ({ userInfo: info })),
    removeUserInfo: () => set(() => ({ userInfo: {} })),
    // login: (data: object) => {
    //     let result={}
    //     // 调用登录接口
    //     login(data).then(res => {
    //         result=res
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     return result;
    // }

}))
const useItemStore = create<useItemInfoState>((set) => ({
    itemId: "",
    setItemId: (id: string) => set(() => ({ itemId: id })),
    setItemInfo: (by: object) => set(() => ({ itemInfo: by })),
    itemInfo: {},
    removeItemInfo: (by: object) => set(() => ({ itemInfo: {} })),
    itemList: [],
    getItemList: async (params: object) => {
        let result: any = []
        console.log(params)
        try {
            let info: any = await getListItem(params)
            result =await info.data.data
            set(() => ({ itemList:  result }))

        } catch (error) {
            console.log(error)
        }


        return result
    },
    getItemInfo: (params: object) => {
        let result: any = {}
        getItemDetail(params).then((res: any) => {
            let info = res.data
            result = info
            set(() => ({ itemInfo: info }))
        })
        return result
    },
}
))

export { useUserStore, useItemStore };