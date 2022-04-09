<template>
	<view class="my_container">
		    <!-- 用户未登录时，显示登录组件 -->
		    <my-login v-if="!token">
			</my-login>
		
		    <!-- 用户登录后，显示用户信息组件 -->
		    <my-userinfo v-else>
			</my-userinfo>
	</view>
</template>

<script>
	import{mapState} from 'vuex'
	import badgeMix from '../../mixins/tabbar_badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed: {
			// 2. 从 m_user 模块中导入需要的 token 字符串
			...mapState('m_user', ['token']),
		},
	}
</script>

<style lang="scss">
page,
.my_container{
	height: 100%;
}
</style>
