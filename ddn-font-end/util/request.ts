
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../app.json';
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Toast from 'react-native-root-toast';
import { tansParams } from '../util/paramsEdit';
import { router } from "expo-router";
// import { err } from 'react-native-svg/lib/typescript/xml';

type Result<T> = {
    // code: number;
    message: string;
    result: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance;
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = { baseURL: baseUrl, timeout: 60000 };

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例
        this.instance = axios.create(Object.assign(this.baseConfig, config));
        this.instance.interceptors.request.use(
            async (config: AxiosRequestConfig): Promise<any> => {
                // 一般会请求拦截里面加token，用于后端的验证
                const token = await AsyncStorage.getItem('authToken')


                if (token) {
                    config.headers = config.headers || {};
                    // 注意使用Bearer + token拼接
                    config.headers.Authorization =  token;
                }
                if (config.method === "get" && config.params) {
                    let url = config.url + "?" + tansParams(config.params);
                    url = url.slice(0, -1);
                    config.params = {};
                    config.url = url;
                }
                return config;
            },
            (err: any) => {
                // 请求错误，这里可以用reactNativeToast进行提示
                Toast.show(`${err}`)
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            async (res: AxiosResponse) => {
                // 直接返回res，当然你也可以只返回res.data
                // 系统如果有自定义code也可以在这里处理
                // 获取Bearer保存在store中
                if (res.headers.authorization) {
                    await AsyncStorage.setItem('authToken', res.headers.authorization)
                }
                if (res.data.status=="refuse") {
                    return Promise.reject(res.data.msg)
                }
         
                return res;
            },
            (err: any) => {
                // 这里用来处理http常见错误，进行全局提示
                console.log(err)
                // 这里错误消息可以使用全局弹框展示出来
                // 比如element plus 可以使用 ElMessage
                // ElMessage({
                //   showClose: true,
                //   message: `${message}，请检查网络或联系管理员！`,
                //   type: "error",
                // });
                //如果返回值为401则调用router重定向到登录页
                if (err.response.status === 401) {
                    // 这里可以调用router进行重定向到登录页
                    router.replace('/login')
                Toast.show("登录已过期，请重新登录")

                    return Promise.reject(err);
                }
          
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                Toast.show(`Request failed to send ErrorMessage：${err}`)
                return Promise.reject(err.response);
            }
        );
    }

    // 定义请求方法
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config);
    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.post(url, data, config);
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.delete(url, config);
    }
}

// 默认导出Request实例
export default new Request({})
