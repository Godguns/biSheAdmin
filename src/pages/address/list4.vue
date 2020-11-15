<template>
    <div class="home">
        <br>
        <!-- 按钮 -->
        <el-button type="success" style="margin-bottom:20px;" @click="toAddHandler">添加常见问题</el-button>
       <div class="content">
            <el-row>
  <el-col :span="8" v-for="(o, index) in projectlist" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card class="card" :body-style="{ padding: '0px' }">
      <img :src="o.imgsrc" class="image">
      <div style="padding: 14px;">
        <span>{{o.content}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
       </div>
       
         <el-dialog :title="title" :visible.sync="visible" width="60%" >
         <el-form  label-width="80px">
           
        
            <el-form-item label="日志名称">
                <el-input  v-model="name"></el-input>
            </el-form-item >
           <el-form-item label="日志内容">
                <el-input  v-model="danwei"></el-input>
            </el-form-item >
            <el-form-item label="日志配图">
 
                               <el-upload
                               :on-exceed="toast"
                               :limit="1"
                               :multiple="no"
                                class="avatar-uploader"
                                action="http://upload-z2.qiniup.com"
                                    :on-remove="remove"
                                    :on-success="handleAvatarSuccess"
                                    :data="{token: token}">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
            </el-form-item >
        <el-form-item label="状态">
                <el-input  v-model="zt"></el-input>
            </el-form-item >
        </el-form>
         <span slot="footer" class="dialog-footer">
         <el-button @click="visible = false">取 消</el-button>
         <!-- @click=onclick -->
         <el-button type="primary" @click="submit">确 定</el-button>
         </span>
        </el-dialog>
        <!-- /模态框 -->
    </div>
</template>
<style  scoped>

.home{
    margin-left: 20px;
}
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .card{
      width: 250px;
     
  }
</style>

<script>
import request from '@/utils/request'
export default {
    data(){
        return {
             currentDate: new Date(),
            projectlist:[],
            visible:false,
            name:"",
            danwei:"",
            xmzt:"",
            zt:"",
            token:'',
            imageUrl:''
        }
    },
    created(){
        this.gettoken()
        this.getdata()
    },
    methods:{
         handleAvatarSuccess(res, file) {
        this.imageUrl = 'http://dongdove.cn/'+res.hash;
      },
        toAddHandler(){
            this.visible=true
        },
        submit(){
            request({
                url:'/addnote',
                method:'get',
                params:{
                   imgsrc:this.imageUrl,
                   username:sessionStorage.getItem('username'),
                   avater:sessionStorage.getItem('avater'),
                   content:this.danwei,
                   time:new Date().getUTCMonth()

                }
            }).then(response=>{
                    this.getdata();
                    this.projectlist=response.data
                    this.visible=false
                    this.getdata()
            })
        },
        getdata(){
            request({
                url:'/getnote',
                method:'get',
            }).then(response=>{
                this.projectlist=response.data;
                console.log(response.data)
            })
        },
        gettoken(){
                    request({
                url:'/api/v1/file/token',
                method:'get',
  
            }).then(response=>{
                   //console.log(response.data)
                  this.token=response.token
            })
        }
    }
}
</script>