// 引入Vue
import Vue from 'vue'
// 1. 导入 Vue 和 Vuex
import Vuex from 'vuex'
// 导入
import moduleCart from '@/store/cart.js'
// 导入
import moduleUser from '@/store/user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
	  'm_cart':moduleCart,
	  'm_user':moduleUser
  },
})

// 4. 向外共享 Store 的实例对象
export default store