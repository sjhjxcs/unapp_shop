export default {
	// 开启命名空间
	namespaced:true,
	state:()=>({
		address:{},
		// 登录成功之后的token字符串
		token:uni.getStorageSync('token') || '',
		// 用户的基本信息
		userinfo:JSON.stringify(uni.getStorageSync('userinfo')||'{}'),
		
		// 重定向的object对象{openType,from}
		redirectInfo:null
	}),
	
	// 方法
	mutations:{
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			// 通过调用this.commit（）方法，调用m_user模块下的saveAddressToStorage方法将address对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 本地存储持久化，将address持久化存储到本地mutations方法
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		// 更新用户的基本信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			// 通过this.commit方法，将修改后的数据持久化存储
			this.commit('m_user/saveUserInfoStorage')
		},
		// 对用户信息持久化保存起来
		saveUserInfoStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 更新token
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		// 将token本地存储持久化
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		
		// 更新重定向的信息对象
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		},
		
	},
	
	// 计算属性
	getters:{
		addstr(state) {
			if (!state.address.provinceName) return ''
		
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}

