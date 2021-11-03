import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    userInfo: {},
    cartList:[],
  },
  getters:{
    isLogin(state){
      return !!Object.keys(state.userInfo).length;
    }
  },
  mutations:{
    changeUserInfo(state,data){
      state.userInfo = data;
    },
    SET_CAR_LIST(state,data){
      const {product_pic_url,name,_id,title,_add}=data
      const index=state.cartList.findIndex(item=>item._id==_id)
      if(index==-1){
        state.cartList.push({
          product_pic_url,name,_id,title,
          mount:1,
          select:false
        })
      }else{
        const item=state.cartList[index]
        if(_add=='add'){
          item.mount+=1
        }else if(_add=='jian'){
          if(item.mount>1){
            item.mount-=1
          }else{
            alert('不能再减少了')
          }
        }
      }
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_CAR(state,data){
      const {cartList}=data
      state.cartList=cartList
    },
    DELETE(state,data){
      const {title}=data
      state.cartList=state.cartList.filter(item=>item.title!=title)
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_SELECT(state,title){
      const index=state.cartList.findIndex(item=>item.title==title)
      state.cartList[index].select=!state.cartList[index].select
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_SELECT_ALL(state){
      state.cartList=state.cartList.filter(item=>!item.select)
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_TOTAL(state,boo){
      state.cartList.map(item=>{
        item.select=boo
      })
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    }
  },
  actions:{
    setCarList({commit},data){
      commit('SET_CAR_LIST',data)
    },
    getCar({commit}){
      const cartList=JSON.parse(localStorage.getItem('cartList'))||[]
      commit('SET_CAR',{cartList})
    },
    deletes({commit},title){
      commit('DELETE',title)
    }
  }
})

export default store;