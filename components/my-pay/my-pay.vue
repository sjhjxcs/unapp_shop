<template>
	<view class="my_pay_container">
		<!-- 全选 -->
		<label class="radio" @click="allCheckedHandle">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计 -->
		<view class="amount_box">
			合计：<text class="amount">¥{{checkPriceCount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn_pay" @click="handlePay">计算({{checkedCount}})</view>

	</view>
	</view>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
	export default {
		name: "my-pay",
		data() {
			return {
				// 倒计时的秒数
				seconds: 3,
				// 定时器的唯一id
				timer: null
			};
		},

		computed: {
			// 1.将total映射到当前组件中
			...mapGetters('m_cart', ['checkedCount', 'checkPriceCount', 'total']),
			...mapGetters('m_user', ['addstr']),
			// token是用户登录成功之后的token字符串
			...mapState('m_user', ['token']),
			// 2.是否全选
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			// 按钮全选，让把全部的商品都处于选中状态,lanel的点击事件处理函数
			allCheckedHandle() {
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck表示，当前全选按钮的状态取反之后，就是更新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 处理结算功能

			handlePay() {
				// 1.先判断是否勾选了要结算的商品
				if (!this.checkedCount) {
					return uni.$showMsg('请选择需要结算的商品！')
				}
				// 2.再判断用户是否选择了收货地址
				if (!this.addstr) {
					return uni.$showMsg('请选择收货地址！')
				}
				// 3.最后判读用户是否登录了
				if (!this.token) {
					return this.delayNavigate()
				}
				// 4. 实现微信支付功能
				this.payOrder()

			},
			// 展示倒计时的提示消息 
			showTips(n) {
				// 调用uni.showToast()方法，展示提示消息
				uni.showToast({
					// 不展示任何图标
					icon: 'none',
					// 提示的消息
					title: "请登录后再结算！" + n + '秒后自动跳转到登录页',
					// 为页面添加透明度遮罩，防止点击穿透
					mask: true,
					// 1.5秒后自动消息
					duration: 1500
				})
			},
			// 延迟导航到my页面
			delayNavigate() {
				this.seconds = 3
				// 1展示提示消息，此时seconds的值等于3
				this.showTips(this.seconds)
				// 2创建定时器，每隔一秒执行一次
				this.timer = setInterval(() => {
					// 2.1先让秒数自减1
					this.seconds--
					// 判断秒数是否《=0
					if (this.seconds <= 0) {
						// 	清除定时器
						clearInterval(this.timer)

						// 跳转到my页面
						uni.switchTab({
							url: "../../pages/my/my",
							// 页面跳转成功之后的回调函数
							success: () => {
								// 调用vuex的updateRedirectInfo方法，把信息存储到Store
								this.updateRedirectInfo({
									// 跳转的方式
									openType: 'switchTab',
									// 从哪个页面跳转过去的
									from: 'pages/cart/cart'
								})

							}
						})

						// 2.3终止后防止后续的代码运行（当前秒数为0的时候，不再展示toast提示消息）
						return
					}

					// 2.2再根据最新的秒数，进行消息提示
					this.showTips(this.seconds)
				}, 1000)
			},

			// 微信支付
			async payOrder() {
				// 1. 创建订单
				// 1.1 组织订单的信息对象
				const orderInfo = {
					// 开发期间，注释掉真实的订单价格，
					// order_price: this.checkedGoodsAmount,
					// 写死订单总价为 1 分钱
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price,
					}))
				}
				// 1.2 发起请求创建订单
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				// 1.3 得到服务器响应的“订单编号”
				const orderNumber = res.message.order_number

				  // 2. 订单预支付
				  // 2.1 发起请求获取订单的支付信息
				  const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
				  // 2.2 预付订单生成失败
				  if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
				  // 2.3 得到订单支付相关的必要参数
				  const payInfo = res2.message.pay

				// 3. 发起微信支付
				   // 3.1 调用 uni.requestPayment() 发起微信支付
				   const [err, succ] = await uni.requestPayment(payInfo)
				   // 3.2 未完成支付
				   if (err) return uni.$showMsg('订单未支付！')
				   // 3.3 完成了支付，进一步查询支付的结果
				   const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				   // 3.4 检测到订单未支付
				   if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				   // 3.5 检测到订单支付完成
				   uni.showToast({
				     title: '支付完成！',
				     icon: 'success'
				   })
			},
		}
	}
</script>

<style lang="scss">
	.my_pay_container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount_box {
			.amount {
				color: #C00000;
				font-weight: bold;
			}

		}

		.btn_pay {
			background-color: #C00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;

		}
	}
</style>
