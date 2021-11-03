<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-if="isloading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Waterfall',
  data(){
    return {
        isloading:false
    }
  },
  mounted(){
     this.scrollHanle = this.scroll.bind(this)  
     window.addEventListener('scroll',this.scrollHanle)
  },
  destroyed() {
    window.removeEventListener("scroll",this.scrollHanle)
  },
  methods:{
    scroll(){  
      if(this.isloading) return;
      if(this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight){
          this.isloading = true
          this.$emit("view")
      }
    }
  }
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>