
const UserUtils ={
    setUser:function (user){
        localStorage.setItem('userInfo',JSON.stringify(user));
    },
    getUser:function (){
        return JSON.parse(localStorage.getItem('userInfo'));
    },
    setToken:function (token){
      localStorage.setItem("token",token);
    },
    getToken:function (){
        return localStorage.getItem("token")
    }
}
export default UserUtils
