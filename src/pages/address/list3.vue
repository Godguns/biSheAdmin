<template>
    <div class="home">
        <br>
        <!-- 按钮 -->
        <el-button type="success" @click="toAddHandler">添加项目</el-button>
       
        
        <el-table :data="projectlist">
            <el-table-column prop="_id" label="编号"></el-table-column>
            <el-table-column prop="name" label="项目名称"></el-table-column>
  
           <el-table-column prop="content" label="项目承办单位">
           
              </el-table-column>
              <el-table-column
      prop="avater"
      label="状态"
      width="180">
      
        <template slot-scope="scope">
         <template>
           <h6 style="color:green;">推荐</h6>
        </template>
            
        </template>
    </el-table-column>
            <el-table-column prop="xmstatus" label="项目状态">
               
                <!-- <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row._id)">删除</a>
                   
                </template> -->
            </el-table-column>

        </el-table>
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
<style scoped>
.home{
    margin-left: 20px;
}
</style>
<script>
import request from '@/utils/request'
export default {
    data(){
        return {
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