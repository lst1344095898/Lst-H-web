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
        //添加token
        if (localStorage.getItem('hwfyh_token')){
            config.headers['token']=localStorage.getItem('hwfyh_token');
        }
        //添加loginUserInfo
        //明码状态，后期采用加密
        if (localStorage.getItem('hwfyh_loginUserInfo')){
            config.headers['loginUserInfo']=encodeURIComponent(localStorage.getItem('hwfyh_loginUserInfo'))
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
//响应拦截器
http.interceptors.response.use(res=>{
    //此处对响应数据做处理
    //暂时不处理
    return res //该返回对象会传到请求方法的响应对象中
},err=>{
    // 响应错误处理
    console.log('响应失败！',err)
    // return Promise.reject(err);
})
export default http
