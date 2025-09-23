import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';

const service = axios.create({
    baseURL: "https://cs571.org/rest/s25/hw9",
    headers: {
        "X-CS571-ID": "your-bid-here"
    }
})

// 请求拦截器：自动添加 JWT
service.interceptors.request.use(async (config) => {
    token = await SecureStore.getItemAsync("jwt");
    if (token) {
        config.headers.Authorization = `bear ${token}`
    }
    return config
}, err => Promise.reject(err))

// 响应拦截器：统一处理错误
service.interceptors.response.use(response => {
    return response;
}, err => {
    if (err.response?.status === 401) {
        Alert.alert("错误", "身份过期，请重新登录！")
    } else {
        console.warn("请求出错", err)
    }
    return Promise.reject(err)
})