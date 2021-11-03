import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import { userInfo } from "@/service/api";

import Store from "@/store";


import Home from '@/views/home/Home.vue'

const a=[
    {
        path:'/car',
        name:"car",
        component:()=> import ('@/views/car/car.vue')
    },
	{
		path: "/recipe",
		name: "recipe",
		component: () => import("@/views/recipe/recipe.vue"),
	},
    {
        path:'/detail',
        name:"detail",
        component:()=> import ('@/views/detail/detail.vue')
    },
    {
        path:'/login',
        name:"login",
        component:()=> import ('@/views/user-login/index.vue'),
        meta:{
            login:true
        }
    },
    {
        path:'/create',
        name:"create",
        component:()=> import ('@/views/create/create.vue')
    },
    {
        path:'/edit',
        name:"edit",
        component:()=> import ('@/views/user-space/edit.vue')
    },
    {
        path:'/space',
        name:"space",
        component:()=> import ('@/views/user-space/space.vue'),
        redirect:'/space/works',
        children:[
            {
                path:'works',
                name:'works',
                title:'作品',
                component:()=> import ('@/views/user-space/menu-list.vue'),
                meta:{
                    login:true
                }
            },
            {
                path:'fans',
                name:'fans',
                title:'我的粉丝',
                component:()=> import ('@/views/user-space/fans.vue'),
                meta:{
                    login:true
                }
            },
            {
                path:'following',
                name:'following',
                title:'关注',
                component:()=> import ('@/views/user-space/fans.vue'),
                meta:{
                    login:true
                }
            },
            {
                path:'collection',
                name:'collection',
                title:'收藏',
                component:()=> import ('@/views/user-space/menu-list.vue'),
                meta:{
                    login:true
                }
            }
        ],
    },
]

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
		},
		...a,
	],
});

router.beforeEach(async (to, from, next) => {
	const token = localStorage.getItem("token")||"";
	const isLogin = !!token;
	const data = await userInfo();
	Store.commit("changeUserInfo", data.data);
	if (to.matched.some((item) => item.meta.login)) {
		if (isLogin) {
			if (data.error === 400) {
				next({ name: "login" });
				localStorage.removeItem("token");
				return;
			}
			if (to.name === "login") {
				next({ name: "home" });
			} else {
				next();
			}
			return;
		}
		if (!isLogin && to.name === "login") {
			next();
		}
		if (!isLogin && to.name !== "login") {
			next({ name: "login" });
		}
	} else {
		next();
	}
});

export default router;
