<template>
  <div id="login_main">
    <div class="login_div">
      <h1>用户登录</h1>
      <el-form :label-position="leftString" label-width="80px">
        <el-form-item label="userName">
          <el-input type="type" v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import UserUtils from "../utils/UserUtils";
export default {
  name: "login",
  data(){
    return{
      leftString:'left',
      userForm:{
        userName:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      this.$axios.post("user/login",this.userForm)
          .then(res=>{
            if (res.data.code===200){
              //保存用户信息
              UserUtils.setUser(res.data.data);
              UserUtils.setToken(res.data.token);
              console.log(UserUtils.getUser())
              this.$message({
                showClose: true,
                duration: 1500,
                message: '登录成功',
                type: 'success'
              });
              this.$router.push('routerHome');
            }
          })
          .catch(err=>{
            console.log(err);
          })
    }
  }
}
</script>

<style scoped src="../assets/css/login.css">

</style>
