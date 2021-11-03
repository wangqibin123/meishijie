<template>
    <div>
        <div class="shopping" 
            v-for="item in cartList" 
            :key="item._id"
            :class="{'active':item.select}"
            >
            <div class="shopping-left">
                <img class="img" :src="item.product_pic_url">
            </div>
            <div class="shopping-right">
                <div class="content">
                    <div class="title">{{item.title}}</div>
                    <div class="name">{{item.name}}</div>
                    <div  class="xuanzhong" @click="SET_SELECT(item.title)">
                        <button :class="{'act':item.select}">选中</button>
                    </div>
                </div>
                <div class="jisuan">
                    <div class="jisuan-warp">
                        <button class="btn" @click="add(item._id,'add')">+</button>
                        <span class="mount">{{item.mount}}</span>
                        <button class="btn"   @click="add(item._id,'jian')">-</button>
                    </div>
                </div>
                <div class="delete" @click="deletes(item.title)">
                    删除
                </div>
            </div>
        </div>
        <div class="floor">
            <div style="line-height:100px;">全选:</div>
            <div :class="{'act':t}" class="quan">
                <input type="checkbox" class="tot" v-model="t">
            </div>
            <button class="b" @click="SET_SELECT_ALL">删除选中</button>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['cartList','total']),
        t:{
            set(value){
                this.SET_TOTAL(value)
            },
            get(){
                if(this.cartList.length!=0){
                    const aaa=this.cartList.every(item=>item.select)
                    return aaa
                }
            }
        }
    },
    created(){
        this.$store.dispatch('getCar')
    },
    methods:{
        ...mapMutations(['SET_SELECT','SET_SELECT_ALL','SET_TOTAL']),
        add(_id,_add){
            this.$store.dispatch('setCarList',{
                _id:_id,
                _add
            })
        },
        deletes(title){
            this.$store.dispatch('deletes',{
                title:title,
            })
        }
    }
}
</script>

<style lang="stylus">
.shopping
    width: 100%
    height: 200px
    background: #fff
    display: flex
    margin: 10px 0 0 0
.shopping-left
    width: 200px
    height: 200px
    .img 
        width: 100%
        height: 100%
.shopping-right
    display: flex
    flex: 1
    box-sizing: border-box
.content
    width: 300px
    height: 200px
.title 
    font-size: 36px
    padding: 30px 0 0 50px
.name 
    font-size: 25px
    padding: 30px 0 0 50px
.xuanzhong
    padding: 10px 0 0 50px
.jisuan
    width: 300px
    height: 200px
.jisuan-warp
    padding: 50px 0 0 0
    display: flex
    justify-content: space-between
.btn
    width: 100px
    height: 100px
    font-size: 50px 
.mount
    text-align: center
    flex: 1
    font-size: 50px
    line-height: 100px
.delete
    font-size: 50px
    white-space: nowrap
    line-height: 200px
    padding: 0 0 0 30px
.floor
    background: #fff
    width: 100%
    height: 100px
    display: flex
    margin: 30px 0 0 0
.act
    background: yellow
.active
    background: pink
.quan
    width: 100px
    height: 100px
    border: 4px solid pink
    border-radius: 50%
.b
    width: 100px
    height: 100px
.tot
    opacity:0
    width: 100%
    height: 100%
</style>

