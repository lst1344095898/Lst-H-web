<template>
  <div id="synchronizeFiles_main">
    <el-container class="synchronizeFiles_div">
      <el-header>Header</el-header>
      <el-main>
        <div class="my_file_div">
          <el-table
              :data="fileDataList"
              border
              style="width: 100%;align-content: center"
              max-height="600px"
          >
            <el-table-column
                prop="uploadTime"
                label="上传时间"
                width="170">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名"
                width="200">
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
                width="170"
                >
            </el-table-column>
            <el-table-column
                prop="uploadNumber"
                label="提交次数"
                width="80">
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
                    @click.native.prevent="synchronizeFileChange(scope)"
                    type="text"
                    size="small">
                  同步文件
                </el-button>
                <el-input style="display: none" id="synchronizeFile_input" type="file" @input="synchronizeFile()"/>
                <el-button
                    @click.native.prevent="fileDownload(scope.row)"
                    type="text"
                    size="small">
                  下载文件
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page_div">
          <el-pagination
              background
              @current-change="currentChange"
              :page-size=pageInfo.pageSize
              layout="prev, pager, next"
              :total="pageInfo.totalRecords">
          </el-pagination>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

  </div>
</template>

<script>
import UserUtils from "../../utils/UserUtils";
import httpAxios from "../../axios/HttpAxios";
import HttpAxios from "../../axios/HttpAxios";
export default {
  name: "synchronizeFiles",
  data(){
    return{
      fileDataList:[
          {
            uploadTime:'2021-6-6',
            fileName:'模拟文件',
            fileSize:'1.2MB',
            fileType:'zip',
            synchronizeTime:'2021-6-7',
            uploadNumber:'1'
          }
      ],
      pageInfo:{
        pageSize:10,
        pageNo:1,
        totalRecords:1,
        totalPages:1
      },
      synchronizeFileId:0
    }
  },
  created() {
   //得到文件目录
    this.queryFileDataList();
  }
  ,
  methods:{
    /**
     * 得到文件列表
     */
    queryFileDataList(){
      let formData={
        pageNo:this.pageInfo.pageNo,
        pageSize:this.pageInfo.pageSize
      }
      httpAxios.get("file/query/fileDataList",formData)
          .then(res=> {
            if (res.code===200){
              this.fileDataList=res.data.data;
              // this.pageInfo.totalPages=res.data.totalPages;
            }else{
              alert(res.message)
            }
          })
          .catch(err=>{
            console.log(err);
           })
    },
    /**
     * 删除文件
     */
    deleteFile(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param ={
              fileId:data.row.fileId
        }
        console.log(param)
        HttpAxios.get("file/deleteById",param)
            .then(res=>{
              console.log(res)
              if (res.code===200){
                this.fileDataList.splice(data.$index,data.$index+1);
                alert("删除成功")
              }else{
                alert("删除失败:"+res.message)
              }
            })
            .catch(err=>{
              console.error(err)
            })
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
    synchronizeFileChange(scope){
      console.log(scope)
      this.synchronizeFileId=scope.row.fileId;
      let fileInput=document.getElementById('synchronizeFile_input');
      fileInput.click();
    },
    /**
     * 同步文件
     */
    synchronizeFile(){
      let file = document.getElementById('synchronizeFile_input').files[0];
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
      formData.append("fileId",this.synchronizeFileId);
      HttpAxios.postFile("/file/synchronizeFiles",formData)
          .then(res=>{
            if (res.code===200){
              this.queryFileDataList();
              alert("更新成功")
            }else{
              alert("更新失败:"+res.message);
            }
          })
          .catch(err=>{
            console.error(err);
          })
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
              'userString': encodeURIComponent(JSON.stringify(UserUtils.getUser()))
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
    },
    /**
     * 下载文件
     */
    fileDownload(fileInfo){
      HttpAxios.getFile("/file/download?fileId="+fileInfo.fileId)
          .then(res =>{
              console.log(res)
              const blob=new Blob([res]);
              const fileName = fileInfo.fileName
              if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
              } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
              }
          })
          .catch(err=>{
            console.error(err)
          })
    },
    /**
     * 触发当前页
     */
    currentChange(val){
      this.pageInfo.pageNo=val;
      this.queryFileDataList();
    }
  },
}
</script>
<style scoped src="../../assets/css/commonCss/containerCss.css"/>
<style scoped src="../../assets/css/functionCss/synchronizeFilesCss.css">

</style>
