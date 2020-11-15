<template>
  <div class="dashboard-container">
    
   
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
      prop="_id"
      label="编号">
    </el-table-column>
     <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
         <el-table-column
      prop="time"
      label="时间">
    </el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row._id)">删除</a>
         
        </template>
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
   <el-form-item label="内容">
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
      toDeleteHandler(e){
                 request({
        url: '/deltc',
        method: 'get',
        params:{
            _id:e
        }

  }).then(response=>{
    console.log(response)
    this.getusermsgs()
     this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        });
    
  })

      },
    adduser(){
      request({
        url:'/addusers',
        meethod:'get'
      }).then(response=>{

      })
    },
    getusermsgs(){
         request({
        url: '/api/v1/spit',
        method: 'get',

  }).then(response=>{
    this.usermsgs=response.data
    console.log(response.data)
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
