import axios from 'axios'
import {getToken} from './auth'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1'
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 建议通过定义插件的配置来扩展vue本身
// 1.定义一个插件对象
const httpPlugin = {}

// 2.为插件对象添加一个成员：install
//    install 是一个函数
//    该函数接收两个参数： vue options
httpPlugin.install = function (Vue, options) {
// 3. 添加实例方法
  Vue.prototype.$http = http
}

// 4. 导出插件对象
export default httpPlugin

// 5.在入口文件模块main.js加载使插件生效
// Vue.use(httpPlugin)
