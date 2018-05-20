/*
 包含n个请求接口的函数的模块

* */

import ajax from './ajax'

const Base_url = '/api'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${Base_url}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodaCategory = () => ajax(Base_url + '/index_category')
// 3、根据经纬度获取商铺列表  data接收的是一个对象
export const reqShops = ({latitude, longitude}) => ajax(Base_url + '/shops', {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSeaerchShop = ({latitude, longitude, key}) => ajax(Base_url + '/search_shops', {latitude, longitude, key})
// 5、获取一次性验证码

// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd,captcha}) => ajax(Base_url + 'login_pwd', {name, pwd,captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(Base_url + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = ({phone, code}) => ajax(Base_url + '/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(Base_url + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(Base_url + '/logout')

// 因为这是前台接口所以说不需要 考虑跨域的问题
// // 11 获取 食物列表
// export const reqShopGoods = () => ajax('/goods')
// // 12 获取用户评价
// export const reqUserRating = () => ajax('/ratings')
// // 13  获取商家信息
// export const reqShopInfo = () => ajax('/info')
//
// // export function reqAddress(location) {
// //     ajax(location)
// // }
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
