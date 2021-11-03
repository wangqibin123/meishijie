<template>
  <div class="home">
    <!-- 轮播 start -->
    <el-carousel :interval="5000" type="card" height="300px">
      <el-carousel-item 
        v-for="item in banner" 
        :key="item._id"
      >
        <!--/detail?menuId=5d83bfba2f7cb93a4009cf98-->
        <router-link :to="{name:'detail',query:{'menuId':item.menuId}}">
          <img 
            :src="item.product_pic_url"
            width="100%"
          >
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播 end -->
    <!-- 内容精选 瀑布流形式 start -->
    <div>
      <h2>内容精选</h2>
      <!-- :info='info' -->
      <waterfall ref="waterfall" @view='a'>
        <menu-card :margin-left="13" :info="menuList"></menu-card>
      </waterfall>
    </div>
    <!-- 内容精选 瀑布流形式 end -->
  </div>
</template>

<script>
import MenuCard from '@/components/menu-card.vue'
import Waterfall from '@/components/waterfall.vue'
import {getBanner,getMenus} from '@/service/api.js'
// 引入 注册 使用
export default {
  name: 'home',
  components: {
    MenuCard: MenuCard,
    Waterfall
  },
  data(){
    return {
      banner:[],
      menuList:[],
      page:1,
      // pages:5
    }
  },
  mounted(){
      getBanner().then(({data})=>{
        this.banner=data.list
      })
      getMenus({
        page:this.page
      }).then(({data})=>{
        this.menuList=data.list
      })
  },
  methods:{
    a(){
      this.page++;
      if(this.page > this.pages){
        this.$refs.waterfall.isloading = false;
        return;
      }
      console.log(this.$refs.waterfall.isloading)
      this.$refs.waterfall.isloading = true;
      getMenus({page:this.page}).then(({data})=>{
        this.menuList.push(...data.list);
        this.$refs.waterfall.isloading = false;
      })
    }
  }
}
</script>
<style lang="stylus">
.home 
  h2
    text-align center
    padding 20px 0;

  .el-carousel__item h3 
    color #475669
    font-size 14px
    opacity 0.75
    line-height 200px
    margin 0
  

  .el-carousel__item:nth-child(2n) 
    background-color #99a9bf
  

  .el-carousel__item:nth-child(2n+1) 
    background-color #d3dce6
  
</style>

