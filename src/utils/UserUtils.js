
const UserUtils ={
    setUser:function (user){
        localStorage.setItem('hwfyh_loginUserInfo',JSON.stringify(user));
    },
    getUser:function (){
        let loginUserInfo = localStorage.getItem('hwfyh_loginUserInfo')
        if(loginUserInfo==null)
            return null;
        else
            return JSON.parse(loginUserInfo);
    },
    removeUser: function (){
        localStorage.removeItem('hwfyh_loginUserInfo');
    },
    setToken:function (token){
      localStorage.setItem("hwfyh_token",token);
    },
    getToken:function (){
        return localStorage.getItem("hwfyh_token");
    },
    removeToken:function (){
        return localStorage.removeItem("hwfyh_token");
    }

}
export default UserUtils
