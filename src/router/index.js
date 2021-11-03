import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import {userInfo} from '@/service/api';

import  Store  from '@/store'


import Home from '@/views/home/Home.vue'
const a=[
    {
        path:'/car',
        name:"car",
        component:()=> import ('@/views/car/car.vue')
    },
    {
        path:'/detail',
        name:"detail",
        title:'详情',
        component:()=> import ('@/views/detail/detail.vue')
    },
    {
        path:'/login',
        name:"login",
        component:()=> import ('@/views/user-login/index.vue'),
        meta:{
            b:'true'
        }
    },
    {
        path:'/create',
        name:"create",
        component:()=> import ('@/views/create/create.vue'),
        meta:{
            b:'true'
        }
    }
]
const router = new Router({
    mode:"history",
    routes:[
        {
            path:'/',
            name:"Home",
            component:Home
        },
        ...a
    ]
});

router.beforeEach(async(to, from, next) => {
    const token =localStorage.getItem('token')||''
    const isLogin = !!token;
    const data= await userInfo();
    Store.commit('changeUserInfo',data.data);
    if(to.matched.some(item=>item.meta.login)){
         if(isLogin){
             if(data.error === 400){
                 next({name:'login'})
                 localStorage.removeItem('token')
                 return
             }
             if(to.name==='login'){
                 next({name:'home'})
             }else{
                 next();
             }
              return
         }
         if(!isLogin && to.name === 'login'){
             next();
         }
         if(!isLogin && to.name !== 'login'){
             next({name:'login'});
         }
    }else{
        next()
    }
 })

export default router;
