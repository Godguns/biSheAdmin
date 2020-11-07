<template>
  <div class="dashboard-container">
    
    <el-button type="success" size="small" style="margin-bottom:20px;" @click="dialogTableVisible = true">添加轮播图</el-button> 
          <el-table
    :data="categorys"
    border
    style="width: 100%">
    <el-table-column
      prop="info"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="banner"
      label="预览"
      width="180">
       <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.banner" alt="" style=" width: 40px;height: 40px;">
              <img slot="reference" fit="contain" :src="scope.row.banner" style=" width: 50px;height: 50px">
            </el-popover>
        </template>
    </el-table-column>
     <!-- <el-table-column
      prop="time"
      label="时间"
      width="180">
      
    </el-table-column> -->
       <el-table-column
      prop="avater"
      label="操作"
      width="180">
      
         <template slot-scope="scope">
         <template>
          <el-select v-model="value" placeholder="请选择+">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
            
        </template>
    </el-table-column>
   
  
     
     <el-table-column label="操作">
                <!-- v-slot用于获取当前行数据 -->
                <template v-slot="slot">
                    <a href="" @click.prevent="del(slot.row._id)">删除</a>
                   
                </template>
            </el-table-column>

  </el-table>
   <el-dialog title="添加轮播图" :visible.sync="dialogTableVisible">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="简介">
    <el-input v-model="info"></el-input>
  </el-form-item>
 <el-form-item>
   <el-upload
                list-type="picture"
                :on-success="handleAvatarSuccess2"
                class="upload-demo"
                action="http://upload-z2.qiniup.com"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                  :data="{token: token}"
                :limit="10"
                :on-exceed="handleExceed"
               >
                <el-button size="small" type="primary">点击上传</el-button>
               
                </el-upload>
 </el-form-item>
  
   <el-form-item label="">
    <el-button type="success" @click="submitHandler" round>添加</el-button>
  <el-button type="info" round>取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
  </div>
</template>

<script>
//暴露接口
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    beforeMount(){
        this.getablum()
         request({
            url:'/api/v1/file/token',
            method:'get',

        }).then(response=>{
            this.token=response.token
        })
       // this.submitHandler()
    },
    // 存放网页中需要调用的方法
    methods:{
      del(e){
            request({
               url:'/del_banner',
               params:{
                   _id:e
               },
               method:'get'
           }).then(response=>{
                 this.$message({
                message: '删除成功',
                type: 'success'
                 });
                 this.getablum()
           })
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file){
         // this.master_img='http://dongdove.cn/'+res.hash;
          //var imgitem='http://dongdove.cn/'+res.hash;
          //this.Album_imgs.push(imgitem)

            console.log(res)
      },
        handleAvatarSuccess2(res, file){
          //this.master_img='http://dongdove.cn/'+res.hash;
           this.imgitem='http://dongdove.cn/'+res.hash;
          
          //this.Album_imgs.push(imgitem)

           
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
        beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
     
        submitHandler(){
         var url='/add_banner'
            request({
          url,
          method:"get",
          params:{
                   banner:this.imgitem,
                   info:this.info
          },
          //为了告诉后台我的请求体中放的是查询字符串
        //   headers:{
        //       "Content-Type":"application/x-www-form-urlencoded"
        //   },
          //将this.form转换为查询字符串发送给后台
        
          }).then(response=>{
              this.$message({
                  type:"success",
                  message:"添加成功"
              })
              this.visible=false;
              this.dialogTableVisible=false;
              this.getablum()
          })
            //将form变为初始
        },
        /*布尔值格式化：cellValue为后台返回的值
*/
            formatBoolean: function (row, column, cellValue) {
                var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
            },
       
        toUpdateHandler(row){
            this.title="修改栏目信息";
            this.form=row;
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
       toAddHandler(){
           this.form={
               type:"category"
           }
           this.visible=true;
          
           
       },
       getablum(){
            let url="/get_banner";
          request({
          url,
          method:"get",
          //为了告诉后台我的请求体中放的是查询字符串
        //   headers:{
        //       "Content-Type":"application/x-www-form-urlencoded"
        //   },
          //将this.form转换为查询字符串发送给后台
         
          }).then((response)=>{
              //请求结束
             
              this.categorys=response.data;
              console.log(response.data)
              //提示消息
             // this.loadData();
              
              
          })
       }
    },
    //用于存放要在网页中存放的数据
    data(){
        return {  
            info:'',
            token:'',  
        imgitem:'',
       username:'',
      avater:'',
      js:'用户',
      tags:[],

       labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
       dialogTableVisible: false,
        dialogFormVisible: false,
                    token:"",
                    username:"",
                    title:"录入栏目信息",
                    visible:false,
                    categorys:[],
                    form:{
                        type:"category"
                    }
        }
    },
    created(){
    //     request({
    //         url:'/api/v1/file/token',
    //         method:'get',

    //     }).then(response=>{
    //         this.token=response.token
    //     })
    // this.getablum();
         
    },
}
</script>

<style scoped>
    .home{
        margin-left: 10px;
    }
        .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .dashboard-container{
      margin-left: 30px;
      margin-top: 20px;
  }
</style>