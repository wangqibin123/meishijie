<template>
  <el-row class="menu-card" type="flex" justify="start">
    <el-col
      style="flex:none;" 
      v-for="item in info"
      :key="item._id"
      :style="{'margin-left':marginLeft+'px'}"
    >
      <el-card :body-style="{ padding: '0px' }">
        <router-link :to="{name:'detail',query:{'menuId':item._id}}">
          <img :src="item.product_pic_url" class="image" style="width: 232px;height: 232px;">
          <div style="padding: 14px;" class="menu-card-detail">
            <strong>{{item.title}}</strong>
            <span>{{item.comments_len}} 评论</span>
            <router-link :to="{path:'/space/works',query:{'userId':item.userId}}" tag="em">
              {{item.name}}
            </router-link>
          </div>
        </router-link>
        <button @click="add(item,'add')">+</button>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'menu-card',
  props:{
    marginLeft: {
      type: Number,
      default: 22
    },
    info:{
      type: Array,
      default:() => []
    }
  },
  methods:{
    add(item,_add){
      this.$store.dispatch('setCarList',{
        product_pic_url:item.product_pic_url,
        name:item.name,
        _id:item._id,
        title:item.title,
        _add
      })
      this.$router.push({
        name:'car'
      })
    }
  },
  created(){
    this.$store.dispatch('getCar')
  }
}
</script>

<style lang="stylus">
.menu-card 
  flex-wrap wrap
  .el-col-24
    width auto
    margin-bottom 20px
    margin-left: 22px
    
  .menu-card-detail
    > *
      display block
    strong 
      height 24px
      line-height 24px
      font-size 14px
      font-weight bold
      color #333
    span 
      height 26px
      line-height 26px
      font-size 12px
      color #999
    em 
      height 23px
      line-height 23px
      font-size 12px
      color #ff3232
</style>

