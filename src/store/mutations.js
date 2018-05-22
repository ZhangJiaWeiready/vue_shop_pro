/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RESET_CARTFOODS,
  SEARCH_GOODS

} from "./mutation-type";

export default {
  [RECEIVE_ADDRESS] (state, {address}){
    console.log(state)
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state,{userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_INFO] (state){
    state.userInfo= {}
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state,{food}) {
    if (!food.count) {
     // food.cound= 1 //点击的时候就要给他一个初始化的值
      //因为 count属性本来没有 直接添加的话，不会有数据绑定的
      // 对象 属性 属性值
      Vue.set(food, 'count',1)
      // 将改变的food添加到 cartFood数组中去 然后购物车去获取
      state.cartFoods.push(food)
    }else {

      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
    // 当它有值的时候才会减。没用值的时候不会减
    if (food.count){
      food.count--
      if(food.count === 0) {
        // 增删改
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [RESET_CARTFOODS] (state,) {
    // 先清除food中的count
    state.cartFoods.forEach(food => {
      return food.count = 0
    })
    // 如果只是单纯的 清空它 food的count还会存在
    state.cartFoods=[]
  },
  [SEARCH_GOODS] (state,{searchShops}) {
    state.searchShops = searchShops
  }

}
