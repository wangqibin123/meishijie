<template>
    <div class="recipe">
        <!-- v-model="activeName" -->
        <!-- 菜谱分类 start -->
        <el-tabs type="border-card" v-model='classifyName' @tab-click='tabClick'>
            <el-tab-pane
                v-for='item in classify'
                :key='item.parent_type'
                :label="item.parent_name"
                :name='item.parent_type'
            >
                <div class="recipe-link">
                    <router-link
                            :to="{query:{...$route.query,classify:option.type}}"
                            v-for='option in item.list'
                            :key='option.type'
                            :class='{active:classifyType === option.type}'
                        >
                        {{option.name}}
                    </router-link>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 菜谱分类 end -->
        <h2>家常好味道，给你家一般的温暖</h2>
        <el-container>
            <el-aside width="220px" class="recipe-aside">
                <div class="filter-box">
                    <h4>筛选</h4>
                    <!-- v-model="activeName" -->
                    <!-- 筛选 start -->
                    <el-collapse v-model='propertyActiveName'>
                        <el-collapse-item
                                v-for='item in properties'
                                :title="item.parent_name"
                                :key='item.parent_type'
                                :name='item.parent_type'
                        >
                            <div class="filter-tags"
                            >
                                <el-tag type="info"
                                    v-for='option in item.list'
                                    :key='option.type'
                                    @click='selectTag(option)'
                                    :class='{"tag-selected":propertyType[option.title] == option.type}'
                                >{{option.name}}</el-tag>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <!-- 筛选 end -->
                </div>
            </el-aside>
            <el-main class="filter-menus-box" >
                <div class="menu-empty"
                    v-show='!list.length && !loading'
                >暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>
                <menu-card style="min-height: 75%;" :info="list" v-show='!loading'></menu-card>
                <div style="text-align: right;" v-show='!loading'>
                    <el-pagination
                            style="display: inline-block;"
                            :page-size="5"
                            layout="total, prev, pager, next"
                            :total="total"
                            :current-page.sync='page'
                            @current-change='handlerSelect'
                            :hide-on-single-page="true"
                            >
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import MenuCard from '@/components/menu-card.vue'
    import {getClassify, getProperty, getMenus} from '@/service/api';

    export default {
        components: {MenuCard},
        data() {
            return {
                classify:[],// 存储tab切换的所有数据
                classifyType:'1-1', //tab切换的选中项(二级路由)
                classifyName:'1',//定义刷新tab时的值(一级路由)
                properties:[], //属性   存储属性中的所有数据
                propertyType:{}, //存储属性的分类  ,  列如: {carft: 1-4,flavor=2-1}
                propertyActiveName:[],   //
                //存储右侧主体
                list:[],
                total:0,
                loading:false,
                page:1
            }
        },
        watch: {
            $route: {
                handler(){
                    const {classify,page} = this.$route.query;
                    if(classify){
                        this.classifyType = classify;
                        this.classifyName = classify[0];
                        this.page = Number(page);
                    }
                    this.ThisgeMenus();
                },
                immediate:true
            }
        },
        mounted() {
            getClassify().then((data)=>{
                console.log(data.data);
                this.classify = data.data;
                console.log(this.$route.query);
                if(!this.$route.query.classify){
                    this.classifyType = this.classify[0].list[0].type;
                    this.classifyName = this.classify[0].parent_type;
                    this.$router.push({
                        query:{
                            classify:this.classifyType,
                            page:1
                        }
                    })
                }
            })
            getProperty().then((data)=>{
                console.log(data.data);
                this.properties = data.data;
                const {query} = this.$route;
                this.propertyType = this.properties.reduce((o,item)=>{
                    //item.title : 工艺  难度  口味 人数
                    // console.log(query);
                    // console.log(o);
                    o[item.title] = query[item.title] ? query[item.title] : "";
                    if(o[item.title]){
                        this.propertyActiveName.push(o[item.title][0])
                    }
                    return o;
                },{})
            })
        },
        methods: {
            selectTag(option){
                console.log(option);
                console.log(option.title);
                let query = {...this.$route.query};
                //判断是否点击,如果点击过取消,否则选中
                if(this.propertyType[option.title] == option.type){
                    this.propertyType[option.title] = '';
                    delete query[option.title];
                }else{
                    this.propertyType[option.title] = option.type;
                    query[option.title] = option.type;
                }
                this.$router.push({
                    query
                })
            },
            ThisgeMenus(){
                const query = {...this.$route.query};
                console.log(query);
                const params = {
                    page:query.page || 1,
                    classify:query.classify
                }
                delete query.page
                delete query.classify
                if(Object.keys(query).length){
                    params.property = {
                        ...query
                    }
                }
                this.loading =true;
                let loading = null;
                this.$nextTick(()=>{
                    loading = this.$loading({
                        target:'.filter-menus-box',
                        text:'Loading...',
                        spinner:'el-icon-loading',
                        background:'rgba(0,0,0,0.7)'
                    })
                })
                getMenus(params).then((data)=>{
                    if(this.loading){
                        loading.close();
                        this.loading = false;
                    }
                    console.log(data.data);
                    this.list = data.data.list;
                    this.total = data.data.total;
                    this.page = data.data.current_page
                })
            },
            handlerSelect(){
                this.$router.push({
                    query:{
                        ...this.$route.query,
                        page:this.page
                    }
                })
            },
            tabClick(){
                const classifyName = this.classifyName;
                const item = this.classify.find(item =>item.parent_type == classifyName);
                console.log(item);
                if(item){
                    this.classifyName = item.parent_type;
                    this.classifyType = item.list[0].type;
                    this.$router.push({
                        query:{
                            ...this.$route.query,
                            classify:this.classifyType
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="stylus">
    .recipe-link
        font-size 0;
        margin-top 5px

        a
            display inline-block
            font-size 12px
            padding 0px 8px
            height 28px
            line-height 28px

        .active
            background #ff3232
            color #fff

    .recipe
        h2
            text-align center
            line-height 150px

        .el-main
            padding 0

        .filter-box
            background #fff
            padding 10px
            width 100%
            float left
            box-sizing border-box

    .filter-tags
        display flex
        flex-wrap wrap
        justify-content space-around

        .tag-selected
            background-color #ff3232
            color #fff

    .menu-empty
        width 100%
        text-align center
        font-size 20px
</style>

