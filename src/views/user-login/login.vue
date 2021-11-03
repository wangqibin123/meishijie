<template>
  <div class="login-section">
    <!-- :rules="rules" -->
    <el-form
      label-position="top"
      label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="denglu">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login} from '@/service/api';

export default {
  data() {
    return {
      name:'',
      password:''
    };
  },
  methods: {
    denglu(){
      login({name:this.name,password:this.password}).then((data)=>{
        if(data.code===0){
          localStorage.setItem('token',data.data.token)
          window.location.href='/'
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
