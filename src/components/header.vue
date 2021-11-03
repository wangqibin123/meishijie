<template>
  <el-header style="height: auto;">
    <div class="header">
      <div class="header_c">
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="6">
            <a href="" class="logo">
            </a>
          </el-col>
          <el-col :span="10" :offset="2"></el-col>
          <el-col :span="6" :offset="3" class="avatar-box" v-if="isLogin">
            <router-link :to="{path:'/space/works',query:{'userId':userInfo.userId}}">
              <el-avatar style="vertical-align: middle;" shape="square" size="medium" :src="userInfo.avatar"></el-avatar>
            </router-link>
            <router-link :to="{path:'/space/works',query:{'userId':userInfo.userId}}" class="user-name">{{userInfo.name}}</router-link>
            <router-link :to="{path:'/create'}" class="collection">发布菜谱</router-link>
            <a href="javascript:;" class="collection" @click="loginout">退出</a>
          </el-col>
          <el-col :span="6" :offset="3" class="avatar-box" v-if="!isLogin">
            <router-link :to="{name:'login',query:{'name':'login'}}" class="user-name">登录</router-link>
            <router-link :to="{name:'login',query:{'name':'second'}}" class="collection">注册</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="nav-box">
      <div class="nav_c">
        <Menus></Menus>
      </div>
    </div>
  </el-header>
</template>
<script>
import Menus from '@/components/menus'
import {login_out} from '@/service/api'
export default {
  name: 'headers',
  components: {Menus},
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    },
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  methods:{
    loginout(){
      const com=confirm('确认删除吗？')
      if(com){
        login_out().then((data)=>{
          localStorage.removeItem('token')
          history.go(0)
        })
      }
    }
  },
  mounted(){
    // console.log(this.userInfo,this.isLogin)
  }
}
</script>
<style lang="stylus">
.header 
  height 129px
  background-color #c90000
   
  .logo 
    display: block;
    height: 129px;
    width: 184px;
    background url(https://s1.c.meishij.net/n/images/logo2.png) -15px 9px no-repeat;

.header_c, .nav_c
  width 990px
  margin 0 auto 
.nav-box 
  height 60px
  background-color #fff;
  box-shadow 10px 0px 10px rgba(0,0,0,0.3)


.user-name
  margin-left 5px
  color #fff

.collection 
  margin-left 5px  
  color #fff

</style>


