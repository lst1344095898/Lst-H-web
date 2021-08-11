import axios from "./axios";
import * as QS from "querystring";
const HttpAxios = {
    get:function (url,formData){
        return new Promise((resolve, reject) =>{
            axios.get(url, {
                params: formData,
            }).then(res => {
                console.log("成功"+res.data);
                resolve(res.data);
            }).catch(err =>{
                console.log("失败"+err)
                reject(err.data)
            })
        });
    },
    getFile:function (url){
        return new Promise((resolve, reject) =>{
            axios.get(url, {
                responseType:'blob'
            }).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data)
            })
        });
    },
    post:function (url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, QS.stringify(params))
                .then(res => {
                    resolve(res.data);
                })
                .catch(err =>{
                    reject(err.data)
                })
        });
    },
    postFile:function (url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method:"POST",
                url:url,
                data: params,
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err =>{
                    reject(err.data)
                })
        });
    }
}
export default HttpAxios

