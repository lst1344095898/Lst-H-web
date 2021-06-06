<template>
  <div id="router_home_main">
    <el-container class="router_home_container">
      <el-header class="router_home_head">
        <i class="el-icon-s-platform"></i>
        嘀嘀嘀
      </el-header>
      <el-container>
        <el-aside class="router_home_aside" style="width: 140px">
          <div class="menu_div">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <div class="function_div" @click="synchronizeFiles">
                <div class="function_top_div" >
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="img.synchronizeFiles.url"
                      :fit='img.synchronizeFiles.style'>
                  </el-image>
                </div>
                <div class="function_footer_div">
                  <span>{{img.synchronizeFiles.words}}</span>
                </div>
            </div>
          </el-main>
          <el-footer>footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "RouterHome",
  data(){
    return{
      img:{
        synchronizeFiles:{
            url:require('../assets/img/synchronizeFiles.png'),
            style: 'fill',
            words: '同步文件'
        }
      }
    }
  },
  methods:{
    /**
     * 跳转同步文件页面
     */
    synchronizeFiles(){
      const {href}=this.$router.resolve({
        path: '/synchronizeFiles'
      });
      window.open(href,
          '_blank')
    }
  }
}
</script>

<style scoped src="../assets/css/routerHome.css">

</style>
