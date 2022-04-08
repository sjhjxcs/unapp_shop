<template>
	<view class="cart_container"  v-if="cart.length !== 0">
		<!-- 使用收获地址组件 -->
		<my-address>
		</my-address>
		<!--  购物车商品列表的标题区域-->
		<view class="cart_title">
		<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart_title_text">购物车</text>
		</view>
		
		<!-- 循环渲染出购物车中的商品信息 -->
		<uni-swipe-action>
			<block v-for="(goods,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="handleSwiperClickDelete(goods)">
					<my-goods 
					:goods="goods" 
					:show-radio="true" 
					:show-num="true" 
					@radio-change="radioHandle"
					@num-change="handleNumberChange"
					></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 使用自定义的结算组件 -->
		<my-pay>
			
		</my-pay>
	</view>
	
	<!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
	    <image src="../../static/shopempty.webp" class="empty-img"></image>
	    <text class="tip-text">空空如也~</text>
	  </view>
	  
</template>

<script>
	import badgeMix from '../../mixins/tabbar_badge.js'
	// 按需导入 mapState 这个辅助函数
	import { mapState ,mapMutations} from 'vuex'
	export default {
		mixins:[badgeMix],
		computed: {
		    // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
		    ...mapState('m_cart', ['cart']),
		},	
	
		data() {
			return {
				options:[
					{
						text:'删除',//显示的文本内容
						style:{
							backgroundColor:'#C00000',
						},
					}]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodState','updateGoodsCount','removeGoodsById']),
			// 商品的勾选状态发生变化
			radioHandle(e){
				// console.log("e",e)
				this.updateGoodState(e)
			},
			//商品的数量发生变化
			handleNumberChange(e){
				this.updateGoodsCount(e)
			},
			
			// 点击了滑动删除按钮的操作
			handleSwiperClickDelete(goods){
				// console.log(goods)  //能拿到商品的信息
				// 现在只需要从更新购物车的内容,cart数组，将goods_id=点击的这个的过滤掉即可。
				this.removeGoodsById(goods.goods_id)
			}
		},
	}
</script>

<style lang="scss">
.cart_container{
	padding-bottom: 50px;
}
.cart_title{
	height: 40px;
	display: flex;
	border-bottom: 1px solid #efefef;
	align-items: center;
	font-size: 14px;
	uni-icons{
		margin-right: 10px;
	}
	
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
