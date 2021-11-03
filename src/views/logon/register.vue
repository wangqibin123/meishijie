<template>
  <div class="login-section">
    <!-- :rules="rules" -->
    <el-form 
      label-position="top" 
      label-width="100px" 
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {register} from '@/service/api';
export default {
  data() {
    return {
      ruleForm:{
        name:'',
        password:''
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
      }
    };
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(async(valid) => {
          if (valid) {
            await register({name:this.ruleForm.name,password:this.ruleForm.password}).then((data)=>{
              console.log(data);
              if(data.code==0){
                localStorage.setItem('token',data.data.token)
                this.$router.go(-1)
              }else{
                alert(data.mes)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
