<template>
  <div id="synchronizeFiles_main">
    <el-container class="synchronizeFiles_div">
      <el-header>Header</el-header>
      <el-main>
        <div class="my_file_div">
          <el-table
              :data="fileData"
              border
              style="width: 100%;align-content: center"
              max-height="250"
          >
            <el-table-column
                prop="uploadTime"
                label="上传时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="fileSize"
                label="文件大小"
                width="120">
            </el-table-column>
            <el-table-column
                prop="fileType"
                label="文件类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="synchronizeTime"
                label="同步时间"
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="uploadNumber"
                label="提交次数"
                width="100">
            </el-table-column>
            <el-table-column
                align="left">
              <template slot="header">
                <el-button
                    style="margin-left: 22px"
                    @click="uploadFileTrue()"
                    type="text"
                    size="small">
                  <i class="el-icon-upload2"></i>上传新文件
                </el-button>
                <el-input v-show="false"  id="uploadFileInput" type="file" @input="uploadFile()"/>
              </template>
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="deleteFile(scope)"
                    type="text"
                    size="small">
                  删除文件
                </el-button>
                <el-button
                    @click.native.prevent="synchronizeFile(scope)"
                    type="text"
                    size="small">
                  同步文件
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

  </div>
</template>

<script>
import UserUtils from "../../utils/UserUtils";
export default {
  name: "synchronizeFiles",
  data(){
    return{
      fileData:[
          {
            uploadTime:'2021-6-6',
            fileName:'模拟文件',
            fileSize:'1.2MB',
            fileType:'zip',
            synchronizeTime:'2021-6-7',
            uploadNumber:'1'
          }
      ],
    }
  },
  methods:{
    /**
     * 删除文件
     */
    deleteFile(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确定删除
        this.fileData.splice(data.$index,data.$index+1);
        //取消删除
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 1500,
          message: '已取消删除',
          type: 'info',
        });
      });
      console.log(data.$index)
    },
    /**
     * 同步文件
     */
    synchronizeFile(data){
      console.log(data.$index)
    },
    test(){
      console.log("触发")
    },
    /**
     * 上传传新文件
     */
    uploadFileTrue(){
      let uploadFileInput = document.getElementById('uploadFileInput');
      uploadFileInput.click();
    },
    uploadFile(){
      //获取选择文件
      let file = document.getElementById('uploadFileInput').files[0];
      if (file==null){
        this.$message({
          showClose: true,
          duration: 1500,
          message: '文件为空,不能上传',
          type: 'success',
        })
        return;
      }
      //创建formData对象
      let formData = new FormData();
      formData.append("file",file);
      this.$axios({
            method:"POST",
            url:"file/uploadFile",
            data: formData,
            headers: {
              'Content-Type':'multipart/form-data',
              'userString': JSON.stringify(UserUtils.getUser())
            }
          })
          .then(res=>{
            if (res.data.code===200){
              this.$message({
                showClose: true,
                duration: 1500,
                message: '文件上传成功',
                type: 'success',
              })
            }else{
              this.$message({
                showClose: true,
                duration: 1500,
                message: '文件上传失败:未知错误',
                type: 'warning',
              })
            }
          })
          .catch(err=>{
            this.$message({
              showClose: true,
              duration: 1500,
              message: '文件上传失败:系统错误,\n'+err,
              type: 'warning',
            })
          })
    }
  },
}
</script>
<style scoped src="../../assets/css/commonCss/containerCss.css"/>
<style scoped src="../../assets/css/functionCss/synchronizeFilesCss.css">

</style>
