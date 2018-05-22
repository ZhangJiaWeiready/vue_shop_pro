import Vue from 'vue'
// 格式化时间的两种格式 moment 体积大 / date-fns 轻量级
import format from 'date-fns/format'
// import moment from 'moment'


// 参数  过滤器的名称 -  ， 回调函数
  // 使用 -- 在main .js 中引入
  // 在需要格式化格式的地方使用
/*Vue.filter('date-format' , function (value, format = 'YYYY-MM-DD HH-mm-ss') {
  // 使用moment的方法 过滤 成的格式 是 format
  return moment(value).format(format)
})*/
Vue.filter('date-format',function (value, formatStr = 'YYYY-MM-DD HH-mm-ss') {
  return format(value, formatStr)
})
