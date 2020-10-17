<template>
  <div class="dashboard-container">
    
    <el-button type="success" size="small" style="margin-bottom:20px;" @click="dialogTableVisible = true">添加已有用户</el-button> 
          <el-table
    :data="usermsgs"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="avater"
      label="头像"
      width="180">
       <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.avater" alt="" style="border-radius:50%; width: 40px;height: 40px;">
              <img slot="reference" fit="contain" :src="scope.row.avater" style="border-radius:50%; width: 50px;height: 50px">
            </el-popover>
        </template>
    </el-table-column>
     <el-table-column
      prop="avater"
      label="角色"
      width="180">
       <template slot-scope="scope">
         <template>
          <el-select v-model="value" placeholder="用户">
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
       <el-table-column
      prop="avater"
      label="状态"
      width="180">
      
        <template slot-scope="scope">
         <template>
           <h6 style="color:green;">可用</h6>
        </template>
            
        </template>
    </el-table-column>
    <el-table-column
      prop="_id"
      label="联系方式">
    </el-table-column>
     <el-table-column
      prop="tags"
      label="爱好">
    </el-table-column>
   <el-table-column label="操作" style=" justify-content: center; display:flex;">
     
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
   </el-table-column>
  </el-table>
  <el-dialog title="添加用户" :visible.sync="dialogTableVisible">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="用户名">
    <el-input v-model="username"></el-input>
  </el-form-item>
  <el-form-item label="头像">
    <el-input v-model="avater"></el-input>
  </el-form-item>
  <el-form-item label="角色">
    <el-input v-model="js"></el-input>
  </el-form-item>
   <el-form-item label="爱好">
    <el-input v-model="tags"></el-input>
  </el-form-item>
  
   <el-form-item label="">
    <el-button type="success" @click="adduser" round>添加</el-button>
  <el-button type="info" round>取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
export default {
  name: 'Dashboard',
  data(){
    return {
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
      options: [{
          value: '选项1',
          label: '用户'
        }, {
          value: '选项2',
          label: '管理员'
        }],
      usermsgs:[],

    }
  },
  mounted(){
    this.getusermsgs()
  },
  methods:{
    adduser(){
      request({
        url:'/addusers',
        meethod:'get'
      }).then(response=>{

      })
    },
    getusermsgs(){
         request({
        url: '/getusers',
        method: 'get',

  }).then(response=>{
    this.usermsgs=response.data
    console.log(this.usermsgs)
  })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
   
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
