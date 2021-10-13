import axios from "axios"
import qs from "qs"
import { getCookie } from "./cookie"

const http = axios.create({
    baseURL: 'http://bw.gsruiying.com.cn'
  });
  
http.defaults.timeout = 25000;

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    if(config.data && !(config.data instanceof FormData)){
        config.data = qs.stringify(config.data)
    }

    config.headers['Authori-zation'] = 'Bearer '+getCookie('token')

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    
    if(response.data.status!==200){
        alert('参数错误');
    }
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    alert('请求参数错误');
    return Promise.reject(error);
  });

export default http