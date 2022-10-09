import axios from 'axios'
// 引入进度条0
import nprogress from 'nprogress';

//引入相关进度条的样式
import 'nprogress/nprogress.css';

const ajax = axios.create({
        baseURL: "http://localhost:3000",
        // xhrFields: {
        //     withCredentials: true, //关键
        // },
    })
    // 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
ajax.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    return config;
});
// 响应拦截器
ajax.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('failed'));
});


export default ajax;