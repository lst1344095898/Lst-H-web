const HttpUtils={
    HttpPost:function (url,fileDate){
        //上传开始时间
        //let ot;
        //已经上传文件大小
        //let oloaded;
        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        //true为异步处理 // 加入请求类型和路径 和异步处理
        xhr.open('post', url + '?username=index', true);
        // xhr.setRequestHeader('content-type', 'multipart/form-data');
        //上传开始执行方法onloadstart在xhr上传的时候执行函数
        xhr.onloadstart = function() {
            console.log('开始上传')
            //上传开始时间为当前时间
            //ot = new Date().getTime(); //设置上传开始时间
            //已上传文件大小为0
            //oloaded = 0; //已上传的文件大小为0
        };
        // 上传对象 addEventListener添加句柄 进度函数 当请求接收到更多数据时，周期性地触发。
        //xhr.upload.addEventListener('progress', progressFunction, false);
        // 添加句柄请求完成时触发
        //xhr.addEventListener("load", uploadComplete, false);
        //请求错误时候触发
        //xhr.addEventListener("error", uploadFailed, false);
        //当请求被停止时候触发
        //xhr.addEventListener("abort", uploadCanceled, false);
        //请求发送
        xhr.send(fileDate);
    }
}
export default HttpUtils
