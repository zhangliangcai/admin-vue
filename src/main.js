// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'

// 引入我们的公共样式
import './assets/css/style.css'

Vue.use(ElementUI)

// 加载 httpPlugin 插件（封装自axios）
// 我们在该插件中为vue原型对象扩展了一个成员$http
// 然后我们就可以在任何组件通过使用this.$http来发起请求了
Vue.use(httpPlugin)

Vue.config.productionTip = false

// 我们可以为Vue.prototype添加一个插件
// 所有组件都是Vue的实列
// 所以说，所有组件this都可以访问Vue.prototype原型成员
// 给vue原型添加成员，最好给成员加$前缀
// 为什么？
// 因为一旦组件内部有一个同名的http就访问不到原型对象中的http了
// Vue.prototype.$http = axios
Vue.prototype.foo = 'bar'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
