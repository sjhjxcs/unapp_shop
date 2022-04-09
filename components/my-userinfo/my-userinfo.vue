<template>
	<view class="my-userinfo-container">

		<!-- 头像昵称区域 -->
		<view class="top-box">
			<!-- 直接把数据写死！！！,因为userinfo里面的数据获取不到 -->
			<image src="../../static/logo.png" class="avatar"></image>
			<view class="nickname">搁浅的梦</view>
		</view>
		<!-- 	面板的列表区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel1">
				<!-- panel的主体区域 -->
				<view class="panel1-body">
					<!-- panel的item项 -->
					<view class="panel1-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel1-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel1-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- <!-第二个面板 -->
			<!-- 第二个面板 -->
			<view class="panel2">
				<!-- 面板的标题 -->
				<view class="panel2-title">我的订单</view>
				<!-- 面板的主体 -->
				<view class="panel2-body">
					<!-- 面板主体中的 item 项 -->
					<view class="panel2-item">
						<image src="../../static/tas-icon/cart-o.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel2-item">
						<image src="../../static/tas-icon/category-o.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel2-item">
						<image src="../../static/tas-icon/category-o.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel2-item">
						<image src="../../static/tas-icon/home-o.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel3">
				<view class="panel3-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel3-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel3-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 按需导入 mapState 辅助函数
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			// 将 m_user 模块中的 userinfo 映射到当前页面中使用
			...mapState('m_user', ['userinfo']),
		},
		data() {
			return {}
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			// 退出登录
			async logout() {
				// 询问用户是否退出登录
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)

				if (succ && succ.confirm) {
					// 用户确认了退出登录的操作
					// 需要清空 vuex 中的 userinfo、token 和 address
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		// 为整个组件的结构添加浅灰色的背景
		background-color: #F8F8F8;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.avatar {
				display: block;
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid white;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				color: white;
				font-weight: bold;
				font-size: 16px;
				margin-top: 10px;
			}
		}

		// 第一个面板的样式
		.panel-list {
			background-color: white;
			position: relative;

			.panel1 {
				position: relative;
				margin: 0 10px;

				.panel1-body {
					background-color: white;
					width: 100%;

					height: 70px;
					// line-height: 70px;
					position: absolute;
					top: -10px;
					display: flex;
					border-radius: 10px;
					justify-content: space-around;

					.panel1-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						text {
							font-size: 14px;
							color: #000000;
						}
					}
				}
			}

			.panel2 {
				.panel2-title {
					font-size: 14px;
					font-weight: bold;
					color: #000000;
					margin-top: 10px;
					margin-left: 10px;
				}

				position: absolute;
				margin-top:70px;
				width: 100%;
				background-color: white;

				.panel2-body {
					height: 110px;
					display: flex;
					border-radius: 10px;
					justify-content: space-around;

					.panel2-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						image {
							width: 50px;
							height: 50px;
						}

						text {
							font-size: 12px;
							color: #6A6A6A;
						}
					}
				}
			}

			.panel3 {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				position: absolute;
				background-color: white;
				width: 100%;
				height: 150px;
				top: 220px;

				.panel3-list-item {
					margin: 0 7px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					text {
						color: #606266;
						font-size: 14px;
						font-weight: bold;
					}
				}

			}

		}

	}
</style>
