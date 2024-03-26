import { create } from "zustand";
import { getItemDetail, getListItem } from "../api/item";
import { getUserInfos } from "../api/login";
// import { login } from "../api/login";

interface useUserState {
    userId: string;
    setUserId: (by: string) => void;
    authToken: string;
    setAuthToken: (by: string) => void;
    removeAuthToken: () => void;
    removeUserId: () => void;
    userInfo: any;
    setUserInfo: (by: any) => void;
    removeUserInfo: (by: any) => void;
    getUserInfo: (by: any) => object;
}

interface useItemInfoState {
    setItemId: (by: string) => void;
    itemId: string;
    setItemInfo: (by: itemInfoType) => void;
    itemInfo: itemInfoType;
    removeItemInfo: (by: itemInfoType) => void;
    getItemInfo: (by: object) => any;
    itemList: any[];
    getItemList: (by: object) => any;
}

type res = {
    data: object;
};
type info = {
    data: object;
};
type itemInfoType= {
    title: string;
    value: string | number;
    itemName: string;
    itemId: string;
    itemImage: string;
    itemDate: string | Date | number;
    serialNumer: bigint;
    creater: string;
    id: number;
    createTime: string | Date | number | bigint;
    status: number;
    startPoint: string;
    endPoint: string;
    TransportWay: string;
    TransportNumber: number | string;
    TransportCompany: string;
    updater: string;
    blockNumber: bigint;
    transactionHash: string;
    qrcode: string;
    salesTime: Date | number | string;
    salesPrice: string | number;
    distributionChannel: string;
    salesOutlet: string;
    createdAt: Date | number | string | bigint;
    updatedAt: Date | number | string | bigint;
}

const useUserStore = create<useUserState>((set) => ({
    userId: "",
    setUserId: (id: string) => set(() => ({ userId: id })),
    authToken: "",
    setAuthToken: (token: string) => set(() => ({ authToken: token })),
    removeUserId: () => set(() => ({ userId: "" })),
    removeAuthToken: () => set(() => ({ authToken: "" })),
    userInfo: <itemInfoType>{},
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
    getUserInfo: async (by: object) => {
        let res = await getUserInfos();
        console.log(res.data);
        let info: any = res.data;
        console.log(info.data);
        set(() => ({ userInfo: info.data }));
        return info.data;
    },
}));
const useItemStore = create<useItemInfoState>((set) => ({
    itemId: "",
    setItemId: (id: string) => {
        set(() => ({ itemId: id }));
    },
    setItemInfo: (by: itemInfoType) => set(() => ({ itemInfo: by })),
    itemInfo: <itemInfoType>{},
    removeItemInfo: (by: object) => set(() => ({ itemInfo: <itemInfoType>{} })),
    itemList: [],
    getItemList: async (params: object) => {
        let result: any = [];
        try {
            let info: any = await getListItem(params);
            result = await info.data.data;
            set(() => ({ itemList: result }));
        } catch (error) {
            console.log(error);
        }

        return result;
    },
    getItemInfo: async (params: object) => {
        let result: any = {};

        try {
            let res: any = await getItemDetail(params);
            let info = res.data.data;
            set(() => ({ itemInfo: info }));
            result = info;
        } catch (error) {
            console.log(error);
        }

        return result;
    },
}));

export { useUserStore, useItemStore, itemInfoType };
