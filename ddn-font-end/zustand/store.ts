import { create } from "zustand";
import { getItemDetail, getListItem } from "../api/item";
import { getTransactionInfo, getTransactionListByUserId, getUserInfos, getConsumeListByUserId } from "../api/user";
import { getTopUp } from "../api/login";
import { DateType } from "react-native-ui-datepicker";
// import { login } from "../api/login";

interface useTransactionState {
    transactionLogId: number
    setTransactionLogId: (by: number) => void
    transactionLogs: transactionLog
    getTransactionLogs: (id: number) => void
    setTransactionLogs: (by: transactionLog) => void
    getTransactionList: () => void
    transactionList: transactionLog[]
    setTransactionList: (by: transactionLogList) => void
}

interface useConsumeListState {
    consumeId: string
    setConsumeId: (by: string) => void
    consumeList: consumeProps[]
    getConsumeList: () => void
    setConsumeList: (by: consumeProps[]) => void
}

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
    TopUpMoney: number;
    getTopUpMoney: (by: any) => any;
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
type itemInfoType = {
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
    TransportNumber: string;
    TransportCompany: string;
    TransportDate: string | DateType | undefined;
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
    brand: string
    model: string
    errorMessage: string
    remark: string
    salesInfoBlockNumber: bigint
    logisticsInfoBlockNumber: bigint
    logistics_status: string | number
    salesInfo_status: string | number
    hasChange: string
    reason: string | null | undefined
}
type transactionLog = {
    id: number,
    creater: string,
    itemName: string,
    itemId: string,
    createTime: Date | string | number | bigint,
    serialNumber: bigint,
    blockNumber: bigint,
    transactionHash: string,
    description: string,
}
type consumeProps = {
    out_trade_no: string,
    balance: string | number | bigint | undefined | null,
    beforeBalance: string | number | bigint | undefined | null,
    tradeTime: Date | string | undefined | null,
    trueValue: string | number | bigint | undefined | null,
}
type transactionLogList = transactionLog[]
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
    TopUpMoney: 0,
    getUserInfo: async (by: object) => {
        let res = await getUserInfos();
        let info: any = res.data;
        set(() => ({ userInfo: info.data }));
        return info.data;
    },

    getTopUpMoney: async (by: any) => {
        let res = await getTopUp({});
        let info: any = res.data;
        set(() => ({ TopUpMoney: info.data }));
        return info.data;
    }
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
const useTransactionStore = create<useTransactionState>((set) => ({
    transactionLogId: 0,
    setTransactionId: (id: number) => set(() => ({ transactionLogId: id })),
    getTransactionList: async () => {
        let result: transactionLogList = [];
        try {
            let info: any = await getTransactionListByUserId();
            result = await info.data as transactionLogList
            set({ transactionList: result })
        } catch (error) {
            console.log(error);
        }

        return result;
    },

    transactionLogs: <transactionLog>{},
    transactionList: <transactionLogList>[],
    getTransactionLogs: async (id: number) => {
        let result: any = {};
        try {
            let info: any = await getTransactionInfo({ transactionLogId: id });
            result = await info.data
            set(() => ({ transactionLogs: result }));
        } catch (error) {
            console.log(error);
        }

        return result;
    },
    setTransactionLogId: (id: number) => set(() => ({ transactionLogId: id })),
    setTransactionLogs: (transactionLog: transactionLog) => set(() => ({ transactionLogs: transactionLog })),
    setTransactionList: (by) => set({ transactionList: by }),

}))
const useConsumeListStore = create<useConsumeListState>((set) => ({
    consumeId: '',
    setConsumeId: (id: string) => set(() => ({ consumeId: id })),
    consumeList: <consumeProps[]>[],
    getConsumeList: async () => {
        let result: consumeProps[] = []
        try {
            let info: any = await getConsumeListByUserId()
            console.log(info);
            result = await info.data as consumeProps[] 
            set({ consumeList: result })
        } catch (error) {
            console.log(error);
        }
        return result

    },

    setConsumeList: (by) => set({ consumeList: by }),

}))
export { useUserStore, useItemStore, itemInfoType, useTransactionStore,useConsumeListStore , transactionLogList, transactionLog };
