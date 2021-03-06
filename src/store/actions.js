/*
间接更新state的对象
 */
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
import {
  reqAddress,
  reqFoodaCategory,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSeaerchShop
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
      // console.log(categorys) //已经获取信息
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
  },
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USERINFO,{userInfo})
  },
  async getUserInfo ({commit}) {
    //发送ajax请求
      const result= await reqUserInfo()
    if (result.code === 0) {
        const userInfo = result.data
      commit(RECEIVE_USERINFO,{userInfo})
    }
  },
  async logOut ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_INFO)
    }
  },
  async getShopGoods ( {commit}, callBack) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit( RECEIVE_GOODS,{goods})
      // 数据更新了就通知一下组件
      callBack && callBack()
    }
  },


  async getShopInfo ( {commit}) {
    const result = await reqShopInfo()

    if (result.code === 0) {
      console.log(111+ result.data)
      const info = result.data
      commit( RECEIVE_INFO, {info})
    }
  },


  async getRatings ( {commit} , callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit( RECEIVE_RATINGS,{ratings})
    }
    callback&&callback()
  },
  // 改变 food的数量
  updateFoodCount ({commit}, {isAdd,food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  resetCartFoods ({commit}) {
    commit(RESET_CARTFOODS)
  },

  // 得到搜索的结果
  async getSearchShops ({commit,state}, {keyword}) {
    const {latitude,longitude} = state
    const geohash = latitude + ',' + longitude

    const result = await reqSeaerchShop({keyword,geohash})
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_GOODS,{searchShops})
    }
  }
}
