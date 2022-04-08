<template>
	<view class="my_pay_container">
		<!-- 全选 -->
		<label class="radio" @click="allCheckedHandle">
			<radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
		</label>
		
		<!-- 合计 -->
		<view class="amount_box">
			合计：<text class="amount">¥{{checkPriceCount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn_pay">计算({{checkedCount}})</view>
			
	</view>
	</view>
</template>

<script>

	import {mapGetters,mapMutations} from'vuex'
	export default {
		name:"my-pay",
		data() {
			return {
				
			};
		},
		
		computed:{
			// 1.将total映射到当前组件中
			...mapGetters('m_cart',['checkedCount','checkPriceCount','total']),
			// 2.是否全选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			// 按钮全选，让把全部的商品都处于选中状态,lanel的点击事件处理函数
			allCheckedHandle(){
				 // 修改购物车中所有商品的选中状态
				 // !this.isFullCheck表示，当前全选按钮的状态取反之后，就是更新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my_pay_container{
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
	
	.radio{
		display: flex;
		align-items: center;
	}
	.amount_box{
		.amount{
			color: #C00000;
			font-weight: bold;
		}
		
	}
	.btn_pay{
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
