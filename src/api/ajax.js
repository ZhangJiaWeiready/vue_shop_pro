/*
ajax 请求函数模块
*/
/*
  返回一个promise对象 异步返回的数据是：response.data ; 以前是response
 */
import axios from 'axios'
export default function ajax(url, data={}, type='GET') {
  return new Promise(function (resolve, reject) {
    //执行异步请求
    //判断请求类型
    // GET -- 将data数据拼接到url上
    // POST -- 直接使用
    let promise
    if (type === 'GET'){
      let dataStr = ''
      // 将对象中的 key生成一个数组,然后遍历拼接成请求参数 查询字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      // 如果拼接好的参数字符串存在的话  需要将最后一个&去掉
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise= axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    // ,response 是返回一个response数据
    promise.then(function (response) {
      // 成功了调用resolve
       resolve(response.data)

    }) .catch(function (error) {
      // 失败了调用reject
      reject(error)
    })



  })


}


/*
 以前的写法
  请求之后返回一个promise对象，然后返回出一个值

ajax(url)
  .then(reponse =>{
    const result = reponse.data
})
  const response = await ajax(url) -- 等执行完的时候返回
  result = response.data
  原先给的是response
  现在希望直接交个一个data
  解决 -- 外边包裹一层promise
  const result = await ajax(url)
  resolve / reject-- 是函数  函数接收函数成为高阶函数

*/
