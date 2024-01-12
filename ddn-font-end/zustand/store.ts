import { create } from 'zustand'
import { login } from "../api/login";

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

const useUserStore = create<useUserState>((set) => ({
    userId: "",
    setUserId: (id: string) => set(() => ({ userId: id })),
    authToken: "",
    setAuthToken: (token: string) => set(() => ({ authToken: token })),
    removeUserId: () => set(() => ({ userId: "" })),
    removeAuthToken: () => set(() => ({ authToken: "" })),
    userInfo: {},
    setUserInfo: (info: any) => set(() => ({ userInfo: info })),
    removeUserInfo: (info: any) => set(() => ({ userInfo: {} })),
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

export default useUserStore;