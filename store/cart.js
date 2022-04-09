export default {
	// 为当前的模块开启命名空间
	namespaced: true,

	// // 这里区分一下箭头函数
	// x => {key: x} // 报错
	// x => ({key: x}) // 正确
	state: () => ({
		// 购物车的数组，用来存放购物车中的每个商品的信息对象
		// 每个商品的信息对象，都包含如下6个属性：
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
		// JSON.parse把字符串解析为数组
	
		
	}),
	// 模块的mutations方法
	mutations: {
		// 根据提交的商品id去购物车中去查找是否存在这件商品
		// 如果不存在，则findResult为undefined，否则，为查找到的商品信息对象
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 如果购物车中没有这件商品，则直接push，
			if (!findResult) {
				state.cart.push(goods)
			}
			// 如果购物车中有这件商品，则只更新数量即可。
			else {
				findResult.goods_count++
			}
			console.log("state.cart购物车中的数据是什么展示一下", state.cart)
			// 通过commit方法，调用m_cart命名空间下的saveToStorage方法
			this.commit('m_cart/saveToStorage')
		},

		// 将购物车之后的数据持久化存储到本地
		// 将购物车中的数据持久化存储到本地
		saveToStorage(state) {
			// JSON.stringify将一个数组转化为字符串
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},

		//更新购物车中的商品的勾选状态
		updateGoodState(state, goods) {
			const finR = state.cart.find(x => x.goods_id === goods.goods_id)
			if (finR) {
				finR.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}

		},

		// 更新购物车中商品的数量
		updateGoodsCount(state, goods) {
		  // 根据 goods_id 查询购物车中对应商品的信息对象
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
		  if(findResult) {
		    // 更新对应商品的数量
		    findResult.goods_count = goods.goods_count
		    // 持久化存储到本地
		    this.commit('m_cart/saveToStorage')
		  }
		},

		//根据id从购物车中删除对应的商品信息
		removeGoodsById(state, goods_id) {
		// 调用数组的 filter 方法进行过滤
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		},

		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)

			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}

	},
	// 计算属性
	getters: {
		total(state) {
			// 实现购物车对新增商品数量对显示
			return state.cart.reduce((all, item) => all += item.goods_count, 0)
		},
		// 商品的合计勾选数量
		checkedCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 商品的合计勾选的价格统计
		checkPriceCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += (item.goods_price*item.goods_count), 0).toFixed(2)
		}

	}

}
