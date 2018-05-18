/*
间接更新state的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "./mutation-type";
import {
  reqAddress,
  reqFoodaCategory,
  reqShops
} from "../api";

export default {

  // store下的暴露了好几个对象  对象中有 commit，state
  async getAddress ({commit, state}) {
    // 发送异步请求

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)

    // 提交mutation
    if (result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },
  async getFoodCategory ({commit}){
    //发送异步请求
    const result = await reqFoodaCategory()
    //提交mutation
    if (result.code === 0){
      const categorys = result.data
      console.log(categorys) //已经获取信息
      commit(RECEIVE_CATEGORYS, {categorys})
    }

  },
  async getShops ({commit, state}) {
    const {latitude,longitude} = state
    const result = await reqShops({latitude,longitude})
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}
