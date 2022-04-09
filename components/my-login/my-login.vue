<template>
	<view class="login_container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn_login" @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips_text">登录后尽享更多权益</view>
	</view>

</template>


<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {
				res: []
			};
		},
		computed: {
		    // 调用 mapState 辅助方法，把 m_user 模块中的数据映射到当前用组件中使用
		    ...mapState('m_user', ['redirectInfo']),
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'getToken', 'updateToken','updateRedirectInfo']),
			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					desc: '需要你的信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						// 将信息存储到vuex中保存
						this.updateUserInfo(res.userInfo)
						console.log("userInfo:", res.userInfo)
						this.getToken(res)
					},
					fail: (res) => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
			async getToken(info) {
				// 获取code对应的值
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') {
					return uni.$showMsg('登录失败！')
				}
				// 准备参数对象
				const query = {
					code: res,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// // 换取token，这里获取loginResult失败，直接把数据写死！！！！
			const loginResult = {
					"message": {
						"user_id": 23,
						"user_email_code": null,
						"is_active": null,
						"user_sex": "男",
						"user_qq": "",
						"user_tel": "",
						"user_xueli": "本科",
						"user_hobby": "",
						"user_introduce": null,
						"create_time": 1562221487,
						"update_time": 1562221487,
						"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
					},
					"meta": {
						"msg": "登录成功",
						"status": 200
					}
				}
				this.updateToken(loginResult.message.token)
				
				// 判断vuex中的redirectInfo是否为null，如果不为null，则登录成功之后，需要重新导航到对应页面
				
				this.navigateBack();
			},
			
			// 返回登录之前的页面
			navigateBack() {
			  // redirectInfo 不为 null，并且导航方式为 switchTab
			  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
			    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
			    uni.switchTab({
			      // 要导航到的页面地址
			      url: this.redirectInfo.from,
			      // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
			      complete: () => {
			        this.updateRedirectInfo(null)
			      }
			    })
			  }
			}
		}
	}
</script>

<style lang="scss">
	.login_container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F8F8F8;
		position: relative;
		overflow: hidden;
		// 绘制登录盒子底部的半椭圆造型

		&::after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);

		}

		.btn_login {
			border-radius: 100px;
			width: 90%;
			background-color: #c00000;
		}

		.tips_text {
			text-align: center;
			font-size: 12px;
			// font-weight: bold;
			margin-top: 20px;
			color: gray;
		}
	}
</style>
