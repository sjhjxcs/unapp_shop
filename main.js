
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 引入store的实例对象
import store from './store/store.js'

// 引入第三方包发起网络请求
import {$http} from  "@escook/request-miniprogram"
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 在请求开始之前做点事情
$http.beforeRequest = function(options){
	uni.showLoading({
		title:"数据正在加载中。。。"
	})
	console.log(store)
	// 判断当前请求的是否为有权限接口
	if(options.url.indexOf('/my')!==-1){
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从vuex中进行获取
			Authorization:store.state.m_user.token
		}
	}
}

// 请求完成之后做一些事情
$http.afterRequest = function(options){
	uni.hideLoading()
}
// 封装一个自定义的方法，解决弹框问题
uni.$showMsg = function(title = "数据请求失败",duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	  // 2. 将 store 挂载到 Vue 实例上
	  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif