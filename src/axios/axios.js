//分装axios
import axios from "axios";

const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 50000,
    hearts: {
    }

})
//请求发送前拦截
http.interceptors.request.use(
    config =>{
        if (localStorage.getItem('token')){
            config.headers['token']=localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

export default http