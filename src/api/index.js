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
export const reqShopLists = ({latitude, longitude, key}) => ajax(Base_url + '/search_shops', {latitude, longitude, key})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(Base_url + '/captcha')
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd}) => ajax(Base_url + 'login_pwd', {name, pwd}, 'POST')
// 7、发送短信验证码
export const reqMessagecode = ({phone}) => ajax(Base_url + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqPhoneLogin = ({phone, code}) => ajax(Base_url + '/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserinfo = () => ajax(Base_url + '/userinfo')
// 10、用户登出
export const reqLoginout = () => ajax(Base_url + '/logout')


// export function reqAddress(location) {
//     ajax(location)
// }
