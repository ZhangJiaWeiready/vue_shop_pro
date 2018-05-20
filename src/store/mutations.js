/*
直接更新state的多个方法的对象
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO

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
  }

}
