<template>
    <div class="home">
        <br>
        <!-- 按钮 -->
        <el-button type="success" style="margin-bottom:20px;" @click="toAddHandler">添加常见问题</el-button>
       <div class="content">
            <el-row>
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="http://dongdove.cn/FkshNy9z9L7o9lpHWKcpnY7kU3eE" class="image">
      <div style="padding: 14px;">
        <span>开发者日志{{index+1}}</span>
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
           
        
            <el-form-item label="项目名称">
                <el-input  v-model="name"></el-input>
            </el-form-item >
           <el-form-item label="承办单位">
                <el-input  v-model="danwei"></el-input>
            </el-form-item >
            <el-form-item label="项目状态">
                <el-input  v-model="xmzt"></el-input>
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
            zt:""
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        toAddHandler(){
            this.visible=true
        },
        submit(){
            request({
                url:'/add_project',
                method:'get',
                params:{
                    name:this.name,
                    content:this.danwei,
                    xmstatus:this.xmzt,
                    status:this.zt

                }
            }).then(response=>{
                    this.getdata();
                    this.projectlist=response.data
                    this.visible=false
            })
        },
        getdata(){
            request({
                url:'/getproject',
                method:'get',
            }).then(response=>{
                this.projectlist=response.data;
                console.log(response.data)
            })
        }
    }
}
</script>