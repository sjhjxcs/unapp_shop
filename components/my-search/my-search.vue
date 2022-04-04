<template>
	<view class="my_search_containers"  :style="{'background-color': bgcolor}">
		<view class="my_search_box" :style="{'border-radius': radius + 'px'}"  @click="handleClick">
			<!-- 使用uni_ui提供的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#C00000'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		methods:{
			// 点击了模拟的 input 输入框
			  handleClick() {
			    // 触发外界通过 @click 绑定的 click 事件处理函数
			    this.$emit('click')
			  }
		}
	}
</script>

<style lang="scss">
.my_search_containers{
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my_search_box{
		height: 36px;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
